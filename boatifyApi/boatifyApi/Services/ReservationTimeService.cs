using AutoMapper;
using boatifyApi.Entities;
using boatifyApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace boatifyApi.Services
{
    public interface IReservationTimeService
    {
        public IEnumerable<DateTime> GetAllReservedDates(int boatId);
        public bool IsAvailableByDates(int boatId, string checkedStartDate, string checkedEndDate);
    }

    public class ReservationTimeService : IReservationTimeService
    {
        private BoatifyDbContext _dbContext;
        private IMapper _mapper;
        private ILogger<BoatService> _logger;
        private IAuthorizationService _authorizationService;
        private IUserContextService _userContextService;

        public ReservationTimeService(BoatifyDbContext dbContext, IMapper mapper, ILogger<BoatService> logger, IAuthorizationService authorizationService, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
            _authorizationService = authorizationService;
            _userContextService = userContextService;
        }


        public IEnumerable<DateTime> GetAllReservedDates(int boatId)
        {
            var reservationTimes = _dbContext.Reservations
                .Where(r => r.BoatId == boatId)
                .Include(r => r.ReservationTime)
                .Select(r => r.ReservationTime) 
                .ToList();

            var allDates = reservationTimes
                .SelectMany(rt => Enumerable.Range(0, (rt.EndTime.Date - rt.StartTime.Date).Days + 1)
                .Select(offset => rt.StartTime.Date.AddDays(offset)))
                .Distinct()
                .OrderBy(date => date)
                .ToList();

            return allDates;
        }

        public bool IsAvailableByDates(int boatId, string checkedStartDate, string checkedEndDate)
        {
            if (!DateTime.TryParse(checkedStartDate, out DateTime startDate) ||
            !DateTime.TryParse(checkedEndDate, out DateTime endDate))
            {
                throw new ArgumentException("Invalid date format. Please provide dates in ISO string format.");
            }

            if (startDate >= endDate)
            {
                throw new ArgumentException("Checked start date must be earlier than checked end date.");
            }

            var hasOverlap = _dbContext.Reservations
                .Where(r => r.BoatId == boatId)
                .Include(r => r.ReservationTime)
                .Any(r => (startDate < r.ReservationTime.EndTime && endDate > r.ReservationTime.StartTime));

            return !hasOverlap;
        }
    }
}
