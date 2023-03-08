import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useDeleteProductMutation } from "../services/appApi"
import './DashboardProducts.css';
import Pagination from './Pagination';


function DashboardProducts() {
    const products = useSelector(state => state.products);
    const user = useSelector(state => state.user);

    //removing the product
    const [deletProduct, { isLoading }] = useDeleteProductMutation();

    function handleDeleteProduct(id) {
        //logic here
        if (window.confirm("Are you sure?")) deletProduct({ product_id: id, user_id: user._id });
    }

    // reason for pagination
    function TableRow({ pictures, _id, name, price }) {
        return (
            <tr>
                <td>
                    <img src={pictures[0].url} className='dashboard-product-preview' alt='' />
                </td>
                <td>{_id}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>
                    <Button onClick={() => handleDeleteProduct(_id, user._id)} disabled={isLoading}>
                        Delete
                    </Button>
                    <Link to={`/product/${_id}/edit`} className='btn btn-warning'>
                        Edit
                    </Link>
                </td>
            </tr>
        )
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th></th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                </tr>
            </thead>
            <tbody>

                {/* reason for pagination */}
                <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={5} tablePagination={true} />

            </tbody>
        </Table>
    )
}

export default DashboardProducts

