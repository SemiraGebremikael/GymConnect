namespace GymConnect.Api.Dto
{
    public class GymResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public List<MemberDto> Members { get; set; } = new();

    }
}
