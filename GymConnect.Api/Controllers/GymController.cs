using GymConnect.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymConnect.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymController : ControllerBase
    {
        private readonly IGymService _gymService;
        public GymController(IGymService gymService)
        {
            _gymService = gymService;
        }

        [HttpGet("{gymId}/User")]
        public async Task<IActionResult> GetMembers(Guid gymId)
        {
            var members = await _gymService.GetMembersByGymIdAsync(gymId);
            return Ok(members);
        }

        
    }
}