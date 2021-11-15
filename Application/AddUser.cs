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
    public class AddUser
    {
        public class Command : IRequest{
            public User User { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                if(request.User != null){
                    await context.User.AddAsync(request.User);
                    await context.SaveChangesAsync();
                }

                return Unit.Value;
            }
        }
    }
}