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
    public interface ISelfReservationService
    {
        IEnumerable<SelfReservationDto> GetAllByBoatId(int boatId);
        int Create(int boatId, CreateSelfReservationDto dto);
        void Delete(int id);
    }
    public class SelfReservationService : ISelfReservationService
    {
        private BoatifyDbContext _dbContext;
        private IMapper _mapper;
        private ILogger<SelfReservationService> _logger;
        private IAuthorizationService _authorizationService;
        private IUserContextService _userContextService;
        public SelfReservationService(BoatifyDbContext dbContext, IMapper mapper, ILogger<SelfReservationService> logger, IAuthorizationService authorizationService, IUserContextService userContextService)
        {
            {
                _dbContext = dbContext;
                _mapper = mapper;
                _logger = logger;
                _authorizationService = authorizationService;
                _userContextService = userContextService;
            }
        }
        public IEnumerable<SelfReservationDto> GetAllByBoatId(int boatId)
        {

            var selfReservations = _dbContext
               .SelfReservations
               .Include(r => r.User)
               .Include(r => r.Boat)
               .Include(r => r.ReservationTime)
               .Where(r => r.BoatId == boatId) 
               .ToList();

            if (selfReservations is null)
                throw new NotFoundException("Self-reservations not found");

            var selfReservationDtos = _mapper.Map<List<SelfReservationDto>>(selfReservations);

            return selfReservationDtos;
        }

        public void Delete(int id)
        {
            _logger.LogWarning($"SelfReservation with id: {id} DELETE ACTION invoked.");

            var selfReservation = _dbContext
               .SelfReservations
               .FirstOrDefault(r => r.Id == id);

            if (selfReservation is null)
                throw new NotFoundException("Self-reservation not found");

            var authorizationResult = _authorizationService.AuthorizeAsync(_userContextService.User, selfReservation,
                new SelfReservationOperationRequirement(ResourceOperation.Delete)).Result;

            if (!authorizationResult.Succeeded)
            {
                throw new ForbiddenException();
            }

            _dbContext.SelfReservations.Remove(selfReservation);
            _dbContext.SaveChanges();
        }

        public int Create(int boatId, CreateSelfReservationDto dto)
        {
            if (dto.StartDate >= dto.EndDate)
            {
                throw new ArgumentException("End date must be later than start date.");
            }

            List<int> activeStatuses = _dbContext.ReservationStatuses
                .Where(s => s.Name == "Pending" || s.Name == "Confirmed" || s.Name == "Payed")
                .Select(s => s.Id)
                .ToList();

            var isBoatAvailable = !_dbContext.SelfReservations
                .Include(sr => sr.ReservationTime)
                .Any(sr => sr.BoatId == boatId &&
                          ((dto.StartDate >= sr.ReservationTime.StartTime && dto.StartDate < sr.ReservationTime.EndTime) ||
                           (dto.EndDate > sr.ReservationTime.StartTime && dto.EndDate <= sr.ReservationTime.EndTime) ||
                           (dto.StartDate <= sr.ReservationTime.StartTime && dto.EndDate >= sr.ReservationTime.EndTime))) &&
                !_dbContext.Reservations
                .Include(r => r.ReservationTime)
                .Include(r => r.ReservationStatus)
                .Any(r => r.BoatId == boatId && activeStatuses.Contains(r.ReservationStatusId) &&
                          ((dto.StartDate >= r.ReservationTime.StartTime && dto.StartDate < r.ReservationTime.EndTime) ||
                           (dto.EndDate > r.ReservationTime.StartTime && dto.EndDate <= r.ReservationTime.EndTime) ||
                           (dto.StartDate <= r.ReservationTime.StartTime && dto.EndDate >= r.ReservationTime.EndTime)));



            if (!isBoatAvailable)
            {
                throw new InvalidOperationException("The boat is not available for the selected dates.");
            }

            var selfReservation = _mapper.Map<SelfReservation>(dto);

            var selfReservationTime = new ReservationTime
            {
                StartTime = dto.StartDate,
                EndTime = dto.EndDate
            };

            selfReservation.ReservationTime = selfReservationTime;

            selfReservation.BoatId = boatId;

            _dbContext.SelfReservations.Add(selfReservation);
            _dbContext.SaveChanges();

            return selfReservation.Id;
        }


    }
}
