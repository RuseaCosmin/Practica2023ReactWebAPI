using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Practica2023React.Business.Contracts;
using Practica2023React.Business.Domain;
using Practica2023React.Models;
using test.Business.Contracts;
using test.Data.Repositories;
using test.Models;

namespace Practica2023React.Controllers
{
    [Authorize]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IJWTTokenServices _jwttokenservice;
        public UsersController(IUserRepository repository, IJWTTokenServices jwttokenservice)
        {
            userRepository = repository;
            _jwttokenservice = jwttokenservice;
        }

        [HttpGet("api/users")]
        public IActionResult Get()
        {

            return Ok(userRepository.GetAll());
        }
        [AllowAnonymous]
        [HttpPost("api/users/authenticate")]
        public IActionResult Authenticate(UserModel users)
        {
            var token = _jwttokenservice.Authenticate(new User() {UserId = users.UserId, Username = users.Username, Password = users.Password }, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6InRlc3QiLCJleHAiOjE3MDI4MDEyNTQsImlhdCI6MTY4OTU4MjA1NH0.TNDXhRSIyTMFFOS8gp_UglkCOrhhviWneuGay6SkOY8");

            if (token == null)
            {
                return Ok(new { Message = "Unauthorized" });
            }

            return Ok(token);
        }
        [HttpPost("api/users/insert")]
        public string Post(UserBody userBody)
        {
            if (userRepository.Insert(new User() { Username = userBody.Username, Password = userBody.Password }) == true)
                return "Success";
            return "Failed";
        }

    }
}
