using boatifyApi.Models;
using boatifyApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace boatifyApi.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        [HttpPost("register")]
        public ActionResult RegisterUser([FromBody] RegisterUserDto dto)
        {
            _accountService.RegisterUser(dto);
            return Ok();
        }
        [HttpPost("login")]
        public ActionResult LoginUser([FromBody] LoginUserDto dto)
        {
            string token = _accountService.GenerateJwt(dto);
            return Ok(token);
        }
        [Authorize]
        [HttpGet("me")]
        public ActionResult GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }

            var currentUser = _accountService.GetCurrentUser(userId);

            return Ok(currentUser);
        }
    }
}
