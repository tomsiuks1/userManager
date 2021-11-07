using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Profiles
{
    public class UserMapping : Profile
    {
        public UserMapping()
        {
            CreateMap<User, User>();
        }
    }
}