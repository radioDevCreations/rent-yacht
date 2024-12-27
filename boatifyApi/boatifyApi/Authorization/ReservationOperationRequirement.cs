using Microsoft.AspNetCore.Authorization;

namespace boatifyApi.Authorization
{
    public class ReservationOperationRequirement : IAuthorizationRequirement
    {
        public ResourceOperation _resourceOperation { get; }
        public ReservationOperationRequirement(ResourceOperation resourceOperation)
        {
            _resourceOperation = resourceOperation;
        }
    }
}
