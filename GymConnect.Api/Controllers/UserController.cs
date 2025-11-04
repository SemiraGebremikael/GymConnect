using GymConnect.Api.Dto;
using GymConnect.Api.Models;
using GymConnect.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace GymConnect.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService ;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpGet("GetAllUsers")]
       public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers( string gymName)
        {
            try
            {
                var resualt = await _userService.GetAllUsersAsync(gymName);
                if (!resualt.Any())
                    return NotFound("No users were found for that gym.");
                return Ok(resualt);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("Search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string userName, [FromQuery] string city)
        {
            try
            {
                var result = await _userService.SearchUsersAsync(userName, city);
                if (!result.Any())
                    return NotFound("No users were found ");
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }






    }
}
