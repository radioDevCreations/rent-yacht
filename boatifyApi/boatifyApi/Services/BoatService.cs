using AutoMapper;
using Azure.Core;
using boatifyApi.Authorization;
using boatifyApi.Entities;
using boatifyApi.Exceptions;
using boatifyApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;

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
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BoatService(BoatifyDbContext dbContext, IMapper mapper, ILogger<BoatService> logger, IAuthorizationService authorizationService, IUserContextService userContextService, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
            _authorizationService = authorizationService;
            _userContextService = userContextService;
            _httpContextAccessor = httpContextAccessor;
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
            {nameof(Boat.Name), b => b.Name},
            {nameof(Boat.Description), b => b.Description},
            {nameof(Boat.Model), b => b.Model},
            {nameof(Boat.Type), b => b.Type},
        };

                var selectedColumn = columnSelector[query.SortBy];

                baseQuery = query.SortDirection == SortDirection.ASC
                    ? baseQuery.OrderBy(selectedColumn)
                    : baseQuery.OrderByDescending(selectedColumn);
            }

            var totalItemsCount = baseQuery.Count();

            var boats = baseQuery
                .Skip(query.PageSize * (query.PageNumber - 1))
                .Take(query.PageSize)
                .ToList();

            var boatDtos = boats.Select(boat => new BoatDto
            {
                Id = boat.Id,
                Name = boat.Name,
                Description = boat.Description,
                Model = boat.Model,
                Type = boat.Type,
                PricePerDay = boat.PricePerDay,
                Passengers = boat.Passengers,
                MainImageUrl = GetMainImageUrl(boat.MainImage)
            }).ToList();

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

            boatDto.MainImageUrl = GetMainImageUrl(boat.MainImage);
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
                new BoatOperationRequirement(ResourceOperation.Delete)).Result;

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
                new BoatOperationRequirement(ResourceOperation.Update)).Result;

            if (!authorizationResult.Succeeded)
            {
                throw new ForbiddenException();
            }

            boat.PricePerDay = dto.PricePerDay;
            boat.HarbourId = dto.HarbourId;

            _dbContext.SaveChanges();
        }

        public string GetMainImageUrl(string relativePath)
        {
            var request = _httpContextAccessor.HttpContext?.Request;

            if (request == null)
                throw new InvalidOperationException("No HTTP context available.");

            var baseUrl = $"{request.Scheme}://{request.Host}{request.PathBase}";
            return $"{baseUrl}{relativePath}";
        }
    }
}
