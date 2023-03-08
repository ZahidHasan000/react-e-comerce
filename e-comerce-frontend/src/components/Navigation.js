// import React from 'react';
import axios from "../axios";
import React, { useRef, useState } from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Button from 'react-bootstrap/Button';

import { useDispatch, useSelector } from 'react-redux';
import { logout, resetNotifications } from '../features/userSlice';

import { LinkContainer } from "react-router-bootstrap";
// import Button from 'react-bootstrap/esm/Button';

import './Navigation.css'

function BasicExample() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    //reason for socket io notification
    const bellRef = useRef(null);
    const notificationRef = useRef(null);
    const [bellPos, setBellPos] = useState({});


    function handleLogout() {
        dispatch(logout());
    }

    // how many massages you have (reason for socket io notification)
    const unreadNotifications = user?.notifications?.reduce((acc, current) => {
        if (current.status === "unread") return acc + 1;
        return acc;
    }, 0);

    // how many massages you have (reason for socket io notification)
    function handleToggleNotifications() {
        const position = bellRef.current.getBoundingClientRect();
        setBellPos(position);
        notificationRef.current.style.display = notificationRef.current.style.display === "block" ? "block" : "none";
        notificationRef.current.style.display = "block" ? "block" : "none";
        dispatch(resetNotifications());
        if (unreadNotifications > 0) axios.post(`/users/${user._id}/updateNotifications`);
    }


    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <LinkContainer to="/">
                    <Navbar.Brand>Ecomern</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link> */}
                        {/* if no user */}
                        {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
                        {/* <Nav.Link href="/login">login</Nav.Link> */}

                        {/* reason for Shopping Cart icon  */}
                        {user && !user.isAdmin && (
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>
                                    {user?.cart.count > 0 && (
                                        <span className="badge badge-warning" id="cartcount">
                                            {user.cart.count}
                                        </span>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                        )}

                        {/* if user */}
                        {user && (

                            // how many massages you have (reason for socket io notification)
                            <>
                                <Nav.Link style={{ position: "relative" }} onClick={handleToggleNotifications}>
                                    <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null}></i>

                                    {/* notification bell is showing  message number(with socket io method)  */}
                                    {/* < i className="fas fa-bell" ref={bellRef} data-count={10 || null}></i> */}
                                </Nav.Link>

                                {/* // <NavDropdown title="Dropdown" id="basic-nav-dropdown"> */}
                                <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">

                                    {user.isAdmin && (
                                        <>
                                            <LinkContainer to="/admin">
                                                <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/new-product">
                                                <NavDropdown.Item>Create Product</NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}

                                    {!user.isAdmin && (
                                        <>
                                            <LinkContainer to="/cart">
                                                <NavDropdown.Item>Cart</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/orders">
                                                <NavDropdown.Item>My orders</NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}

                                    <NavDropdown.Divider />

                                    <Button variant="danger" onClick={handleLogout} className="logout-btn">
                                        Logout
                                    </Button>
                                </NavDropdown>

                                {/* how many massages you have (reason for socket io notification) */}
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>

            {/* reason for socket io notifications */}
            {/* <div className="notifications-container" ref={notificationRef} style={{ position: "absolute", top: bellPos.top + 30, left: bellPos.left, display: "none" }}>
                {user?.notifications.length > 0 ? (

                    user?.notifications.map((notification) => (
                        <p className={`notification-${notification.status}`}>
                            {notification.message}
                            <br />
                            <span>{notification.time.split("T")[0] + " " + notification.time.split("T")[1]}</span>
                        </p>
                    ))

                ) : (
                    <p>No notifcations yet</p>
                )

                }
            </div> */}

        </Navbar >
    );
}

export default BasicExample;