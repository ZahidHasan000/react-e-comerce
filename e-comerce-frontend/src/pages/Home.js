// import React from 'react'
// Create product show in Home under Last Product title
import axios from "../axios";
import React, { useEffect } from "react";

import { LinkContainer } from 'react-router-bootstrap';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Categories from '../categories';
import './Home.css'

// Create product show in Home under Last Product title
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

function Home() {

    // Create product show in Home under Last Product title
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 8);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);

    return (
        <div>
            <img src=" https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png" className="home-banner" alt='' />
            <div className='featured-product-container container mt-4'>
                <h2>Last Products</h2>

                {/* last products here */}
                {/* // Create product show in Home under Last Product title */}
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview {...product} />
                    ))}
                </div>

                <div>
                    <Link to='/category/all' style={{ textAlign: 'right', display: 'block', textDecoration: 'none' }}>
                        See More {'>>'}
                    </Link>
                </div>
            </div>
            {/* sale banner */}
            <div className='sale__banner--container mt-4'>
                <img src='https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png' alt='' />
            </div>
            <div className='recent-products-container container mt-4'>
                <h2>Categories</h2>
                <Row>
                    {
                        Categories.map((category) => (
                            <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
                                <Col md={4}>
                                    <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile" >
                                        {category.name}
                                    </div>
                                </Col>
                            </LinkContainer>
                        )
                        )
                    }
                </Row>
            </div>
        </div>
    )
}

export default Home
