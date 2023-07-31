using Practica2023React.Business.Domain;

namespace Practica2023React.Business.Contracts
{
    public interface ICartRepository
    {
        bool Delete(int id);
        List<CartProduct> GetAll(string username);
        bool Insert(Cart cart);
    }
}
