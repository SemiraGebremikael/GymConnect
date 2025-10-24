using GymConnect.Api.Dto;
using GymConnect.Api.Dtos;
using GymConnect.Api.Models;

namespace GymConnect.Api.Mappings
{
    public static class MappingExtensions
    {
        public static UserDto ToDto(this User user)
        {
            return new UserDto
            {
                Id = user.Id,
                //FirstName = user.FirstName,
                //LastName = user.LastName,
                FullName = user.FullName,
            };
        }

        public static MessageResponseDto ToDto(this Message message)
        {
            return new MessageResponseDto
            {
                Id = message.Id,
                Content = message.Content,
                CreatedAt = message.CreatedAt,
                Sender = message.Sender.ToDto(),
                Receiver = message.Receiver.ToDto()
            };
        }
    }

}
