using Microsoft.AspNetCore.Authorization;

namespace boatifyApi.Authorization
{
    public class SelfReservationOperationRequirement : IAuthorizationRequirement
    {
        public ResourceOperation _resourceOperation { get; }
        public SelfReservationOperationRequirement(ResourceOperation resourceOperation)
        {
            _resourceOperation = resourceOperation;
        }
    }
}
