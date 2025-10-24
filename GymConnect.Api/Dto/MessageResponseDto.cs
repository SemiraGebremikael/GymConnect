using GymConnect.Api.Dto;
using GymConnect.Api.Models;
using System;

namespace GymConnect.Api.Dtos
{
    public class MessageResponseDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }


        public UserDto Sender { get; set; } = null!;
        public UserDto Receiver { get; set; } = null!;

    }
}
