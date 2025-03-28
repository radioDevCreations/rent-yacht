using AutoMapper;
using boatifyApi.Entities;
using boatifyApi.Models;
using boatifyApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace boatifyApi.Controllers
{
    [Route("api/harbour")]
    [ApiController]
    [Authorize(Roles = "Administrator")]
    [Authorize(Policy = "IsAdult")]
    public class HarbourController : ControllerBase
    {
        private readonly IHarbourService _harbourService;
        public HarbourController(IHarbourService harbourService) {
            _harbourService = harbourService;
        }

        [HttpGet("{harbourId}")]
        [AllowAnonymous]
        public ActionResult<HarbourDto> GetHarbour([FromRoute]int harbourId)
        {
            var harbourDto = _harbourService.GetById(harbourId);

            return Ok(harbourDto);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<HarbourDto>> GetAllHarbours()
        {
            var harboursDtos = _harbourService.GetAll();

            return Ok(harboursDtos);
        }


        [HttpPost]
        public ActionResult CreateHarbour([FromBody]CreateHarbourDto dto)
        {
            var harbourId = _harbourService.Create(dto);

            return Created($"/api/harbour/{harbourId}", null);
        }

        [HttpDelete("{harbourId}")]
        public ActionResult DeleteHarbour([FromRoute] int harbourId)
        {
            _harbourService.Delete(harbourId);
            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult UpdateHarbour([FromBody] UpdateHarbourDto dto, [FromRoute]int harbourId)
        {
            _harbourService.Update(harbourId, dto);
            return Ok();
        }
    }
}
