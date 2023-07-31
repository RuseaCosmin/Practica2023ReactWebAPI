using Practica2023React.Business.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Practica2023React.Business.Contracts
{
    public interface IJWTTokenServices
    {
        JWTToken Authenticate(User user, string key);
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token);
    }
}
