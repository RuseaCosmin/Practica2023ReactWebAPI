import * as React from "react";
import { useState } from "react";
class Category {
    categoryId: number;
    name: string;
    description: string;
}
interface Props {
    items: Category[];
    count: number[];
    heading: string;
    onSelectItem: (item) => void;
}
function CategoriesListGroup({items, count, heading, onSelectItem}: Props) {
    //const items = ["A", "B", "C"];
    /* const message = items.length === 0 ? <p>No Items Found</p> : null;
     const getMessage = () => { return items.length === 0 ? <p>No Items Found</p> : null };
    */
    
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [paragraph, setParagraph] = useState("");
    let desc;
    if (paragraph !== "")
        desc = <p className="bg-dark" style={{ color: "white", borderRadius: '25px', textAlign: 'center' }} >{paragraph}</p>;
    return (
        <>
            <h1>{heading}</h1>
            {items.length === 0 && <p>No Items Found</p>}
            <ul className="list-group">
                {items.map((item, index) => (
                    <li className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
                        key={item.categoryId}
                        onClick={() => { onSelectItem(item); setSelectedIndex(index);  setParagraph(item.description); }}>
                        {item.name + " (" + count[index] + ")"}
                        <button className="btn">+</button>
                    </li>))}
            </ul>
            <br></br>
            {desc}
            
        </>
    );
}

export default CategoriesListGroup;