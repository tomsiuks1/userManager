using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        private IMediator mediator;
        protected IMediator Mediator => this.mediator ??= HttpContext.RequestServices
        .GetService<IMediator>();

        [HttpGet]
        public async Task<List<User>> GetUsers(){
            return await Mediator.Send(new GetUsers.Query());
        }

        [HttpGet("{id}")]
        public async Task<User> GetUser(int id){
            return await Mediator.Send(new GetUser.Query {id = id});
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(User user){
            return Ok(await Mediator.Send(new AddUser.Command {User = user}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id){
            return Ok(await Mediator.Send(new DeleteUser.Command {id = id}));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(User user){
            return Ok(await Mediator.Send(new UpdateUser.Command{User = user}));
        }
    }
}