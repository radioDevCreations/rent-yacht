using AutoMapper;
using boatifyApi.Authorization;
using boatifyApi.Entities;
using boatifyApi.Exceptions;
using boatifyApi.Migrations;
using boatifyApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace boatifyApi.Services
{
    public interface IBoatService
    {
        BoatDto GetById( int boatId);
        IEnumerable<BoatDto> GetAll();
        IEnumerable<BoatDto> GetUserBoatsById(int userId);
        PagedResult<BoatDto> GetAllSpecific(BoatQuery query);
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


        public IEnumerable<BoatDto> GetAll()
        {
            var boats = _dbContext
                .Boats
                .ToList();

            var boatDtos = _mapper.Map<List<BoatDto>>(boats);

            return boatDtos;
        }

        public IEnumerable<BoatDto> GetUserBoatsById(int userId)
        {
            var boats = _dbContext
                .Boats
                .Where(b => b.CreatedById == userId)
                .ToList();

            var boatDtos = _mapper.Map<List<BoatDto>>(boats);

            return boatDtos;
        }


        public PagedResult<BoatDto> GetAllSpecific(BoatQuery query)
        {

            var baseQuery = _dbContext
               .Boats
               .Where(b => query.SearchPhrase == null ||
               (b.Name.ToLower().Contains(query.SearchPhrase.ToLower()) ||
               b.Description.ToLower().Contains(query.SearchPhrase.ToLower()) ||
               b.Model.ToLower().Contains(query.SearchPhrase.ToLower())));

            if (!string.IsNullOrEmpty(query.SortBy))
            {
                var columnSelector = new Dictionary<string, Expression<Func<Boat, object>>>{
                    {nameof(Boat.Name), b=> b.Name},
                    {nameof(Boat.Description), b=> b.Description},
                    {nameof(Boat.Model), b=> b.Model},
                    {nameof(Boat.Type), b=> b.Type},
                };

                var selecteedColumn = columnSelector[query.SortBy];

                baseQuery = query.SortDirection == SortDirection.ASC ? 
                    baseQuery.OrderBy(selecteedColumn) : 
                    baseQuery.OrderByDescending(selecteedColumn);
            }

            var totalItemsCount = baseQuery.Count();

            var boats = baseQuery
               .Skip(query.PageSize * (query.PageNumber-1))
               .Take(query.PageSize)
               .ToList();

            var boatDtos = _mapper.Map<List<BoatDto>>(boats);

            var result = new PagedResult<BoatDto>(boatDtos, totalItemsCount, query.PageSize, query.PageNumber);

            return result;
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
