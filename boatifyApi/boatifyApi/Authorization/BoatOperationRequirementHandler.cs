using boatifyApi.Entities;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace boatifyApi.Authorization
{
    public class BoatOperationRequirementHandler : AuthorizationHandler<BoatOperationRequirement, Boat>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, BoatOperationRequirement requirement, Boat boat)
        {
            if(requirement._resourceOperation == ResourceOperation.Read ||
               requirement._resourceOperation == ResourceOperation.Create)
            {
                context.Succeed(requirement);
            }

            var userId = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value;
            if(boat.CreatedById == int.Parse(userId))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
