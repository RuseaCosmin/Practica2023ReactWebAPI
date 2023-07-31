using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Practica2023React.Business.Contracts;
using Practica2023React.Business.Domain;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using test.Business.Contracts;

namespace Practica2023React.Data.Repositories
{
    public class JWTServiceManage : IJWTTokenServices
    {
        private readonly IConnectionString connectionString;
        //private readonly SignInManager _signInManager;

        public JWTServiceManage(IConnectionString connectionString)
        {
            this.connectionString = connectionString;
        }
        public JWTToken Authenticate(User user, string key)
        {
            var tokenhandler = new JwtSecurityTokenHandler();
            var tkey = Encoding.UTF8.GetBytes(key);
            var TokenDescp = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddSeconds(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tkey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenhandler.CreateToken(TokenDescp);
            var refreshToken = GenerateRefreshToken();
            int refTokenExp = 604800;
            DateTime refTokenExpiry = DateTime.UtcNow.AddDays(-1);
            //refTokenExpiry = DateTime.UtcNow.AddDays(7);
           
            //await _signInManager.SignInAsync(user, false, "JwtBearer");

            return new JWTToken { Token = tokenhandler.WriteToken(token), refToken = refreshToken, refTokenExp = refTokenExp, refTokenExpStr = refTokenExpiry.ToShortDateString()
        };
        }
        public ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6InRlc3QiLCJleHAiOjE3MDI4MDEyNTQsImlhdCI6MTY4OTU4MjA1NH0.TNDXhRSIyTMFFOS8gp_UglkCOrhhviWneuGay6SkOY8")),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;


        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }


    }
}
