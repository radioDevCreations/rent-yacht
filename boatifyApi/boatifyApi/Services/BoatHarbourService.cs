using AutoMapper;
using boatifyApi.Entities;
using boatifyApi.Exceptions;
using boatifyApi.Models;
using Microsoft.EntityFrameworkCore;

namespace boatifyApi.Services
{
    public interface IBoatHarbourService
    {
        int Create(int harbourId, CreateBoatDto dto, int userId);
        BoatDto GetById(int harbourId, int boatId);
        List<BoatDto> GetAllByHarbourId(int harbourId);
        void DeleteAllBoatsByHarbourId(int harbourId);
    }

    public class BoatHarbourService : IBoatHarbourService
    {
        private BoatifyDbContext _dbContext;
        private IMapper _mapper;
        private ILogger<BoatHarbourService> _logger;

        public BoatHarbourService(BoatifyDbContext dbContext, IMapper mapper, ILogger<BoatHarbourService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }
        public int Create(int harbourId, CreateBoatDto dto, int userId)
        {
            var harbour = GetHarbourById(harbourId);

            var boatEntity = _mapper.Map<Boat>(dto);
            boatEntity.CreatedById = userId;

            boatEntity.HarbourId = harbourId;

            _dbContext.Boats.Add(boatEntity);
            _dbContext.SaveChanges();

            return boatEntity.Id;
        }

        public BoatDto GetById(int harbourId, int boatId)
        {
            var harbour = GetHarbourById(harbourId);

            var boat = _dbContext.Boats.FirstOrDefault(b => b.Id == boatId);
            if(boat is null || boat.HarbourId != harbourId)
            {
                throw new NotFoundException("Boat not found");
            }

            var boatDto = _mapper.Map<BoatDto>(boat);

            return boatDto;
        }

        public List<BoatDto> GetAllByHarbourId(int harbourId)
        {
            var harbour = GetHarbourById(harbourId);

            var boatDtos = _mapper.Map<List<BoatDto>>(harbour.Boats);

            return boatDtos;
        }

        public void DeleteAllBoatsByHarbourId(int harbourId)
        {
            var harbour = GetHarbourById(harbourId);
            _dbContext.RemoveRange(harbour.Boats);
            _dbContext.SaveChanges();
        }


        private Harbour GetHarbourById(int harbourId)
        {
            var harbour = _dbContext
                .Harbours
                .Include(h => h.Boats)
                .FirstOrDefault(h => h.Id == harbourId);

            if (harbour == null)
                throw new NotFoundException("Harbour not found");

            return harbour;
        }
    }
}
