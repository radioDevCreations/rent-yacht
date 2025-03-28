using boatifyApi.Models;
using boatifyApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace boatifyApi.Controllers
{
    [Route("api/available")]
    [ApiController]
    public class ReservationTimeController : ControllerBase
    {
        private readonly IReservationTimeService _reservationTimeService;
        public ReservationTimeController(IReservationTimeService reservationTimeService)
        {
            _reservationTimeService = reservationTimeService;
        }

        [HttpGet("{boatId}")]
        public ActionResult<bool> IsBoatAvailable([FromRoute] int boatId, [FromQuery] string checkedStartDate, [FromQuery] string checkedEndDate)
        {
            try
            {
                var isAvailable = _reservationTimeService.IsAvailableByDates(boatId, checkedStartDate, checkedEndDate);
                return Ok(isAvailable);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{boatId}/dates")]
        public ActionResult<IEnumerable<DateTime>> GetAllReservedDatesForBoat(int boatId)
        {
            var reservedDates = _reservationTimeService.GetAllReservedDates(boatId);
            return Ok(reservedDates);
        }
    }
}
