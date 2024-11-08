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

        [HttpGet("{id}")]
        [AllowAnonymous]
        public ActionResult<HarbourDto> GetHarbour([FromRoute]int id)
        {
            var harbourDto = _harbourService.GetById(id);

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
            var id = _harbourService.Create(dto);

            return Created($"/api/harbour/{id}", null);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteHarbour([FromRoute] int id)
        {
            _harbourService.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult UpdateHarbour([FromBody] UpdateHarbourDto dto, [FromRoute]int id)
        {
            _harbourService.Update(id, dto);
            return Ok();
        }
    }
}
