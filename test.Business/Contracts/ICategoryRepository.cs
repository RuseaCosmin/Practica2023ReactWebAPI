using test.Business.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace test.Business.Contracts
{
    public interface ICategoryRepository
    {
        List<Category> GetAll(int offset, int limit);
        Category Get(int id);
        bool Delete(int id);
        bool Insert(Category category);
        bool Update(Category category);
        int GetNrOfProducts(int id);
        List<Category> GetAllNoPag();
    }
}
