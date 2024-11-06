﻿using boatifyApi.Entities;
using FluentValidation;

namespace boatifyApi.Models.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator(BoatifyDbContext dbContext) 
        { 
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();
            RuleFor(x => x.Password)
                .MinimumLength(8);
            RuleFor(x => x.ConfirmedPassword)
                .Equal(e => e.Password);
            RuleFor(x => x.Email)
                .Custom((value, context) => 
                {
                    var emailInUse = dbContext.Users.Any(u => u.Email == value);
                    if (emailInUse)
                    {
                        context.AddFailure("Email", "That email is taken");
                    }
                });
            RuleFor(x => x.FirstName)
                .NotEmpty();
            RuleFor(x => x.LastName)
                .NotEmpty();
            RuleFor(x => x.DateOfBirth)
                .NotEmpty();
        }
    }
}
