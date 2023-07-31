using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practica2023React.Business.Domain
{
    public class CartProduct
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Ammount { get; set; }
        public string Image { get; set; }
    }
}
