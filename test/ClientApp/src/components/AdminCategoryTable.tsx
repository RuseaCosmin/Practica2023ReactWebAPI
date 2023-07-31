import * as React from "react";
import './AdminCategoryTable.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
class Category {
    Categoryid: number;
    name: string;
    description: string;
    actions;
}
const onClickAdd = (e) => {
    e.stopPropagation();

};
const onClickView = (e) => {
    e.stopPropagation();
};
interface Props {
    items: Category[];
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function AdminCategoryTable({ items }: Props) {
    const [openAddProd, setOpenAddProd] = React.useState(false);
    const handleOpenAddProd = () => setOpenAddProd(true);
    const handleCloseAddProd = () => setOpenAddProd(false);
    const [openViewProd, setOpenViewProd] = React.useState(false);
    const handleOpenViewProd = () => setOpenViewProd(true);
    const handleCloseViewProd = () => setOpenViewProd(false);
    function Actions(id) {
        return (
            <Button >Add Product</Button>
        );
    }
    const columns: GridColDef[] = [
        { field: 'categoryId', headerName: 'ID', flex: 0.1 },
        { field: 'name', headerName: 'Category name', flex: 0.5 },
        { field: 'description', headerName: 'Description', flex: 0.7 },
        {
            field: 'actions', headerName: 'Actions', flex: 0.99, renderCell: (params) => {

                return (
                    <>
                        <Button onClick={handleOpenAddProd} >Add Product</Button>
                        <Modal
                            open={openAddProd}
                            onClose={handleCloseAddProd}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Add Product
                                </Typography>
                            </Box>
                        </Modal>
                        <Button onClick={handleOpenViewProd} >View And Modify Products</Button>
                        <Modal
                            open={openViewProd}
                            onClose={handleCloseViewProd}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    View Products
                                </Typography>
                            </Box>
                        </Modal>
                    </>
                );
            }
        }
    ];
    items.forEach(item => { item.actions = Actions(item.Categoryid) })
    return (
        <>
        <h1 className="text-center">Categories</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={items}
                    getRowId={(row) => row.categoryId }
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
            {/*            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category ID</TableCell>
                            <TableCell align="right">Category Name</TableCell>
                            <TableCell align="right">Actions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.categoryId}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">d</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>*/}
            {/*<table className="table">    

                <tr>
                    <th>Category ID</th>
                    <th>Category Name</th>
                    <th>Actions</th>
                </tr>
                {items.map((item, index) => (
                    <tr>
                        <td>{item.categoryId}</td>
                        <td>{item.name}</td>
                        <td>{Actions(item.categoryId)}</td>
                    </tr>
                        
                    ))}
        </table>*/}
        </>
    );
}

export default AdminCategoryTable