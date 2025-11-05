using GymConnect.Api.Dto;
using GymConnect.Api.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace GymConnect.Api.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync(string gymName);
        Task<IEnumerable<UserDto>> SearchAsync(string query);
    }
}
