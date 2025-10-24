using GymConnect.Api.Models;

namespace GymConnect.Api.Dto
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;

        //public string Email { get; set; } = string.Empty;
    }

}