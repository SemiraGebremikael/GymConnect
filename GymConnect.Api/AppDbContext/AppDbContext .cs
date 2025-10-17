using GymConnect.Api.Models;
using Microsoft.EntityFrameworkCore;
namespace GymConnect.Api.AppDbContext;

public class AppDbContext :DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Gym> Gyms => Set<Gym>();
    public DbSet<Message> Messages => Set<Message>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasOne(u => u.Gym)
            .WithMany(g => g.Members)
            .HasForeignKey(u => u.GymId);

    }
}
