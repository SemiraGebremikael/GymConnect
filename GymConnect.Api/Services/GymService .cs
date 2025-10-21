using GymConnect.Api.Dto;
using GymConnect.Api.Models;
using GymConnect.Api.Peristence;
using Microsoft.EntityFrameworkCore;

namespace GymConnect.Api.Services
{
    public class GymService : IGymService
    {
        private readonly AppDbContext _context;

            public GymService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserResponseDto>> GetMembersByGymIdAsync(Guid gymId)
        {
            var members = await _context.Users
                .Include(u => u.Gym)
                .Where(u => u.GymId == gymId)
                .ToListAsync();

            return members.Select(u => new UserResponseDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Gym = u.Gym == null ? null : new GymResponseDto
                {
                    Id = u.Gym.Id,
                    Name = u.Gym.Name,
                    City = u.Gym.City
                }
            }).ToList();
        }
    }
}