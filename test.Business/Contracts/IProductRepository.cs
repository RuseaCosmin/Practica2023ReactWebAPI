using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using test.Business.Domain;

namespace test.Business.Contracts
{
    public interface IProductRepository
    {
        List<Product> GetAllByCategory(int CategoryId);
        bool Insert(Product product);

    }
}
