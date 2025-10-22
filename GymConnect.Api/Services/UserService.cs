using GymConnect.Api.Dto;
using GymConnect.Api.Models;
using GymConnect.Api.Peristence;
using Microsoft.EntityFrameworkCore;

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

        public async Task RegisterAsync(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                throw new ArgumentException("Email already exists");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
             _context.Users.Add(user);
              await _context.SaveChangesAsync();
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