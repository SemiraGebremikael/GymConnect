using GymConnect.Api.Dto;
using GymConnect.Api.Models;

namespace GymConnect.Api.Services
{
    public interface IUserService
    {
        Task RegisterAsync(User user);
        //Task<string> LoginAsync(string email, string password);
        //Task<UserResponseDto?> GetByIdAsync(Guid userId);


        //Task<UserResponseDto?> GetByEmailAsync(string email);
        //Task<bool> ValidateCredentialsAsync(string email, string password);
    }
}
