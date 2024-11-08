﻿using Microsoft.AspNetCore.Authorization;

namespace boatifyApi.Authorization
{
    public class MinimumAgeRequirement : IAuthorizationRequirement
    {
        public int MinimumAge {  get; }
        public MinimumAgeRequirement(int minAge) {
            MinimumAge = minAge;
        } 
    }   
}
