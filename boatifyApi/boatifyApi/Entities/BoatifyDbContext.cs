﻿using Microsoft.EntityFrameworkCore;

namespace boatifyApi.Entities
{
    public class BoatifyDbContext : DbContext
    {
        private string _connectionString = "Server=(localdb)\\mssqllocaldb;Database=BoatifyDB;Trusted_Connection=True;";
        public DbSet<User> Users { get; set; }
        public DbSet<Harbour> Harbours { get; set;}
        public DbSet<Boat> Boats { get; set;}
        public DbSet<Address> Addresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Username)
                .IsRequired();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
