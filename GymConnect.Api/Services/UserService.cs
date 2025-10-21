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

        public async Task<UserResponseDto> RegisterAsync(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                throw new ArgumentException("Email already exists");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            var existingGym = await _context.Gyms
                .AsNoTracking()
                .FirstOrDefaultAsync(g => g.Name.ToLower() == user.Gym.Name.ToLower());

            if (existingGym != null)
            {
                user.GymId = existingGym.Id;
                user.Gym = null; 
            }
            else
            {
                user.Gym.Id = Guid.NewGuid();
                _context.Gyms.Add(user.Gym);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var savedUser = await _context.Users
                .Include(u => u.Gym)
                .FirstOrDefaultAsync(u => u.Id == user.Id);

            if (savedUser == null)
                throw new Exception("User could not be loaded after registration");

            var gymMembers = await _context.Users
                .Include(u => u.Gym)
                .Where(u => u.Gym.Name.ToLower() == savedUser.Gym.Name.ToLower())
                .ToListAsync();

            savedUser.Gym.Members = gymMembers;

            return MapToDto(savedUser);
        }

        public async Task<UserResponseDto?> GetByEmailAsync(string email)
        {
            var user = await _context.Users
                .Include(u => u.Gym)
                .ThenInclude(g => g.Members)
                .FirstOrDefaultAsync(u => u.Email == email);

            return user == null ? null : MapToDto(user);
        }

        public async Task<bool> ValidateCredentialsAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user != null && BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
        }

        // 🔹 Mapping till DTO
        private static UserResponseDto MapToDto(User user)
        {
            return new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Gym = new GymResponseDto
                {
                    Id = user.Gym.Id,
                    Name = user.Gym.Name,
                    Country = user.Gym.Country,
                    City = user.Gym.City,
                    Members = user.Gym.Members?
                .Select(m => new MemberDto
                {
                    Id = m.Id,
                    FirstName = m.FirstName,
                    LastName = m.LastName,
                    Email = m.Email
                }).ToList() ?? new List<MemberDto>()
                }
            };
        }
    }
}