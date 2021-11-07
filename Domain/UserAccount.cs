using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class UserAccount : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}