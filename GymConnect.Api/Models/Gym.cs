using System.ComponentModel.DataAnnotations;

namespace GymConnect.Api.Models
{
    public class Gym
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; } = string.Empty;

        public string? City { get; set; }

        public List<User> Members { get; set; } = new();
    }
}
