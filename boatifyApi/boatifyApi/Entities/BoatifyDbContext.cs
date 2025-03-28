using Microsoft.EntityFrameworkCore;

namespace boatifyApi.Entities
{
    public class BoatifyDbContext : DbContext
    {
        private string _connectionString = "Server=(localdb)\\mssqllocaldb;Database=BoatifyDB;Trusted_Connection=True;";
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Harbour> Harbours { get; set;}
        public DbSet<Boat> Boats { get; set;}
        public DbSet<Address> Addresses { get; set; }
        public DbSet<ReservationStatus> ReservationStatuses { get; set; }
        public DbSet<ReservationTime> ReservationTimes{ get; set; }
        public DbSet<Reservation> Reservations{ get; set; }
        public DbSet<SelfReservation> SelfReservations{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //USER

            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Username)
                .IsRequired();

            //ROLE

            modelBuilder.Entity<Role>()
                .Property(r => r.Name)
                .IsRequired();

            //HARBOUR

            modelBuilder.Entity<Harbour>()
                .Property(h => h.Name)
                .HasMaxLength(50)
                .IsRequired();

            //BOAT

            modelBuilder.Entity<Boat>()
                .Property(b => b.Name)
                .IsRequired();
            modelBuilder.Entity<Boat>()
                .Property(b => b.Model)
                .IsRequired();
            modelBuilder.Entity<Boat>()
               .Property(b => b.Type)
               .IsRequired();
            modelBuilder.Entity<Boat>()
                .Property(b => b.PricePerDay)
                .IsRequired();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
