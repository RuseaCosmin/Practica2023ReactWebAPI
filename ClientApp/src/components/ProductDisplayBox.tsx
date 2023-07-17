import * as React from "react";
import './ProductDisplayBox.css'

class Product {
    productId: number;
    name: string;
    price: number;
    categoryId: number;
}
interface Props {
    item: Product;
}
function ProductDisplayBox({item}: Props) {
    return (
        <div className="card">
            <h2>{item.name}</h2>
            <p className="price">${item.price}</p>
                <p><button>Add to Cart</button></p>
        </div>)

}
export default ProductDisplayBox