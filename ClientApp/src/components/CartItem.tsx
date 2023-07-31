import * as React from "react";
class Product {
    productId: number;
    name: string;
    price: number;
    ammount: number;
    image: string;
}
interface Props {
    item: Product;
    items: Product[];
    setCart;
    total: number;
}
function CartItem({ item, items, setCart, total }: Props) {
    
    function deleteCartItem() {
        console.log(items);
        var cart = items;
        const index = cart.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cart.splice(index, 1); // 2nd parameter means remove one item only
        }
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        };
        fetch('api/carts/' + item.productId, requestOptions)
            .then(() => total = total - item.price * item.ammount).then(() => setCart(total))
        console.log(total);
    }
    return (
        
        <div>

        <div className="card-body">
            <div className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center">
                    <div>
                        <img
                            src={item.image}
                            className="img-fluid rounded-3" alt="Shopping item" style={{ width: "65px" }} />
                    </div>
                    <div className="ms-3">
                        <h5>{item.name}</h5>
                        <p className="small mb-0"></p>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                    <div style={{ width: "50px" }} >
                        <h5 className="fw-normal mb-0">{item.ammount}</h5>
                    </div>
                    <div style={{ width: "80px" }}>
                        <h5 className="mb-0">${item.price * item.ammount}</h5>
                    </div>
                    <button className="btn" onClick={deleteCartItem}><img width="20px" src="https://cdn-icons-png.flaticon.com/512/2891/2891491.png" alt="trash" className="fas fa-trash-alt"></img></button>
                </div>
            </div>
        </div>
    </div> 
    );
}

export default CartItem