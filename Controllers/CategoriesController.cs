using Microsoft.AspNetCore.Mvc;
using test.Business.Contracts;
using test.Business.Domain;
using test.Models;

namespace test.Controllers
{
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository) 
        {
            this.categoryRepository = categoryRepository;
        }
        [HttpGet("api/categories/count/{id}")]
        public int GetCountProducts([FromRoute] int id)
        {
            return categoryRepository.GetNrOfProducts(id);
        }
        [HttpGet("api/categories/{offset?}/{limit?}")]
        public List<CategoryModel> GetAll([FromRoute]int offset = 0,[FromRoute]int limit = 100)
        {
            var categories = categoryRepository.GetAll(offset, limit);

            return categories.Select(x => new CategoryModel(x)).ToList();
        }
        [HttpGet("api/categories/{id}")]
        public ActionResult<CategoryModel> Get([FromRoute] int id)
        {
            var categoryModel = new CategoryModel(categoryRepository.Get(id));
            if(categoryModel != null)
            {
                return categoryModel;
            }
            return NotFound("Entity Not Found");
        }

        [HttpPost("api/categories/insert")]
        public string Post(CategoryBody categoryBody)
        {
            if (categoryRepository.Insert(new Category() { Name = categoryBody.Name, Description = categoryBody.Description }) == true)
                return "Success";
            return "Failed";
        }
        [HttpPut("api/categories/update/{id}")]
        public ActionResult Update(CategoryBody categoryBody, [FromRoute] int id)
        {

            if (categoryRepository.Update(new Category() { CategoryId = id, Name = categoryBody.Name, Description = categoryBody.Description}))
                return Ok();
            return NotFound();
        }

        [HttpDelete("api/categories/{id}")]
        public ActionResult Delete([FromRoute] int id) 
        {
            if (categoryRepository.Delete(id) == true)
                return Ok();
            return NotFound();

        }
    }
}
