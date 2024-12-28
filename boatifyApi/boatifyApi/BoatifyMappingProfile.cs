using AutoMapper;
using boatifyApi.Entities;
using boatifyApi.Models;

namespace boatifyApi
{
    public class BoatifyMappingProfile : Profile
    {
        public BoatifyMappingProfile()
        {
            CreateMap<Harbour, HarbourDto>()
                .ForMember(m => m.ApartmentNumber, c => c.MapFrom(s => s.Address.ApartmentNumber))
                .ForMember(m => m.Street, c => c.MapFrom(s => s.Address.Street))
                .ForMember(m => m.City, c => c.MapFrom(s => s.Address.City))
                .ForMember(m => m.State, c => c.MapFrom(s => s.Address.State))
                .ForMember(m => m.PostalCode, c => c.MapFrom(s => s.Address.PostalCode))
                .ForMember(m => m.Country, c => c.MapFrom(s => s.Address.Country))
                .ForMember(m => m.Latitude, c => c.MapFrom(s => s.Address.Latitude))
                .ForMember(m => m.Longtitude, c => c.MapFrom(s => s.Address.Longtitude));

            CreateMap<Boat, BoatDto>()
                .ForMember(m => m.HarbourName, c => c.MapFrom(s => s.Harbour.Name));
            CreateMap<BoatDto, Boat>();

            CreateMap<CreateHarbourDto, Harbour>()
                .ForMember(m => m.Address, c => c.MapFrom(dto => new Address() { 
                    ApartmentNumber = dto.ApartmentNumber, 
                    Street = dto.Street, 
                    City = dto.City, 
                    PostalCode = dto.PostalCode, 
                    State = dto.State, 
                    Country = dto.Country, 
                    Latitude = dto.Latitude, 
                    Longtitude = dto.Longtitude 
                }));

            CreateMap<CreateBoatDto, Boat>();

            CreateMap<CreateReservationDto, Reservation>();
            CreateMap<Reservation, ReservationDto>()
                .ForMember(m => m.StartDate, c => c.MapFrom(s => s.ReservationTime.StartTime))
                .ForMember(m => m.EndDate, c => c.MapFrom(s => s.ReservationTime.EndTime));

            CreateMap<CreateSelfReservationDto, SelfReservation>();
            CreateMap<SelfReservation, SelfReservationDto>()
                .ForMember(m => m.StartDate, c => c.MapFrom(s => s.ReservationTime.StartTime))
                .ForMember(m => m.EndDate, c => c.MapFrom(s => s.ReservationTime.EndTime));
        }
    }
}
