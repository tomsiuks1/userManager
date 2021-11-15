using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application
{
    public class DeleteUser
    {
        public class Command : IRequest{
            public int id { get; set; }
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
                var user = await context.User.FindAsync(request.id);

                if(user != null){
                    context.User.Remove(user);
                    await context.SaveChangesAsync();
                }

                return Unit.Value;
            }
        }
    }
}