using GymConnect.Api.Services;
using Microsoft.AspNetCore.SignalR;

namespace GymConnect.Api.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IMessageService _messageService;
        public ChatHub(IMessageService messageService)
        {
            _messageService = messageService;
        }

        public async Task SendMessage(Guid senderId, Guid receiverId, string content)
        {
            var message = await _messageService.SendMessageAsync(senderId, receiverId, content);
            await Clients.User(receiverId.ToString()).SendAsync("ReceiveMessage", message);
            await Clients.Caller.SendAsync("ReceiveMessage", message);
        }

    }
}
