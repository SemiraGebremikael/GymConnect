using GymConnect.Api.Dto;
using GymConnect.Api.Dtos;
using GymConnect.Api.Models;
using GymConnect.Api.Peristence;
using Microsoft.EntityFrameworkCore;

namespace GymConnect.Api.Services
{
    public class MessageService : IMessageService
    {
        private readonly AppDbContext _context;

        public MessageService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<MessageResponseDto> SendMessageAsync(Guid senderId, Guid receiverId, string content)
        {
            var message = new Message
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                Content = content
            };

            _context.messages.Add(message);
            await _context.SaveChangesAsync();

            return MessageResponseDto.FromModel(message);
        }

        public async Task<List<MessageResponseDto>> GetMessagesAsync(Guid userId, Guid otherUserId)
        {
            var messages = await _context.messages
                .Where(m =>
                    (m.SenderId == userId && m.ReceiverId == otherUserId) ||
                    (m.SenderId == otherUserId && m.ReceiverId == userId))
                .OrderBy(m => m.CreatedAt)
                .ToListAsync();

            return messages.Select(MessageResponseDto.FromModel).ToList();
        }


    }
}
