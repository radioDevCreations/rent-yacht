using boatifyApi.Entities;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace boatifyApi.Authorization
{
    public class SelfReservationOperationRequirementHandler : AuthorizationHandler<SelfReservationOperationRequirement, SelfReservation>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, SelfReservationOperationRequirement requirement, SelfReservation selfReservation)
        {
            if (requirement._resourceOperation == ResourceOperation.Read ||
               requirement._resourceOperation == ResourceOperation.Create)
            {
                context.Succeed(requirement);
            }

            var userId = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value;
            if (selfReservation.UserId == int.Parse(userId))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
