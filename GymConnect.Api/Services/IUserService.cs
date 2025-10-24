using GymConnect.Api.Dto;
using GymConnect.Api.Models;

namespace GymConnect.Api.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync(string gymName);
    }
}
