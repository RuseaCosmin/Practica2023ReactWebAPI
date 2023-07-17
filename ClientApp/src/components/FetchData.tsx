
import CategoriesListGroup from './CategoriesListGroup.tsx';
import ProductDisplayBox from './ProductDisplayBox.tsx';
import './FetchData.css'

import * as React from "react";
import { useState } from "react";
class Product {
    productId: number;
    name: string;
    price: number;
    categoryId: number;
}
function FetchData() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);
    const [products, setProducts] = useState([Product]);
    const [categorySelected, setCategorySelected] = useState(-1);
    const [categoryPageStart, setCategoryPageStart] = useState(0);
    const [categoryPage, setCategoryPage] = useState(1);
    const [nrOfCategories, setNrOfCategories] = useState(2);
    const [categoryIsClicked, setCategoryIsClicked] = useState(false);
    const [categoryFirstClicked, setCategoryFirstClicked] = useState(false);
    const [prodCount, setProdCount] = useState([]);
    const [priceSorting, setPriceSorting] = useState("");
    const [nameSorting, setNameSorting] = useState("");

    async function populateCategories(start, ammount) {
        const response = await fetch('api/categories/'+ start +'/'+ammount);
        const data = await response.json();
        await populateCounts(data);

        setCategories(data);
        setLoading(false);

        

    }
    async function populateCounts(data) {
        const texts = await Promise.all(data.map(async category => {
            const resp = await fetch('api/categories/count/' + category.categoryId);
            return resp.text();
        }));

        setProdCount(texts);
        console.log(texts);
    }
    async function populateProducts() {
        const response = await fetch('api/products/' + categorySelected);
        const data = await response.json();
        setProducts(data);
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
        console.log(priceSorting);
        var prods = products.slice();
        setProducts(prods);
    }, [priceSorting]);
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
                        setPriceSorting("DESC");
                        setNameSorting("");
                    }
                    else {
                        setProducts(products.sort((a, b) => { return b.price - a.price }));
                        setPriceSorting("ASC");
                        setNameSorting("");
                    }
                }}>Price</button>
                <button className={nameSorting === "ASC" ? "btn btn-a" : "btn btn-b"} onClick={() => {
                    if (nameSorting === "ASC") {
                        setProducts(products.sort((a, b) => { if (a.name < b.name) return -1; if (a.name > b.name) return 1; return 0; }));
                        setNameSorting("DESC");
                        setPriceSorting("");
                    }
                    else {
                        setProducts(products.sort((a, b) => { if (a.name > b.name) return -1; if (a.name < b.name) return 1; return 0; }));
                        setNameSorting("ASC");
                        setPriceSorting("");
                    }
                }}>Name</button>

            </>
        )
    }
    //populateCategoriesAndProducts();
    let contents = loading
        ? <p><em>Loading...</em></p>
        : renderCategories(categories);
    let productsContents = productsLoading
        ? <p><em>Loading...</em></p>
        : products.map((product) => <ProductDisplayBox item={product} ></ProductDisplayBox>)

    return (<div className="row row-page">

        <div className="col">
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