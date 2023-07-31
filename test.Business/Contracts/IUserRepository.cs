using Practica2023React.Business.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using test.Business.Domain;

namespace Practica2023React.Business.Contracts
{
    public interface IUserRepository
    {
        List<User> GetAll();
        bool Insert(User user);
        string GetRole(string username);
    }
}
