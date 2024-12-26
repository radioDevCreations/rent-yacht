using AutoMapper;
using boatifyApi.Entities;
using boatifyApi.Exceptions;
using boatifyApi.Models;
using Microsoft.EntityFrameworkCore;

namespace boatifyApi.Services
{
    public interface IHarbourService
    {
        int Create(CreateHarbourDto dto);
        void Delete(int id);
        IEnumerable<HarbourDto> GetAll();
        HarbourDto GetById(int id);
        void Update(int id, UpdateHarbourDto dto);
    }

    public class HarbourService : IHarbourService
    {
        private BoatifyDbContext _dbContext;
        private IMapper _mapper;
        private ILogger<HarbourService> _logger;

        public HarbourService(BoatifyDbContext dbContext, IMapper mapper, ILogger<HarbourService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }
        public int Create(CreateHarbourDto dto)
        {
            var harbourEntity = _mapper.Map<Harbour>(dto);
            _dbContext.Harbours.Add(harbourEntity);
            _dbContext.SaveChanges();

            return harbourEntity.Id;
        }
        public IEnumerable<HarbourDto> GetAll()
        {
            var harbours = _dbContext
                .Harbours
                .Include(h => h.Address)
                .Include(h => h.Boats)
                .ToList();

            var harboursDtos = _mapper.Map<List<HarbourDto>>(harbours);

            return harboursDtos;
        }

        public HarbourDto GetById(int harbourId)
        {
            var harbour = _dbContext
               .Harbours
               .Include(h => h.Address)
               .Include(h => h.Boats)
               .FirstOrDefault(h => h.Id == harbourId);

            if (harbour is null)
                throw new NotFoundException("Harbour not found");

            var harbourDto = _mapper.Map<HarbourDto>(harbour);

            return harbourDto;
        }

        public void Delete(int harbourId)
        {
            _logger.LogWarning($"Harbour with id: {harbourId} DELETE ACTION invoked.");

            var harbour = _dbContext
               .Harbours
               .FirstOrDefault(h => h.Id == harbourId);

            if (harbour is null)
                throw new NotFoundException("Harbour not found");

            _dbContext.Harbours.Remove(harbour);
            _dbContext.SaveChanges();
        }

        public void Update(int harbourId, UpdateHarbourDto dto)
        {
            var harbour = _dbContext
               .Harbours
               .FirstOrDefault(h => h.Id == harbourId);

            if (harbour is null)
                throw new NotFoundException("Harbour not found");

            harbour.Name = dto.Name;
            harbour.ContactEmail = dto.ContactEmail;
            harbour.ContactNumber = dto.ContactNumber;

            _dbContext.SaveChanges();
        }

    }

}
