using AutoMapper;
using boatifyApi.Entities;
using boatifyApi.Exceptions;
using boatifyApi.Models;
using boatifyApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        [Authorize]
        [HttpGet("my-reservations")]
        public ActionResult<IEnumerable<ReservationDto>> GetByUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                throw new BadRequestException("Unauthorized user");

            var reservations = _reservationService.GetByUserId(int.Parse(userId));
            return Ok(reservations);
        }

        [HttpGet("{id}")]
        public ActionResult<ReservationDto> GetById(int id)
        {
            var reservation = _reservationService.GetById(id);
            return Ok(reservation);
        }

        [Authorize]
        [HttpPost]
        public ActionResult Create([FromBody] CreateReservationDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                throw new BadRequestException("Unauthorized user");

            dto.UserId = int.Parse(userId);

            var reservationId = _reservationService.Create(dto);
            return Created($"api/reservation/{reservationId}", null);
        }

        [Authorize]
        [HttpPut("{id}")]
        public ActionResult Update([FromRoute] int id, [FromBody] UpdateReservationDto dto)
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
