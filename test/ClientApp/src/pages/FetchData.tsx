import jwt_decode from "jwt-decode";
import CategoriesListGroup from '../components//CategoriesListGroup.tsx';
import ProductDisplayBox from '../components/ProductDisplayBox.tsx';
import './FetchData.css'
import Slider from "@mui/material/Slider";
import * as React from "react";
import { useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

class Product {
    productId: number;
    name: string;
    price: number;
    categoryId: number;
}
function FetchData() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);
    const [products, setProducts] = useState([Product]);
    const [productsTemp, setProductsTemp] = useState([Product]);
    const [categorySelected, setCategorySelected] = useState(-1);
    const [categoryPageStart, setCategoryPageStart] = useState(0);
    const [categoryPage, setCategoryPage] = useState(1);
    const [nrOfCategories, setNrOfCategories] = useState(2);
    const [categoryIsClicked, setCategoryIsClicked] = useState(false);
    const [categoryFirstClicked, setCategoryFirstClicked] = useState(false);
    const [prodCount, setProdCount] = useState([]);
    const [priceSorting, setPriceSorting] = useState("");
    const [nameSorting, setNameSorting] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const [userCookies, setUserCookies] = useCookies(["user"]);
    const [range, setRange] = React.useState([0, 100]);
 
    function checkExpirationOfToken() {
        const token = cookies.token["token"];
        console.log(token);
        const decodedToken = jwt_decode(token);
        const currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: userCookies.user["username"], password: userCookies.user["password"], role: userCookies.user["role"], token: cookies.token["token"], refToken: cookies.token["refToken"], refTokenExp: cookies.token["refTokenExp"] })
            };
            var today = new Date();
            var now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            var refStr = localStorage.getItem("refTokenExpStr").split('.');
            var refExp = new Date(Number.parseInt(refStr[2]), Number.parseInt(refStr[1]) - 1, Number.parseInt(refStr[0]));
            if (now > refExp) {
                console.log("Refresh Token Expired");
                localStorage.clear();
                document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
                navigate('/', { refresh: true });
                // eslint-disable-next-line no-restricted-globals
                location.reload();
                return;
            }
            else {
                console.log("Refresh Token Valid");
            }
            fetch('api/users/refresh', requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                       
                        throw new Error("Refresh Failed");
                    }
                })
                .then(data => {
                    setCookie("token", { token: data.token, refToken: data.refToken, refTokenExp: data.refTokenExp } , { path: "/" });
                    console.log(data);
                    setCookie("user", { username: userCookies.user["username"], password: userCookies.user["password"], role: userCookies.user["role"] } , { path: "/" })
                }
                )
                .catch(error => console.log(error));
            return false
        } else {
            console.log("Valid token");
            return true;
        }
    }
    function handleChanges(event, newValue) {
        setRange(newValue);
        
    }
    async function populateCategories(start, ammount) {
        checkExpirationOfToken();
        console.log(cookies.token["token"]);
        const response = await fetch('api/categories/' + start + '/' + ammount, {
            headers: { 'Authorization': 'Bearer ' + cookies.token["token"] }
        });
        const data = await response.json();
        await populateCounts(data);

        setCategories(data);
        setLoading(false);
        

    }
    async function populateCounts(data) {
        const texts = await Promise.all(data.map(async category => {
            const resp = await fetch('api/categories/count/' + category.categoryId, {
                headers: { 'Authorization': 'Bearer ' + cookies.token["token"] }
            });
            return resp.text();
        }));

        setProdCount(texts);
        console.log(texts);
    }
    async function populateProducts() {
        const response = await fetch('api/products/' + categorySelected, {
            headers: { 'Authorization': 'Bearer ' + cookies.token["token"] }
        });
        const data = await response.json();
        setProductsTemp(data);
        const prods = data.filter(prod => prod.price >= range[0]*10 && prod.price <= range[1]*10);
        setProducts(prods);
        setProductsLoading(false);
    }
    React.useEffect(() => {
        populateCategories(categoryPageStart, nrOfCategories);
    }, []);
    React.useEffect(() => {
        populateCategories(categoryPageStart, nrOfCategories);

    }, [categoryPageStart, nrOfCategories])
    React.useEffect(() => {
        setProductsLoading(true);
        populateProducts();
    }, [categorySelected]);
    React.useEffect(() => {
        var prods = products.slice();
        setProducts(prods);
    }, [priceSorting]);
    React.useEffect(() => {
        var prods = productsTemp.filter(prod => prod.price >= range[0] * 10 && prod.price <= range[1] * 10);
        setProducts(prods);
    }, [range]);
    function renderCategories(categories) {
        return (
            <>
            
                <CategoriesListGroup key={categoryPageStart} items={categories} count={prodCount} heading={"Categories"} onSelectItem={(item) => { setCategorySelected(item.categoryId); setCategoryIsClicked(true); setCategoryFirstClicked(true) }} ></CategoriesListGroup>
                <div className="text-center">
                    <button className="btn btn-primary btn-prev" onClick={() => categoryPageStart > 0 ? (setCategoryPageStart(categoryPageStart - nrOfCategories), setCategoryPage(categoryPage - 1)) : null}> Prev </button>
                <text className="page-nr">{categoryPage}</text>
                    <button className="btn btn-primary btn-next" onClick={() => categories.length > 0 ? (setCategoryPageStart(categoryPageStart + nrOfCategories), setCategoryPage(categoryPage + 1)) : null}> Next </button>
                </div>
                <select id="number" className="form-select" onChange={() => {
                    var e = document.getElementById("number");
                    var val = parseInt(e.value);
                    setNrOfCategories(val);
                    setCategoryPageStart(0);
                    setCategoryPage(1);
                }} >
                    <option id="1" value="2" >2 Categories Per Page</option>
                    <option id="2" value="5" >5 Categories Per Page</option>
                    <option id="3" value="10" >10 Categories Per Page</option>
                    <option id="4" value="50" >50 Categories Per Page</option>
                </select>

            </>
        )
    }
    function renderFilters() {
        return (
            <>
                <h2>Filters</h2>
                <button className={priceSorting === "ASC" ? "btn btn-a" : "btn btn-b"} onClick={() => {
                    if (priceSorting === "ASC") {
                        setProducts(products.sort((a, b) => { return a.price - b.price }));
                        setProductsTemp(productsTemp.sort((a, b) => { return a.price - b.price }));
                        setPriceSorting("DESC");
                        setNameSorting("");
                    }
                    else {
                        setProducts(products.sort((a, b) => { return b.price - a.price }));
                        setProductsTemp(productsTemp.sort((a, b) => { return b.price - a.price }));
                        setPriceSorting("ASC");
                        setNameSorting("");
                    }
                }}>Price</button>
                <button style={{float:"right"}} className={nameSorting === "ASC" ? "btn btn-a" : "btn btn-b"} onClick={() => {
                    if (nameSorting === "ASC") {
                        setProducts(products.sort((a, b) => { if (a.name < b.name) return -1; if (a.name > b.name) return 1; return 0; }));
                        setProductsTemp(productsTemp.sort((a, b) => { if (a.name < b.name) return -1; if (a.name > b.name) return 1; return 0; }));
                        setNameSorting("DESC");
                        setPriceSorting("");
                    }
                    else {
                        setProducts(products.sort((a, b) => { if (a.name > b.name) return -1; if (a.name < b.name) return 1; return 0; }));
                        setProductsTemp(productsTemp.sort((a, b) => { if (a.name > b.name) return -1; if (a.name < b.name) return 1; return 0; }));
                        setNameSorting("ASC");
                        setPriceSorting("");
                    }
                }}>Name</button>
                <div style={{ padding: "10px" }}>
                    Price Range
                    <Slider value={range} onChange={handleChanges} valueLabelDisplay="auto" />
                    The selected range is ${range[0]*10} - ${range[1]*10}
                </div>
            </>
        )
    }
    let contents = loading
        ? <p><em>Loading...</em></p>
        : renderCategories(categories);
    let productsContents = productsLoading
        ? <p><em>Loading...</em></p>
        : products.map((product) => <ProductDisplayBox item={product} ></ProductDisplayBox>)

    return (<div className="row row-page">

        <div className="col col-prod">
            <h2>Products</h2>
            {!categoryFirstClicked ? <p>Select a category</p> : null}

            {categoryIsClicked ? productsContents : null}
        </div>
        <div className="col-3 category-side-bar">
            {renderFilters()}
            
            <hr className="line"></hr>
            {contents}
        </div>
    </div>
    );
}

export default FetchData