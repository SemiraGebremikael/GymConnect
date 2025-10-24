namespace GymConnect.Api.Dto
{
    public class RegisterResponseDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public GymResponseDto? Gym { get; set; } = new();

    }
}
