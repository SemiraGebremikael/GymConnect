namespace GymConnect.Api.Dto
{
    public class GetConversationRequestDto
    {
        public Guid UserId { get; set; }
        public Guid OtherUserId { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
