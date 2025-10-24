namespace GymConnect.Api.Dto
{
    public class MessageRequestDto
    {
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}
