using boatifyApi.Exceptions;
using boatifyApi.Models;
using boatifyApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace boatifyApi.Controllers
{
    [Route("api/boat")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        private readonly IBoatService _boatService;
        public BoatController(IBoatService boatService)
        {
            _boatService = boatService;
        }

        [HttpGet("{boatId}")]
        public ActionResult<BoatDto> GetBoat([FromRoute] int boatId)
        {
            var boat = _boatService.GetById(boatId);
            return Ok(boat);
        }

        [HttpGet("all")]
        public ActionResult<List<BoatDto>> GetAllBoats()
        {
            var boats = _boatService.GetAll();
            return Ok(boats);
        }

        [Authorize]
        [HttpGet("my-boats")]
        public ActionResult<List<BoatDto>> GetUserBoats()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                throw new BadRequestException("Unauthorized user");

            var boats = _boatService.GetUserBoatsById(int.Parse(userId));
            return Ok(boats);
        }

        [HttpGet]
        public ActionResult<List<BoatDto>> GetAllSpecificBoats([FromQuery] BoatQuery query)
        {
            var boats = _boatService.GetAllSpecific(query);
            return Ok(boats);
        }

        [HttpDelete("{boatId}")]
        public ActionResult DeleteBoat([FromRoute] int boatId)
        {
            _boatService.Delete(boatId);
            return NoContent();
        }

        [HttpPut("{boatId}")]
        public ActionResult UpdateBoat([FromBody] UpdateBoatDto dto, [FromRoute] int boatId)
        {
            _boatService.Update(boatId, dto);
            return Ok();
        }
    }
}
