import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Container } from "react-bootstrap";
import { getProducts } from "../store/slices/products.slice";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Container
        style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
      >
        <Row>
          <Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {products &&
                products.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
