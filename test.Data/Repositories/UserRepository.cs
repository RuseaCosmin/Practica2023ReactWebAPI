using Dapper;
using Practica2023React.Business.Contracts;
using Practica2023React.Business.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using test.Business.Contracts;
using test.Business.Domain;
using test.Data;

namespace Practica2023React.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IConnectionString connectionString;
        public UserRepository(IConnectionString connectionString)
        {
            this.connectionString = connectionString;
        }


        public List<User> GetAll()
        {
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = "SELECT [UserId]\r\n      ,[Username]\r\n      ,[Password]\r\n  FROM [dbo].[User]\r\n  ORDER BY UserId\r\n";
                return db.Connection.Query<User>(sql).ToList();
            }
        }

        public bool Insert(User user)
        {
            if (user == null) return false;

            using (var db = new SqlDataContext(connectionString))
            {
                var sql = $"INSERT INTO [dbo].[User]\r\n           ([Username]\r\n           ,[Password], Role)    VALUES\r\n           (@Username\r\n           ,@Password, @Role); select scope_identity()";
                var id = db.Connection.QueryFirstOrDefault<int>(sql, new { user.Username, user.Password, user.Role });
                user.UserId = id;
                return id > 0;
            }
        }
        public string GetRole(string username)
        {
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = "SELECT Role  FROM [dbo].[User] WHERE username = @username";
                return db.Connection.Query<string>(sql, new {username}).FirstOrDefault();
            }
        }

    }
}
