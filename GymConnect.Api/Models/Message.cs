using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymConnect.Api.Models
{
    public class Message
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [Column("sender_id")]
        public Guid SenderId { get; set; }

        [ForeignKey(nameof(SenderId))]
        public User? Sender { get; set; }

        [Required]
        [Column("receiver_id")]
        public Guid ReceiverId { get; set; }

        [ForeignKey(nameof(ReceiverId))]
        public User? Receiver { get; set; }

        [Required]
        [Column("content")]
        public string Content { get; set; } = string.Empty;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //[Column("read_at")]
        //public DateTime? ReadAt { get; set; }

        //[Column("expires_at")]
        //public DateTime? ExpiresAt { get; set; }

    }
}
