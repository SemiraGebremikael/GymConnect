using GymConnect.Api.Dto;
using GymConnect.Api.Dtos;

namespace GymConnect.Api.Services
{
    public interface IMessageService
    {
        Task<MessageResponseDto> SendMessageAsync(Guid senderId, Guid receiverId, string content);
        Task<List<MessageResponseDto>> GetMessagesAsync(Guid userId, Guid otherUserId);
    }
}
