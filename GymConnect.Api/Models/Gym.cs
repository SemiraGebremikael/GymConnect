using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymConnect.Api.Models
{
    public class Gym
    {
        [Key]
        [Column("id")]

        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [Column("name")]

        public string Name { get; set; } = string.Empty;
        [Required]
        [Column("country")]

        public string Country { get; set; } = string.Empty;
        [Required]
        [Column("city")]

        public string City { get; set; } = string.Empty;

        public ICollection<User> Users { get; set; } = new List<User>();

    }
}
