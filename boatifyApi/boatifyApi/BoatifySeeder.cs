﻿using boatifyApi.Entities;

namespace boatifyApi
{
    public class BoatifySeeder
    {
        private readonly BoatifyDbContext _dbContext;
        public BoatifySeeder(BoatifyDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                SeedRoles();
                SeedHarbours();
                SeedReservationStatuses();
            }
        }

        //ROLES

        private void SeedRoles()
        {
            if (!_dbContext.Roles.Any())
            {
                var roles = GetRoles();
                _dbContext.Roles.AddRange(roles);
                _dbContext.SaveChanges();
            }
        }

        private IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role(){ Name="Administrator"},
                new Role(){ Name="Friend"},
                new Role(){ Name="Shipowner"},
                new Role(){ Name="Client"},
            };

            return roles;
        }

        //HARBOURS

        private void SeedHarbours()
        {
            if (!_dbContext.Harbours.Any())
            {
                var harbours = GetHarbours();
                _dbContext.Harbours.AddRange(harbours);
                _dbContext.SaveChanges();
            }
        }


        private IEnumerable<Harbour> GetHarbours()
        {
            var harbours = new List<Harbour>()
            {
                new Harbour() {
                Name="Port Popielno",
                ContactEmail="",
                ContactNumber="665291801",
                Address = new Address(){
                        Name="Popielno",
                        City="Popielno",
                        PostalCode="12-220",
                        Latitude=53.7533369,
                        Longtitude=21.6260844
                    },
                Boats = new List<Boat>()
                    {
                        new Boat()
                        {
                            Name = "Karolina",
                            Model = "Antila 27",
                            Type = "SailBoat",
                            PricePerDay = 550,
                            Passengers = 5
                        },
                        new Boat()
                        {
                            Name = "Nefryt",
                            Model = "Nefryt",
                            Type = "SailBoat",
                            PricePerDay = 300,
                            Passengers = 6
                        },
                    }
                },
                new Harbour() {
                Name="Port Mikołajki",
                ContactEmail="bosman@portmikolajki.pl",
                ContactNumber="604119427",
                Address = new Address(){
                        Name="Mikołajki",
                        PostalCode="11-730",
                        City="Mikołajki",
                        Latitude=53.7984478,
                        Longtitude=21.562858
                    },
                Boats = new List<Boat>()
                    {
                        new Boat()
                        {
                            Name = "Łysek",
                            Model = "Antila 34",
                            Type = "SailBoat",
                            PricePerDay = 700,
                            Passengers = 5
                        },
                        new Boat()
                        {
                            Name = "Skorpion",
                            Model = "Skorpion",
                            Type = "SailBoat",
                            PricePerDay = 200,
                            Passengers = 6
                        },
                    }
                }
            };
            return harbours;
        }

        //RESERVATION STATUSES

        private void SeedReservationStatuses()
        {
            if (!_dbContext.ReservationStatuses.Any())
            {
                var statuses = GetReservationStatuses();
                _dbContext.ReservationStatuses.AddRange(statuses);
                _dbContext.SaveChanges();
            }
        }

        private IEnumerable<ReservationStatus> GetReservationStatuses()
        {
            return new List<ReservationStatus>
            {
                new ReservationStatus { Name = "Pending"},
                new ReservationStatus { Name = "Confirmed"},
                new ReservationStatus { Name = "Payed"},
                new ReservationStatus { Name = "Cancelled"},
                new ReservationStatus { Name = "Completed"}
            };
        }
    }
}
