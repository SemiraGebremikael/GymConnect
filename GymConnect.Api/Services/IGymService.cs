using GymConnect.Api.Dto;
using GymConnect.Api.Models;

namespace GymConnect.Api.Services
{
    public interface IGymService
    {
        Task<List<RegisterResponseDto>> GetMembersByGymIdAsync(Guid gymId);

    }
}
