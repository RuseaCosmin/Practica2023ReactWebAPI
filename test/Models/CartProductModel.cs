using Practica2023React.Business.Domain;

namespace Practica2023React.Models
{
    public class CartProductModel
    {
        public CartProductModel(CartProduct x)
        {
            Name = x.Name;
            Price = x.Price;
            Ammount = x.Ammount;
            Image = x.Image;
            ProductId = x.ProductId;
        }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Ammount { get; set; }
        public string Image { get; set; }
    }
}
