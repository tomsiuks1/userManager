using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<UserAccount>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {   
        }

        public DbSet<User> Users { get; set; }

        public Task FindAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}