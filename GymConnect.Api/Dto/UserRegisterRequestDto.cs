namespace GymConnect.Api.Dto
{
    public class UserRegisterRequestDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public GymRequestDto? Gym { get; set; } = new();
    }

}

