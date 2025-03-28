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
    [Route("api/self-reservation")]
    [ApiController]
    public class SelfReservationController : ControllerBase
    {
        private readonly ISelfReservationService _selfReservationService;
        public SelfReservationController(ISelfReservationService reservationService)
        {
            _selfReservationService = reservationService;
        }

        [Authorize]
        [HttpGet("my-reservations")]
        public ActionResult<IEnumerable<ReservationDto>> GetByUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                throw new BadRequestException("Unauthorized user");

            var reservations = _selfReservationService.GetByUserId(int.Parse(userId));
            return Ok(reservations);
        }


        [Authorize]
        [HttpGet("boat/{boatId}")]
        public ActionResult<PagedResult<SelfReservationDto>> GetAllBoatSelfReservations([FromRoute] int boatId)
        {
            var reservations = _selfReservationService.GetAllByBoatId(boatId);
            return Ok(reservations);
        }

        [Authorize]
        [HttpPost("boat/{boatId}")]
        public ActionResult Create([FromRoute] int boatId, [FromBody] CreateSelfReservationDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                throw new BadRequestException("Unauthorized user");

            dto.UserId = int.Parse(userId);

            var reservationId = _selfReservationService.Create(boatId, dto);
            return Created($"api/boat/{boatId}/self-reservation/{reservationId}", null);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            _selfReservationService.Delete(id);
            return NoContent();
        }
    }
}
