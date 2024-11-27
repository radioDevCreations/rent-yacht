using AutoMapper;
using boatifyApi.Entities;
using boatifyApi.Models;
using boatifyApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace boatifyApi.Controllers
{
    [Route("api/reservation")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public ActionResult<PagedResult<ReservationDto>> GetAll([FromQuery] ReservationQuery query)
        {
            var reservations = _reservationService.GetAll(query);
            return Ok(reservations);
        }

        [HttpGet("user/{userId}")]
        public ActionResult<IEnumerable<ReservationDto>> GetByUserId(int userId)
        {
            var reservations = _reservationService.GetByUserId(userId);
            return Ok(reservations);
        }

        [HttpGet("{id}")]
        public ActionResult<ReservationDto> GetById(int id)
        {
            var reservation = _reservationService.GetById(id);
            return Ok(reservation);
        }

        [HttpPost]
        public ActionResult Create([FromBody] CreateReservationDto dto)
        {
            var reservationId = _reservationService.Create(dto);
            return Created($"api/reservations/{reservationId}", null);
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, [FromBody] UpdateReservationDto dto)
        {
            _reservationService.Update(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _reservationService.Delete(id);
            return NoContent();
        }
    }
}
