using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application
{
    public class UpdateUser
    {
        public class Command : IRequest{
            public User User { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FindAsync(request.User.id);

                if(user != null){
                    mapper.Map(request.User, user);
                    await context.SaveChangesAsync();
                }
                
                return Unit.Value;
            }
        }
    }
}