using test.Business.Contracts;
using System.Data.SqlClient;

namespace test.Data
{
    public class SqlDataContext : IDisposable
    {
        public SqlConnection Connection { get; }

        public SqlDataContext(IConnectionString connectionString) 
        {
            Connection = new SqlConnection(connectionString.SqlConnectionString);
            Connection.Open();
        }

        public void Dispose()
        {
            if(Connection == null)
            {
                return;
            }
            Connection.Close();
            Connection.Dispose();
        }
    }
}
