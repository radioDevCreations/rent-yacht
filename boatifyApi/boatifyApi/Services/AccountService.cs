using boatifyApi.Entities;
using boatifyApi.Exceptions;
using boatifyApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace boatifyApi.Services
{
    public interface IAccountService
    {
        string GenerateJwt(LoginUserDto dto);
        void RegisterUser(RegisterUserDto dto);
        UserDto GetCurrentUser(string userId);
    }

    public class AccountService : IAccountService
    {
        private BoatifyDbContext _dbContext;
        private IPasswordHasher<User> _passwordHasher;
        private AuthenticationSettings _authenticationSettings;
        public AccountService(BoatifyDbContext dbContext, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
        }

        public void RegisterUser(RegisterUserDto dto)
        {
            var newUser = new User()
            {
                Email = dto.Email,
                Username = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                DateOfBirth = dto.DateOfBirth,
                RoleId = dto.RoleId
            };

            var hashedPassword = _passwordHasher.HashPassword(newUser, dto.Password);

            newUser.Password = hashedPassword;
            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();
        }
        public string GenerateJwt(LoginUserDto dto)
        {
            var user = _dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefault(u => u.Email == dto.Email);

            if (user is null)
            {
                throw new BadRequestException("Incorrect username or password");
            }

            var passwordIsValid = _passwordHasher.VerifyHashedPassword(user, user.Password, dto.Password);
            if (passwordIsValid == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Incorrect username or password");
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Role, $"{user.Role.Name}"),
            };

            if (!string.IsNullOrEmpty(user.DateOfBirth.ToString("yyyy-MM-dd")))
            {
                claims.Add(
                    new Claim("DateOfBirth", user.DateOfBirth.ToString("yyyy-MM-dd"))
                );
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
            var token = new JwtSecurityToken(
                _authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: credentials);
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }

        public UserDto GetCurrentUser(string userId)
        {
            var user = _dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefault(u => u.Id == int.Parse(userId));

            if (user == null)
            {
                throw new NotFoundException("User not found.");
            }

            var currentUser = new UserDto
            {
                Id = user.Id,
                Name = $"{user.FirstName} {user.LastName}",
                Email = user.Email,
                Role = user.Role?.Name,
                DateOfBirth = user.DateOfBirth.ToString("yyyy-MM-dd")
            };

            return currentUser;
        }
    }
}
