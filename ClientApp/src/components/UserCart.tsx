import * as React from "react";
import "./UserCart.css"
import { useState } from "react";
import jwt_decode from "jwt-decode";
import CartItem from "./CartItem.tsx";

class Product {
    productId: number;
    name: string;
    price: number;
    categoryId: number;
    ammount: number;
}
interface Props {
    items: Product[];
}
function UserCart({ items }: Props) {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tot, setTot] = useState(0);
    /*function checkExpirationOfToken() {
        const token = localStorage.getItem("token");
        console.log(token);
        const decodedToken = jwt_decode(token);
        const currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: JSON.parse(localStorage.getItem("user")).username, password: JSON.parse(localStorage.getItem("user")).password, role: userCookies.user["role"], token: JSON.parse(localStorage.getItem("user")).role, refToken: localStorage.getItem("refToken"), refTokenExp: localStorage.getItem("refTokenExp") })
            };
            fetch('api/users/refresh', requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    else {

                        throw new Error("Refresh Failed");//send to login
                    }
                })
                .then(data => {
                    setCookie("token", { token: data.token, refToken: data.refToken, refTokenExp: data.refTokenExp }, { path: "/" });
                    console.log(data);
                    localStorage.setItem("user", JSON.stringify({ username: user.username, password: user.password, role: user.role }));
                }
                )
                .catch(error => console.log(error));
            return false
        } else {
            console.log("Valid token");
            return true;
        }
    }*/
    async function populateCart(username) {
        //checkExpirationOfToken();
        const response = await fetch('api/carts/' + username, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        });
        const data = await response.json();
        console.log(data);

        setCart(data);
        setLoading(false);


    }
    React.useEffect(() => {
        populateCart(JSON.parse(localStorage.getItem("user")).username);
    }, []);
    var total = 0;
    let cartContent = loading
        ? <p><em>Loading...</em></p>
        : (cart.forEach((item) => { total = total + item.price * item.ammount }), cart.map((product) => <CartItem item={product} items={cart} setCart={setTot} total={total}></CartItem>))
    
    function getTotal() {
        
        //cart.forEach((item) => { setTotal(total + item.price) });
        
    }
    function placeOrder() {

        const titleKeys = Object.keys(cart[0]);
        const refinedData = [];
        refinedData.push(titleKeys);

        cart.forEach(item => {
            refinedData.push(Object.values(item))
        })
        let csvContent = '';

        refinedData.forEach(row => {
            csvContent += row.join(',') + '\n'
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
        const objUrl = URL.createObjectURL(blob);
        const link = document.createElement('a')
        link.style = "display: none";
        link.setAttribute('href', objUrl)
        link.setAttribute('download', JSON.parse(localStorage.getItem("user")).username + ' Order.csv')
        document.querySelector('body').append(link)
        link.click();
    }
    return (
        <div className="page">
            <h1 className="text-center">Your Cart</h1>

            {cartContent}
            {cart.length > 0 ? <>
            <hr></hr>
            <p>Total: ${total}</p>
            <button className="btn" onClick={placeOrder}>Send</button>
            </> : <p className="text-center">Cart Empty</p> }
            
        </div>
    );
}

export default UserCart