using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<UserAccount> userManager;
        private readonly SignInManager<UserAccount> signInManager;
        private readonly TokenService token;

        public AccountController(UserManager<UserAccount> userManager, 
        SignInManager<UserAccount> signInManager, TokenService token)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.token = token;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if(user == null) return Unauthorized();

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(result.Succeeded){
                return new UserDto{
                    DisplayName = user.DisplayName,
                    Token = token.CreateToken(user),
                    UserName = user.UserName
                };
            }

            return Unauthorized();
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){
           
            if(await userManager.Users.AnyAsync(x => x.Email == registerDto.Email)){
                return BadRequest("Email taken");
            }
            if(await userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName)){
                return BadRequest("Username taken");
            }

            var user = new UserAccount
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if(result.Succeeded){
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Token = token.CreateToken(user),
                    UserName = user.UserName
                };
            }

            return BadRequest("Problem registering User");
        }
    }
}