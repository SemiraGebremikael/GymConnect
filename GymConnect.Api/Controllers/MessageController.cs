using GymConnect.Api.Dto;
using GymConnect.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GymConnect.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpPost("SendMessage")]
        public async Task<IActionResult> SendMessage([FromBody] MessageRequestDto request)
        {
            var message = await _messageService.SendMessageAsync(request.SenderId, request.ReceiverId, request.Content);
            return Ok(message);
        }

        [HttpGet("{userId}/{otherUserId}")]
        public async Task<IActionResult> GetMessages(Guid userId, Guid otherUserId)
        {
            var messages = await _messageService.GetMessagesAsync(userId, otherUserId);
            return Ok(messages);
        }
    }


}
