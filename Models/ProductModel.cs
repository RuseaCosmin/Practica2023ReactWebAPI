using System.Xml.Linq;
using test.Business.Domain;

namespace test.Models
{
    public class ProductModel
    {

        public ProductModel(Product entity)
        {
            CategoryId = entity.CategoryId;
            Name = entity.Name;
            Price = entity.Price;
            ProductId = entity.ProductId;
            Image = entity.Image;
        }
        public Product ToProduct()
        {
            return new Product { CategoryId = CategoryId, Name = Name, Price = Price, ProductId = ProductId };
        }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public string Image { get; set; }

    }
}
