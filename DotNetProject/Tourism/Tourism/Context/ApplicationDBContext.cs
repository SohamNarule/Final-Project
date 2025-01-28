using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using Tourism.Entities;
namespace Tourism.Context
{
    public class ApplicationDBContext : DbContext
    {
        public DbSet<MyPackage> packages {  get; set; }
        public DbSet<BookingDetails> bookingDetails { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<State> States { get; set; }

        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) 
        {
        
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<BookingDetails>()
                .HasOne(d => d.myPackage)
                .WithMany(e => e.bookingDetails)
                .HasForeignKey(d => d.PkgId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<BookingDetails>()
                .HasOne(d => d.user) 
                .WithMany(u => u.bookingDetails)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<MyPackage>()
                .HasOne(d => d.state)
                .WithMany(u => u.myPackages)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<State>()
                .HasOne(d => d.Country)
                .WithMany(u => u.states)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion(role => role.ToString(),
                 role => Enum.Parse<UserRole>(role));
        }
    }
}
