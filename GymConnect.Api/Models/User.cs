using System.ComponentModel.DataAnnotations;

namespace GymConnect.Api.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string   FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public Guid GymId { get; set; }
        public Gym? Gym { get; set; }

        public string? TrainingFocus { get; set; }  // optional
    }
}
