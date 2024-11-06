using boatifyApi.Models;
using boatifyApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace boatifyApi.Controllers
{
    [Route("api/harbour/{harbourId}/boat")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        private readonly IBoatService _boatService;
        public BoatController(IBoatService boatService)
        {
            _boatService = boatService;
        }

        [HttpGet("{boatId}")]
        public ActionResult<BoatDto> GetBoat([FromRoute]int harbourId, [FromRoute]int boatId)
        {
            var boat = _boatService.GetById(harbourId, boatId);
            return Ok(boat);
        }

        [HttpGet]
        public ActionResult<List<BoatDto>> GetAllBoatsByHarbourId([FromRoute] int harbourId)
        {
            var boats = _boatService.GetAllByHarbourId(harbourId);
            return Ok(boats);
        }

        [HttpPost]
        public ActionResult CreateBoat([FromRoute]int harbourId, [FromBody]CreateBoatDto dto)
        {
            var boatId = _boatService.Create(harbourId, dto);

            return Created($"api/harbour/{harbourId}/boat/{boatId}", null);
        }

        [HttpDelete]
        public ActionResult DeleteAllBoats([FromRoute]int harbourId) {

            _boatService.DeleteAllBoatsByHarbourId(harbourId);
            return NoContent(); 
        }
    }
}
