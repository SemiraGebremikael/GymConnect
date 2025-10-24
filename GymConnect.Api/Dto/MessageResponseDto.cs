using GymConnect.Api.Models;
using System;

namespace GymConnect.Api.Dtos
{
    public class MessageResponseDto
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        public static MessageResponseDto FromModel(Message message)
        {
            return new MessageResponseDto
            {
                Id = message.Id,
                SenderId = message.SenderId,
                ReceiverId = message.ReceiverId,
                Content = message.Content,
                CreatedAt = message.CreatedAt
            };
        }
    }
}
