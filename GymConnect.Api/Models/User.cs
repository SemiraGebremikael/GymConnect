using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymConnect.Api.Models
{
    public class User
    {
        [Key]
        [Column("id")]

        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [Column("first_name")]

        public string   FirstName { get; set; } = string.Empty;

        [Required]
        [Column("last_name")]

        public string LastName { get; set; } = string.Empty;

        [NotMapped]
        public string FullName => FirstName + " " + LastName;

        [Required]
        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Column("password_hash")]

        public string PasswordHash { get; set; } = string.Empty;

        [Column("gym_id")]
        public Guid GymId { get; set; }

        [ForeignKey(nameof(GymId))]
        public Gym? Gym { get; set; }

        public ICollection<Message> SentMessages { get; set; } = new List<Message>();
        public ICollection<Message> ReceivedMessages { get; set; } = new List<Message>();
    }
}
