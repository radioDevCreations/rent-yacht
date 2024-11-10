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
        List<BoatDto> GetAll(string? searchPhrase);
        void Delete(int boatId);
        void Update(int boatId, UpdateBoatDto dto);
    }

    public class BoatService : IBoatService
    {
        private BoatifyDbContext _dbContext;
        private IMapper _mapper;
        private ILogger<BoatService> _logger;
        private IAuthorizationService _authorizationService;
        private IUserContextService _userContextService;

        public BoatService(BoatifyDbContext dbContext, IMapper mapper, ILogger<BoatService> logger, IAuthorizationService authorizationService, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
            _authorizationService = authorizationService;
            _userContextService = userContextService;
        }


        public List<BoatDto> GetAll(string? searchPhrase)
        {
            var boats = _dbContext
               .Boats
               .Where(b => searchPhrase == null || 
               (b.Name.ToLower().Contains(searchPhrase.ToLower()) || 
               b.Description.ToLower().Contains(searchPhrase.ToLower()) ||
               b.Model.ToLower().Contains(searchPhrase.ToLower())))
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

        public void Delete(int boatId)
        {
            _logger.LogWarning($"Boat with id: {boatId} DELETE ACTION invoked.");

            var boat = _dbContext
               .Boats
               .FirstOrDefault(b => b.Id == boatId);

            if (boat is null)
                throw new NotFoundException("Boat not found");

            var authorizationResult = _authorizationService.AuthorizeAsync(_userContextService.User, boat,
                new ResourceOperationRequirement(ResourceOperation.Delete)).Result;

            if (!authorizationResult.Succeeded)
            {
                throw new ForbiddenException();
            }

            _dbContext.Boats.Remove(boat);
            _dbContext.SaveChanges();
        }

        public void Update(int boatId, UpdateBoatDto dto)
        {
            var boat = _dbContext
               .Boats
               .FirstOrDefault(b => b.Id == boatId);

            if (boat is null)
                throw new NotFoundException("Boat not found");

            var authorizationResult = _authorizationService.AuthorizeAsync(_userContextService.User, boat, 
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
