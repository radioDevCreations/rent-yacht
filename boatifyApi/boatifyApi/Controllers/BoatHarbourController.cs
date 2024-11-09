using boatifyApi.Models;
using boatifyApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace boatifyApi.Controllers
{
    [Route("api/harbour/{harbourId}/boat")]
    [ApiController]
    public class BoatHarbourController : ControllerBase
    {
        private readonly IBoatHarbourService _boatHarbourService;
        public BoatHarbourController(IBoatHarbourService boatHarbourService)
        {
            _boatHarbourService = boatHarbourService;
        }

        [HttpGet("{boatId}")]
        public ActionResult<BoatDto> GetBoat([FromRoute]int harbourId, [FromRoute]int boatId)
        {
            var boat = _boatHarbourService.GetById(harbourId, boatId);
            return Ok(boat);
        }

        [HttpGet]
        public ActionResult<List<BoatDto>> GetAllBoatsByHarbourId([FromRoute] int harbourId)
        {
            var boats = _boatHarbourService.GetAllByHarbourId(harbourId);
            return Ok(boats);
        }

        [HttpPost]
        [Authorize]
        public ActionResult CreateBoat([FromRoute]int harbourId, [FromBody]CreateBoatDto dto)
        {
            var userId = int.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value);
            var boatId = _boatHarbourService.Create(harbourId, dto, userId);

            return Created($"api/harbour/{harbourId}/boat/{boatId}", null);
        }

        [HttpDelete]
        public ActionResult DeleteAllBoats([FromRoute]int harbourId) {

            _boatHarbourService.DeleteAllBoatsByHarbourId(harbourId);
            return NoContent(); 
        }
    }
}
