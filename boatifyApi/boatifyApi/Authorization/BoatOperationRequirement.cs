using Microsoft.AspNetCore.Authorization;

namespace boatifyApi.Authorization
{
    public class BoatOperationRequirement : IAuthorizationRequirement
    {
        public ResourceOperation _resourceOperation { get; }
        public BoatOperationRequirement(ResourceOperation resourceOperation)
        {
            _resourceOperation = resourceOperation;
        }
    }
}
