using Dapper;
using Practica2023React.Business.Contracts;
using Practica2023React.Business.Domain;
using test.Business.Contracts;
using test.Business.Domain;
using test.Data;

namespace Practica2023React.Data.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly IConnectionString connectionString;

        public CartRepository(IConnectionString connectionString)
        {
            this.connectionString = connectionString;
        }
        public bool Delete(int id)
        {
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = "delete from dbo.Cart where ProductId = @id; select @@ROWCOUNT;";
                var affectedRows = db.Connection.Query<int>(sql, new { id });
                return affectedRows.FirstOrDefault() > 0;
            }
        }

        public List<CartProduct> GetAll(string username)
        {
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = "select  cart.productid,image,[name], price, count(*) as ammount from Product inner join cart on product.ProductId=cart.ProductId where username=@username group by [Name],price,image,cart.productid";
                return db.Connection.Query<CartProduct>(sql,new {username}).ToList();
            }
        }

        public bool Insert(Cart cart)
        {
            if (cart == null) return false;
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = $"INSERT INTO [dbo].[Cart]\r\n           ([Username]\r\n           ,[ProductId])\r\n     VALUES\r\n           (@Username\r\n           ,@ProductId); select scope_identity()";
                var id = db.Connection.QueryFirstOrDefault<int>(sql, new { cart.Username, cart.ProductId });
                cart.CartId = id;
                return id > 0;

            }
        }
    }
}
