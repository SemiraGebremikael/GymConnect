using GymConnect.Api.Dtos;
using GymConnect.Api.Mappings;
using GymConnect.Api.Models;
using GymConnect.Api.Peristence;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

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
            var sender = await _context.users.Include(u => u.Gym).FirstOrDefaultAsync(u => u.Id == senderId);
            var receiver = await _context.users.Include(u => u.Gym).FirstOrDefaultAsync(u => u.Id == receiverId);

            if (sender == null || receiver == null)
                throw new Exception("User not found.");


            if (sender.Gym?.Name != receiver.Gym?.Name)
                throw new Exception($"Users are in different gyms ({sender.Gym?.Name} ≠ {receiver.Gym?.Name}).");
         

            var message = new Message
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                Content = content,
                CreatedAt = DateTime.UtcNow
            };

            _context.messages.Add(message);
            await _context.SaveChangesAsync();

            var fullMessage = await _context.messages
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .FirstAsync(m => m.Id == message.Id);

            return fullMessage.ToDto();
        }

        public async Task<IEnumerable<MessageResponseDto>> GetConversationAsync(Guid userId, Guid otherUserId, int page, int pageSize)
        {
            var user = await _context.users.FindAsync(userId);
            var other = await _context.users.FindAsync(otherUserId);

            if (user == null || other == null)
                throw new Exception("User not found.");

    
            if (user.Gym?.Name != other.Gym?.Name)
                throw new Exception($"Users are in different gyms ({user.Gym?.Name} ≠ {other.Gym?.Name}).");

            var messages = await _context.messages
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .Where(m =>
                    (m.SenderId == userId && m.ReceiverId == otherUserId) ||
                    (m.SenderId == otherUserId && m.ReceiverId == userId))
                .OrderByDescending(m => m.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return messages.Select(m => m.ToDto());
        }
    }
}
