using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Practica2023React.Business.Contracts;
using Practica2023React.Business.Domain;
using Practica2023React.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using test.Business.Contracts;
using test.Data.Repositories;
using test.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Practica2023React.Controllers
{
    [Authorize]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IJWTTokenServices _jwttokenservice;
        public static UserModel User { get; private set; }
        public UsersController(IUserRepository repository, IJWTTokenServices jwttokenservice)
        {
            userRepository = repository;
            _jwttokenservice = jwttokenservice;
        }
        const int keySize = 64;
        const int iterations = 350000;
        HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

        string HashPasword(string password, out byte[] salt)
        {
            salt = new byte[] {byte.Parse(keySize.ToString())};

            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize);

            return Convert.ToHexString(hash);
        }
        bool VerifyPassword(string password, string hash, byte[] salt)
        {
            var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(password, salt, iterations, hashAlgorithm, keySize);
            return CryptographicOperations.FixedTimeEquals(hashToCompare, Convert.FromHexString(hash));
        }
        [AllowAnonymous]
        [HttpGet("api/users")]
        public IActionResult Get()
        {
            
            return Ok(userRepository.GetAll());
        }
        [AllowAnonymous]
        [HttpGet("api/users/{username}")]
        public IActionResult GetRole([FromRoute]string username)
        {

            return Ok(userRepository.GetRole(username));
        }
        private bool VerifyUser(UserModel user)
        {
            var users = userRepository.GetAll();
            foreach(var u in users)
            {

                if (u.Username == user.Username && u.Password == HashPasword(user.Password, out var salt))
                    return true;
            }
            return false;
        }
        [AllowAnonymous]
        [HttpPost("api/users/authenticate")]
        public IActionResult Authenticate([FromBody]UserBodyLight data)
        {
            var hash = HashPasword(data.Password, out var salt);
            Console.WriteLine(hash);
            Console.WriteLine(HashPasword("password", out var salt2));
            var user = new UserModel() { Username = data.Username, Password = data.Password, Role = userRepository.GetRole(data.Username) };
            if(!VerifyUser(user))
                return NotFound("User not found");

            var token = _jwttokenservice.Authenticate(new User() {UserId = 0, Username = user.Username, Password = "", Role=user.Role }, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6InRlc3QiLCJleHAiOjE3MDI4MDEyNTQsImlhdCI6MTY4OTU4MjA1NH0.TNDXhRSIyTMFFOS8gp_UglkCOrhhviWneuGay6SkOY8");
            Console.WriteLine(token.refTokenExpStr);
            if (token == null)
            {
                return Ok(new { Message = "Unauthorized" });
            }
            return Ok(token);
        }
        [AllowAnonymous]
        [HttpPost("api/users/refresh")]
        public IActionResult Refresh([FromBody] UserWithTokens data)
        {
            if (data is null)
            {
                return BadRequest("Invalid client request");
            }

            string? accessToken = data.Token;
            string? refreshToken = data.RefToken;

            var principal = _jwttokenservice.GetPrincipalFromExpiredToken(accessToken);
            if (principal == null )//|| data.RefTokenExp <= DateTime.Now)
            {
                return BadRequest("Invalid access token or refresh token");
            }

            var newAccessToken = _jwttokenservice.Authenticate(new User { UserId = data.UserId, Username = data.Username, Password = data.Password, Role = data.Role}, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6InRlc3QiLCJleHAiOjE3MDI4MDEyNTQsImlhdCI6MTY4OTU4MjA1NH0.TNDXhRSIyTMFFOS8gp_UglkCOrhhviWneuGay6SkOY8");



            return Ok(newAccessToken);
        }
        [AllowAnonymous]
        [HttpPost("api/users/insert")]
        public string Post(UserBody userBody)
        {
            var hash = HashPasword(userBody.Password, out var salt);
            Console.WriteLine(hash);
            if (userRepository.Insert(new User() { Username = userBody.Username, Password = hash, Role = userBody.Role }) == true)
                return "Success";
            return "Failed";
        }

    }
}
