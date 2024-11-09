using AutoMapper;
using boatifyApi.Authorization;
using boatifyApi.Entities;
using boatifyApi.Exceptions;
using boatifyApi.Migrations;
using boatifyApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace boatifyApi.Services
{
    public interface IBoatService
    {
        BoatDto GetById( int boatId);
        List<BoatDto> GetAll();
        void Delete(int boatId, ClaimsPrincipal user);
        void Update(int boatId, UpdateBoatDto dto, ClaimsPrincipal user);
    }

    public class BoatService : IBoatService
    {
        private BoatifyDbContext _dbContext;
        private IMapper _mapper;
        private ILogger<BoatService> _logger;
        private IAuthorizationService _authorizationService;

        public BoatService(BoatifyDbContext dbContext, IMapper mapper, ILogger<BoatService> logger, IAuthorizationService authorizationService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
            _authorizationService = authorizationService;
        }


        public List<BoatDto> GetAll()
        {
            var boats = _dbContext
               .Boats
               .ToList();

            var boatDtos = _mapper.Map<List<BoatDto>>(boats);

            return boatDtos;
        }

        public BoatDto GetById(int boatId)
        {
            var boat = _dbContext
               .Boats
               .FirstOrDefault(b => b.Id == boatId);

            if (boat is null)
                throw new NotFoundException("Boat not found");

            var boatDto = _mapper.Map<BoatDto>(boat);

            return boatDto;
        }

        public void Delete(int boatId, ClaimsPrincipal user)
        {
            _logger.LogWarning($"Boat with id: {boatId} DELETE ACTION invoked.");

            var boat = _dbContext
               .Boats
               .FirstOrDefault(b => b.Id == boatId);

            if (boat is null)
                throw new NotFoundException("Boat not found");

            var authorizationResult = _authorizationService.AuthorizeAsync(user, boat,
                new ResourceOperationRequirement(ResourceOperation.Delete)).Result;

            if (!authorizationResult.Succeeded)
            {
                throw new ForbiddenException();
            }

            _dbContext.Boats.Remove(boat);
            _dbContext.SaveChanges();
        }

        public void Update(int boatId, UpdateBoatDto dto, ClaimsPrincipal user)
        {
            var boat = _dbContext
               .Boats
               .FirstOrDefault(b => b.Id == boatId);

            if (boat is null)
                throw new NotFoundException("Boat not found");

            var authorizationResult = _authorizationService.AuthorizeAsync(user, boat, 
                new ResourceOperationRequirement(ResourceOperation.Update)).Result;

            if (!authorizationResult.Succeeded)
            {
                throw new ForbiddenException();
            }

            boat.PricePerDay = dto.PricePerDay;
            boat.HarbourId = dto.HarbourId;

            _dbContext.SaveChanges();
        }
    }
}
