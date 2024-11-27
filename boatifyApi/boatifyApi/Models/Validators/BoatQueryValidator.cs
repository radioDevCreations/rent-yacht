using FluentValidation;
using Microsoft.IdentityModel.Tokens;

namespace boatifyApi.Models.Validators
{
    public class BoatQueryValidator : AbstractValidator<BoatQuery>
    {
        private int[] allowedPageSizes = new[] { 5, 10, 15 }; 
        private string[] allowedSortByColumnNames = new[] { 
            nameof(BoatDto.Name), 
            nameof(BoatDto.Description),
            nameof(BoatDto.Model), 
            nameof(BoatDto.Type) 
        };
        public BoatQueryValidator()
        {
            RuleFor(b => b.PageNumber).GreaterThanOrEqualTo(1);
            RuleFor(b => b.PageSize).Custom((value, context) =>
            {
                if (!allowedPageSizes.Contains(value))
                {
                    context.AddFailure("PageSize", $"PageSize must be in [{string.Join(",", allowedPageSizes)}]");
                }
            });
            RuleFor(b => b.SortBy).Must(value => string.IsNullOrWhiteSpace(value) || allowedSortByColumnNames.Contains(value))
                .WithMessage($"Sort by is optional, or must be in [{string.Join(",", allowedSortByColumnNames)}]");
        }
    }
}
