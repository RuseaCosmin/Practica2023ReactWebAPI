using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practica2023React.Business.Domain
{
    public class JWTToken
    {
        public string Token { get; set; }
        public string refToken { get; set; }
        public int refTokenExp {get; set; }
        public string refTokenExpStr { get; set; }

    }
}
