import * as React from "react"
import './PostCategory.css'
function PostCategory() {
    const post = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: document.getElementById("Name").value, description: document.getElementById("Description").value })
        };
        fetch('api/categories/insert', requestOptions)
            .then(response => console.log(response))
            
    };
    document.body.style.backgroundColor = "#080710";
    return (
        <>
            <form className="blur blur2" >
                <h3>Create Category</h3>
                <hr />
                <div className="row">
                    <div className="form-group">
                        <label className="control-label">Name</label>
                        <input id="Name" required />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Description</label>
                        <input id="Description" required />
                    </div>
                    <div className="form-group">
                        <input onClick={post} type="submit" value="Create" className="btn btn-a btn-primary" />
                    </div>

                    
                </div>
            </form>
        </>
    )
}
export default PostCategory