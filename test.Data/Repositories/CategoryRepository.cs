using Dapper;
using test.Business.Contracts;
using test.Business.Domain;
using System.Collections.Generic;

namespace test.Data.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IConnectionString connectionString;

        public CategoryRepository(IConnectionString connectionString)
        {
            this.connectionString = connectionString;
        }
        public int GetNrOfProducts(int id) 
        {
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = "select count(*) from Product where CategoryId = @id";
                return db.Connection.Query<int>(sql, new { id }).FirstOrDefault();
            }
        }
        public List<Category> GetAllNoPag()
        {
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = "SELECT [CategoryId]\r\n      ,[Name]\r\n      ,[Description]\r\n  FROM [dbo].[Category]\r\n  ORDER BY CategoryId";
                return db.Connection.Query<Category>(sql).ToList();
            }
        }
        public List<Category> GetAll(int offset, int limit)
        {
            using(var db = new SqlDataContext(connectionString))
            {
                var sql = "SELECT [CategoryId]\r\n      ,[Name]\r\n      ,[Description]\r\n  FROM [dbo].[Category]\r\n  ORDER BY CategoryId\r\n  OFFSET @offset ROWS\r\n  FETCH NEXT @limit ROWS ONLY";
                return db.Connection.Query<Category>(sql, new { offset, limit }).ToList();
            }
        }
        public Category Get(int id)
        {
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = "SELECT [CategoryId]\r\n      ,[Name]\r\n      ,[Description]\r\n  FROM [dbo].[Category]\r\n  WHERE CategoryId= @id";
                return db.Connection.Query<Category>(sql, new {id}).FirstOrDefault();
            }
        }
        public bool Delete(int id)
        {
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = "delete from dbo.Category where CategoryId = @id; select @@ROWCOUNT;";
                var affectedRows = db.Connection.Query<int>(sql, new {id});
                return affectedRows.FirstOrDefault()>0;
            }
        }
        public bool Insert(Category category)
        {
            if (category == null) return false;
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = $"INSERT INTO [dbo].[Category]\r\n           ([Name]\r\n           ,[Description])\r\n     VALUES\r\n           (@Name\r\n           ,@Description); select scope_identity()";
                var id = db.Connection.QueryFirstOrDefault<int>(sql, new {category.Name, category.Description});
                category.CategoryId = id;
                return id>0;

            }
        }
        public bool Update(Category category)
        {
            if (category == null) return false;
            using (var db = new SqlDataContext(connectionString))
            {
                var sql = $"UPDATE [dbo].[Category]\r\n   SET [Name] = @Name\r\n      ,[Description] = @Description\r\n WHERE CategoryId=@CategoryId; select @@ROWCOUNT";
                var id = db.Connection.QueryFirstOrDefault<int>(sql, category);
                category.CategoryId = id;
                return id > 0;

            }
        }
    }
}
