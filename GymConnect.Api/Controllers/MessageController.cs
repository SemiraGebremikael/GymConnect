using GymConnect.Api.Dto;
using GymConnect.Api.Dtos;
using GymConnect.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymConnect.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            try
            {
                var result = await _messageService.SendMessageAsync(request.SenderId, request.ReceiverId, request.Content);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("GetConversation")]
        public async Task<IActionResult> GetConversation([FromQuery] GetConversationRequestDto request) 
        {
            try
            {
                var result = await _messageService.GetConversationAsync(
                 request.UserId,
                 request.OtherUserId,
                 request.Page,
                 request.PageSize
         );
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }

   
}
