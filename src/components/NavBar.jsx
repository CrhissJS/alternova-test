import React, { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Cart from "./Cart";
import alternovalogo from "../images/alternovalogo.png";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar
      className="my-2 p-1 navbar"
      style={{ border: "none", boxShadow: "0 2px 4px 0 rgba(0,0,0,.7)" }}
      bg="light"
      expand="lg"
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Nav className="justify-content-center" id="basic-navbar-nav">
        <Nav.Link href="/#/">
          <img
            className="alternovalogo"
            style={{
              width: "300px",
              height: "100%",
            }}
            src={alternovalogo}
            alt=""
          />
        </Nav.Link>
        <img
          style={{ width: "100px", height: "100%" }}
          className="shoppingman"
          src="https://content.presentermedia.com/content/animsp/00007000/7277/stick_figure_shopping_cart_300_wht.gif"
          alt=""
        />
      </Nav>

      <Navbar.Collapse
        className="justify-content-end carritonavbar"
        id="basic-navbar-nav"
      >
        <Nav>
          <Container
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
          >
            <Nav.Link
              className="carrito"
              style={{
                zIndex: "998",
                background: "black",
                opacity: ".7",
                width: "40px",
                height: "40px",
              }}
              as={Button}
              onClick={handleShow}
            >
              <i
                style={{ fontSize: "20px", color: "white" }}
                className="fa-solid fa-cart-shopping"
              ></i>
            </Nav.Link>
          </Container>
        </Nav>
      </Navbar.Collapse>

      <Cart show={show} handleClose={handleClose} />
    </Navbar>
  );
};

export default NavBar;
