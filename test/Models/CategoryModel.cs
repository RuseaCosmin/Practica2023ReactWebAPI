using test.Business.Domain;
using System.Text.Json.Serialization;

namespace test.Models
{
    public class CategoryModel
    {

        public CategoryModel(Category entity)
        {
            CategoryId = entity.CategoryId;
            Name = entity.Name;
            Description = entity.Description;
        }
        public Category ToCategory()
        {
            return new Category() { CategoryId = CategoryId, Name = Name, Description = Description };
        }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
