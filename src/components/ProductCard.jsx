import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../store/slices/cart.slice";
import { Button, Card, Container } from "react-bootstrap";
import "antd/dist/antd.css";
import { message } from "antd";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(product.stock > 0 ? 1 : 0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const plus = () => {
    if (quantity + 1 > product.stock) {
      setTimeout(() => {
        message.error("no hay más productos");
      }, 1000);
    }
    setQuantity(quantity + 1);
  };

  const minus = () => {
    if (quantity - 1 <= 0) {
      setTimeout(() => {
        message.warning("La cantidad mínima es 1");
      }, 1000);
    }
    setQuantity(quantity - 1);
  };

  const addToCart = () => {
    const producto = cart.some(
      (productInCart) => productInCart.id === product.id
    );

    if (quantity === 1) {
      setTimeout(() => {
        message.success(`Adding ${quantity} product`);
      }, 100);
    } else {
      setTimeout(() => {
        message.success(`Adding ${quantity} products`);
      }, 100);
    }

    if (!producto) {
      dispatch(
        addProduct({
          id: product.id,
          name: product.name,
          price: product.unit_price,
          quantity: quantity,
        })
      );
    } else {
      dispatch(
        updateProduct({
          id: product.id,
          quantity: quantity + quantity,
        })
      );
    }
  };

  const minusFunction = () => {
    if (product.stock === 0) {
      message.error("No more products in stock");
    } else if (quantity <= 1) {
      message.warning("You have to buy minimum 1 product");
    } else {
      minus();
    }
  };

  return (
    <Card
      id="cards"
      className="cardproducts"
      style={{
        width: "18rem",
        margin: "20px",
        background: "#333",
      }}
    >
      <Card.Img src="https://placeimg.com/999/666/any" />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card.Title
          className="titlecards"
          style={{
            fontSize: "10px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1 className="neon" style={{ fontSize: "20px" }}>
            {product.name}
          </h1>
        </Card.Title>
        <div style={{}}>
          <h3
            style={{
              marginTop: "20px",
              color: "#e61a6e",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "lightgreen" }}>$</span> {product.unit_price}
          </h3>
          <h4 style={{ color: "white" }}>
            <span style={{ color: "lightgreen" }}>Stock:</span> {product.stock}
          </h4>
          <br />
        </div>
        <Card.Text style={{ color: "white" }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, illum.
        </Card.Text>
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <i
            onClick={() => minusFunction()}
            style={{ fontSize: "30px", color: "lightgreen" }}
            className="fa-regular fa-square-minus minussquare"
          ></i>
          <Button
            style={{
              background: "#333",
              color: "white",
              border: "none",
              borderBottom: "3px solid #e61a6e",
            }}
          >
            {quantity}
          </Button>

          <i
            onClick={
              quantity === product.stock
                ? () => message.error("No more products in stock")
                : plus
            }
            style={{ fontSize: "30px", color: "lightgreen" }}
            className="fa-regular fa-square-plus plussign"
          ></i>
        </Container>
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            className="buttonadd"
            style={{ background: "#333" }}
            onClick={
              product.stock < 1
                ? () => message.error("Product stocks out")
                : addToCart
            }
          >
            <i
              style={{ fontSize: "50px", color: "#e61a6e" }}
              className="fa-solid fa-cart-plus agregarproducto"
            ></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
