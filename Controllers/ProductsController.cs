using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using test.Business.Contracts;
using test.Business.Domain;
using test.Data.Repositories;
using test.Models;

namespace test.Controllers
{
    [Authorize]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository productRepository;
        public ProductsController(IProductRepository repository)
        {
            productRepository = repository;
        }
        [HttpGet("api/products/{categoryId}")]
        public List<ProductModel> GetAllByCategory([FromRoute] int categoryId)
        {
            var products = productRepository.GetAllByCategory(categoryId);

            return products.Select(x => new ProductModel(x)).ToList();
        }
        [Authorize(Policy = "Admin")]
        [HttpPost("api/products/insert")]
        public string Post(ProductBody productBody)
        {
            if (productRepository.Insert(new Product() { Name = productBody.Name, Price = productBody.Price, CategoryId = productBody.CategoryId }) == true)
                return "Success";
            return "Failed";
        }
    }
}
