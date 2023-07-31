using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Practica2023React.Business.Contracts;
using Practica2023React.Business.Domain;
using Practica2023React.Models;
using test.Business.Contracts;
using test.Business.Domain;
using test.Data.Repositories;
using test.Models;

namespace Practica2023React.Controllers
{
    [Authorize]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository cartRepository;

        public CartController(ICartRepository cartRepository)
        {
            this.cartRepository = cartRepository;
        }
        [HttpGet("api/carts/{username}")]
        public List<CartProductModel> GetAllByUser([FromRoute] string username)
        {
            var cart = cartRepository.GetAll(username);

            return cart.Select(x => new CartProductModel(x)).ToList();
        }
        [HttpPost("api/carts/insert")]
        public string Post(CartModel cartModel)
        {
            if (cartRepository.Insert(new Cart() { ProductId = cartModel.ProductId, Username = cartModel.Username }) == true)
                return "Success";
            return "Failed";
        }
        [HttpDelete("api/carts/{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            if (cartRepository.Delete(id) == true)
                return Ok();
            return NotFound();

        }
    }
}
