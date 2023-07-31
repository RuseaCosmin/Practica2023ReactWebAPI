import * as React from "react";
import { useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import AdminCategoryTable from "../components/AdminCategoryTable.tsx";

function AdminPage() {
    document.body.style.background = "";

    const [categories, setCategories] = useState([]);
    const [cookies, setCookie] = useCookies(["token"]);
    const [loading, setLoading] = useState(true);
    React.useEffect(() => {
        populateCategories();
    }, []);
    async function populateCategories() {
        console.log(cookies.token["token"]);
        const response = await fetch('api/categories', {
            headers: { 'Authorization': 'Bearer ' + cookies.token["token"] }
        });
        const data = await response.json();
        setCategories(data);
        setLoading(false);


    }
    function renderCategories(categories) {
        return (
            <>
                <AdminCategoryTable items={categories}></AdminCategoryTable>

            </>
        )
    }
    let contents = loading
        ? <p><em>Loading...</em></p>
        : renderCategories(categories);
    return contents;
}

export default AdminPage