import alternovalogo from "../images/alternovalogo.png";
import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  resetCart,
  updateProduct,
} from "../store/slices/cart.slice";
import { generateJson } from "../utils/generateJson";
import { v4 as uuidv4 } from "uuid";
import "antd/dist/antd.css";
import { message } from "antd";

const Cart = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const totalProducts = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const getTotal = () => {
    let total = 0;

    cart.forEach((product) => {
      total += Number(product.price) * product.quantity;
    });

    return total;
  };

  const increase = (product) => {
    const stockProduct = products.find(({ id }) => id === product.id).stock;
    if (product.quantity === stockProduct) {
      message.error("You cannot add more products");
    } else {
      dispatch(
        updateProduct({
          id: product.id,
          quantity: product.quantity + quantity,
        })
      );
    }
  };
  const decrease = (product) => {
    if (product.quantity <= 1) {
      dispatch(deleteProduct(product.id));
    } else {
      dispatch(
        updateProduct({
          id: product.id,
          quantity: product.quantity - quantity,
        })
      );
    }
  };

  const clearCart = () => {
    if (totalProducts === 0) {
      message.error("The cart is already empty");
    } else {
      message.success("The cart has been emptied");
      dispatch(resetCart());
    }
  };

  const buyCart = () => {
    if (totalProducts <= 0) {
      message.error("No more products in the cart");
    } else {
      message.success("File has been generated");
      generateJson(
        JSON.stringify({
          total_cost: getTotal(),
          total_products: totalProducts,
          products: cart,
          time_stamp: new Date().toJSON(),
        }),
        `order_${uuidv4()}.json`
      );

      dispatch(resetCart());
      handleClose(true);
    }
  };

  const deleteProductFromCart = (product) => {
    message.success("Product deleted");
    dispatch(deleteProduct(product));
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement={"end"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title
          style={{
            color: "red",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img
            style={{
              width: "150px",
              height: "100%",
            }}
            src={alternovalogo}
            alt=""
          />
        </Offcanvas.Title>
        <Button className="trash" onClick={clearCart} variant="outline-danger">
          <i style={{ fontSize: "30px" }} className="fa-solid fa-trash-can"></i>
        </Button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.map((product) => (
          <li
            style={{
              marginBottom: "10px",
              borderBottom: "1px solid lightgreen",
              padding: "20px",
              listStyle: "none",
            }}
            key={product.id}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteProductFromCart(product)}
              >
                X
              </Button>
            </div>
            <br />
            <h5 style={{ color: "lightgreen" }}>{product.name}</h5>
            <h5>quantity: {product.quantity}</h5>
            <h5>
              price: ${" "}
              <span style={{ color: "red" }}>
                {" "}
                {product.price * product.quantity}
              </span>
            </h5>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "30px",
              }}
            >
              <button
                className="button-hovered"
                style={{ background: "white", border: "none" }}
                onClick={() => decrease(product)}
              >
                <i
                  style={{ fontSize: "30px" }}
                  className="fa-regular fa-square-minus"
                ></i>
              </button>
              <div
                style={{
                  padding: "3px",
                  margin: "0 10px",
                  borderBottom: "4px solid red",
                }}
              >
                {product.quantity}
              </div>
              <button
                className="button-hovered"
                style={{ background: "white", border: "none" }}
                onClick={() => increase(product)}
              >
                <i
                  style={{ fontSize: "30px" }}
                  className="fa-regular fa-square-plus"
                ></i>
              </button>
            </div>
          </li>
        ))}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <h4 style={{ position: "fixed", bottom: "20px" }}>
            Total: <span style={{ color: "lightgreen" }}>$</span>{" "}
            <span style={{ color: "red" }}>{getTotal()}</span>{" "}
          </h4>
          <Button
            onClick={() => buyCart()}
            style={{ position: "fixed", bottom: "5px", right: "20px" }}
            variant="outline-success"
          >
            <i
              style={{ fontSize: "35px" }}
              className="fa-solid fa-cart-arrow-down"
            ></i>
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
