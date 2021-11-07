using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application
{
    public class GetUser
    {
        public class Query : IRequest<User>
        {
            public int id { get; set; }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FindAsync(request.id);
                return user;
            }
        }
    }
}