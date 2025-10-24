using GymConnect.Api.Dto;
using GymConnect.Api.Models;
using GymConnect.Api.Peristence;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Threading;
using System.Xml.Linq;

namespace GymConnect.Api.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public UserService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }


        public async Task<IEnumerable<UserDto>> GetAllUsersAsync(string gymName)
        {
            if (string.IsNullOrWhiteSpace(gymName))
                return new List<UserDto>();

            gymName = gymName.Trim();

            var gymIds = await _context.gyms
             .Where(g => EF.Functions.ILike(g.Name, gymName))
             .Select(g => g.Id)
             .ToListAsync();

            var users = await _context.users
                .Where(u => gymIds.Contains(u.GymId))
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Country = u.Gym!.Country,
                    City = u.Gym!.City
                })
                .ToListAsync();
  
            return users;
        }




        //public async Task<UserResponseDto?> GetByEmailAsync(string email)
        //{
        //    var user = await _context.Users
        //        .Include(u => u.Gym)
        //        .ThenInclude(g => g.Members)
        //        .FirstOrDefaultAsync(u => u.Email == email);

        //    return user == null ? null : MapToDto(user);
        //}



    }


}