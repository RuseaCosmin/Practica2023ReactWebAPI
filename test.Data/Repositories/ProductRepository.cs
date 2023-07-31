using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using test.Business.Contracts;
using test.Business.Domain;

namespace test.Data.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IConnectionString connectionString;
        public ProductRepository(IConnectionString connectionString)
        {
            this.connectionString = connectionString;
        }
        public List<Product> GetAllByCategory(int CategoryId)
        {
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = "SELECT [ProductId]\r\n      ,[dbo].[Product].[Name]\r\n      ,[Price],[Image]\r\n  FROM [dbo].[Product]\r\n INNER JOIN dbo.Category ON dbo.Category.CategoryId=dbo.Product.CategoryId WHERE dbo.Product.CategoryId = @CategoryId ORDER BY ProductId\r\n ";
                return db.Connection.Query<Product>(sql, new { CategoryId }).ToList();
            }
        }
        public bool Insert(Product product)
        {
            if (product == null) return false;
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = $"INSERT INTO [dbo].[Product]\r\n           ([Name]\r\n           ,[Price], [CategoryId])\r\n     VALUES\r\n           (@Name\r\n           ,@Price, @CategoryId); select scope_identity()";
                var id = db.Connection.QueryFirstOrDefault<int>(sql, new { product.Name, product.Price, product.CategoryId });
                product.ProductId = id;
                return id > 0;

            }
        }
    }
}
