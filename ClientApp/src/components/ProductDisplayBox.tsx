import * as React from "react";
import './ProductDisplayBox.css'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
class Product {
    productId: number;
    name: string;
    price: number;
    categoryId: number;
    image: string;
}
interface Props {
    item: Product;
}
function ProductDisplayBox({ item }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [anchorElErr, setAnchorElErr] = React.useState<HTMLElement | null>(null);
    function handleClick(event: React.MouseEvent<HTMLElement>) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") },
                body: JSON.stringify({ username: JSON.parse(localStorage.getItem("user")).username, productId: item.productId })
            };
            fetch('api/carts/insert', requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                    else {

                        throw new Error("Error Adding To Cart")
                    }
                }).catch(error => console.log(error));

        setAnchorEl(event.currentTarget);
    }
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const handlePopoverErrClose = () => {
        setAnchorElErr(null);
    };

    const open = Boolean(anchorEl);
    const openErr = Boolean(anchorElErr);

    return (
        <div className="card">
            <h2>{item.name}</h2>
            <img src={item.image} style={{ maxWidth: "250px" }}></img>
            <p className="price">${item.price}</p>
            <p><Button onClick={handleClick}  onMouseLeave={handlePopoverClose}>Add to Cart</Button></p>


            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>Added to cart</Typography>
            </Popover>
            <Popover
                id="mouse-over-popover-err"
                sx={{
                    pointerEvents: 'none',
                }}
                open={openErr}
                anchorEl={anchorElErr}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>Error</Typography>
            </Popover>
        </div>)

}
export default ProductDisplayBox