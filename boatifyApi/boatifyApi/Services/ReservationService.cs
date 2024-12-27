using AutoMapper;
using boatifyApi.Authorization;
using boatifyApi.Entities;
using boatifyApi.Exceptions;
using boatifyApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace boatifyApi.Services
{
    public interface IReservationService
    {
        ReservationDto GetById(int id);
        IEnumerable<ReservationDto> GetByUserId(int userId);
        PagedResult<ReservationDto> GetAll(ReservationQuery query);
        int Create(CreateReservationDto dto);
        void Update(int id, UpdateReservationDto dto);
        void Delete(int id);
    }
    public class ReservationService : IReservationService
    {
        private BoatifyDbContext _dbContext;
        private IMapper _mapper;
        private ILogger<ReservationService> _logger;
        private IAuthorizationService _authorizationService;
        private IUserContextService _userContextService;
        public ReservationService(BoatifyDbContext dbContext, IMapper mapper, ILogger<ReservationService> logger, IAuthorizationService authorizationService, IUserContextService userContextService)
        {
            {
                _dbContext = dbContext;
                _mapper = mapper;
                _logger = logger;
                _authorizationService = authorizationService;
                _userContextService = userContextService;
            }
        }
        public PagedResult<ReservationDto> GetAll(ReservationQuery query)
        {

            var baseQuery = _dbContext
               .Reservations
               .Include(r => r.User)
               .Include(r => r.Boat)
               .Include(r => r.ReservationTime)
               .Include(r => r.ReservationStatus)
               .Where(r => r.ReservationTime.StartTime > query.DateFrom && r.ReservationTime.EndTime < query.DateTo);

            if (!string.IsNullOrEmpty(query.SortBy))
            {
                var columnSelector = new Dictionary<string, Expression<Func<Reservation, object>>>{
                    {nameof(Reservation.ReservationTime.StartTime), r => r.ReservationTime.StartTime},
                    {nameof(Reservation.ReservationTime.EndTime), r => r.ReservationTime.EndTime},
                    {nameof(Reservation.TotalPrice), b=> b.TotalPrice},
                    {nameof(Reservation.User.FirstName), b=> b.User.FirstName},
                    {nameof(Reservation.User.LastName), b=> b.User.LastName},
                    {nameof(Reservation.Boat.Model), b=> b.Boat.Model},
                };

                var selecteedColumn = columnSelector[query.SortBy];

                baseQuery = query.SortDirection == SortDirection.ASC ?
                    baseQuery.OrderBy(selecteedColumn) :
                    baseQuery.OrderByDescending(selecteedColumn);
            }

            var totalItemsCount = baseQuery.Count();

            var reservations = baseQuery
               .Skip(query.PageSize * (query.PageNumber - 1))
               .Take(query.PageSize)
               .ToList();

            var reservationDtos = _mapper.Map<List<ReservationDto>>(reservations);

            var result = new PagedResult<ReservationDto>(reservationDtos, totalItemsCount, query.PageSize, query.PageNumber);

            return result;
        }

        public IEnumerable<ReservationDto> GetByUserId(int userId)
        {
            var reservations = _dbContext
               .Reservations
               .Include(r => r.User)
               .Include(r => r.Boat)
               .Include(r => r.ReservationTime)
               .Include(r => r.ReservationStatus)
               .ToList()
               .FindAll(r => r.UserId == userId);

            if (reservations is null)
                throw new NotFoundException("Reservations not found");

            var reservationDtos = _mapper.Map<List<ReservationDto>>(reservations);

            return reservationDtos;
        }

        public ReservationDto GetById(int reservationId)
        {
            var reservation = _dbContext
               .Reservations
               .Include(r => r.User)
               .Include(r => r.Boat)
               .Include(r => r.ReservationTime)
               .Include(r => r.ReservationStatus)
               .FirstOrDefault(r => r.Id == reservationId);

            if (reservation is null)
                throw new NotFoundException("Reservation not found");

            var reservationDto = _mapper.Map<ReservationDto>(reservation);

            return reservationDto;
        }

        public void Delete(int reservationId)
        {
            _logger.LogWarning($"Reservation with id: {reservationId} DELETE ACTION invoked.");

            var reservation = _dbContext
               .Reservations
               .FirstOrDefault(r => r.Id == reservationId);

            if (reservation is null)
                throw new NotFoundException("Reservation not found");

            var authorizationResult = _authorizationService.AuthorizeAsync(_userContextService.User, reservation,
                new BoatOperationRequirement(ResourceOperation.Delete)).Result;

            if (!authorizationResult.Succeeded)
            {
                throw new ForbiddenException();
            }

            _dbContext.Reservations.Remove(reservation);
            _dbContext.SaveChanges();
        }

        public void Update(int reservationId, UpdateReservationDto dto)
        {
            var reservation = _dbContext
               .Reservations
               .FirstOrDefault(r => r.Id == reservationId);

            if (reservation is null)
                throw new NotFoundException("Reservation not found");

            var authorizationResult = _authorizationService.AuthorizeAsync(_userContextService.User, reservation,
                new BoatOperationRequirement(ResourceOperation.Update)).Result;

            if (!authorizationResult.Succeeded)
            {
                throw new ForbiddenException();
            }

            var reservationStatus = _dbContext
               .ReservationStatuses
               .FirstOrDefault(rs => rs.Name == dto.Status);

            if (reservationStatus is null)
                throw new NotFoundException("Incorrect reservation status");

            reservation.ReservationStatusId = reservationStatus.Id;

            _dbContext.SaveChanges();
        }

        public int Create(CreateReservationDto dto)
        {
            if (dto.StartDate >= dto.EndDate)
            {
                throw new ArgumentException("End date must be later than start date.");
            }

            var isBoatAvailable = !_dbContext.Reservations
                .Include(r => r.ReservationTime)
                .Any(r => r.BoatId == dto.BoatId &&
                          ((dto.StartDate >= r.ReservationTime.StartTime && dto.StartDate < r.ReservationTime.EndTime) ||
                           (dto.EndDate > r.ReservationTime.StartTime && dto.EndDate <= r.ReservationTime.EndTime) ||
                           (dto.StartDate <= r.ReservationTime.StartTime && dto.EndDate >= r.ReservationTime.EndTime)));

            if (!isBoatAvailable)
            {
                throw new InvalidOperationException("The boat is not available for the selected dates.");
            }

            var reservation = _mapper.Map<Reservation>(dto);

            var reservationTime = new ReservationTime
            {
                StartTime = dto.StartDate,
                EndTime = dto.EndDate
            };

            reservation.ReservationTime = reservationTime;

            var reservationStatus = _dbContext
               .ReservationStatuses
               .FirstOrDefault(rs => rs.Name == dto.Status);

            if (reservationStatus is null)
                throw new NotFoundException("Incorrect reservation status");

            reservation.ReservationStatusId = reservationStatus.Id;

            _dbContext.Reservations.Add(reservation);
            _dbContext.SaveChanges();

            return reservation.Id;
        }


    }
}
