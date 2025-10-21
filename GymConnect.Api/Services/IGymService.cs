using GymConnect.Api.Dto;
using GymConnect.Api.Models;

namespace GymConnect.Api.Services
{
    public interface IGymService
    {
        Task<List<UserResponseDto>> GetMembersByGymIdAsync(Guid gymId);

    }
}
