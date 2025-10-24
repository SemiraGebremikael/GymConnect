using GymConnect.Api.Dto;
using GymConnect.Api.Dtos;

namespace GymConnect.Api.Services
{
    public interface IMessageService
    {
        Task<MessageResponseDto> SendMessageAsync(Guid senderId, Guid receiverId, string content);
        Task<IEnumerable<MessageResponseDto>> GetConversationAsync(Guid userId, Guid otherUserId, int page, int pageSaize);
    }
}
