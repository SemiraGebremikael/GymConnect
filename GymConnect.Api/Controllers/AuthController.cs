using GymConnect.Api.Models;
using GymConnect.Api.Dto;
using GymConnect.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymConnect.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            try
            {
                var user = new User
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    PasswordHash = request.Password,
                    Gym = new Gym
                    {
                        Name = request.Gym.Name,
                        Country = request.Gym.Country,
                        City = request.Gym.City
                    }
                };

                 await _authService.RegisterAsync(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}