using GymConnect.Api.Models;
using GymConnect.Api.Peristence;
using Microsoft.EntityFrameworkCore;

namespace GymConnect.Api.Services
{
    public class AuthService: IAuthService
    {

        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }


        public async Task RegisterAsync(User user)
        {
            if (await _context.users.AnyAsync(u => u.Email == user.Email))
                throw new ArgumentException("Email already exists");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            _context.users.Add(user);
            await _context.SaveChangesAsync();
        }

    }
}
