import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Container, Row, Col, Badge, ButtonGroup, Form, Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import { useAddToCartMutation } from "../services/appApi";
import "./layoutcss/ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import ToastMessage from "../components/ToastMessage";

function ProductPage() {
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);
    const [addToCart, { isSuccess }] = useAddToCartMutation();

    const handleDragStart = (e) => e.preventDefault();
    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product);
            setSimilar(data.similar);
        });
    }, [id]);

    if (!product) {
        return <Loading />;
    }
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const images = product.pictures.map((picture) => 
    <img className="product__carousel--image" src={picture.url} onDragStart={handleDragStart} />);

    let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx}>
                <SimilarProduct {...product} />
            </div>
        ));
    }

    return (
        <Container className="pt-4" style={{ position: "relative" }}>
            <Row>
                <Col lg={6}>
                    <AliceCarousel mouseTracking items={images} controlsStrategy="alternate" />
                </Col>
                <Col lg={6} className="pt-4">
                    <h1>{product.name}</h1>
                    {/* <p>
                        <Badge bg="primary">{product.category}</Badge>
                    </p> */}
                    
                    <p className="box-price-present">Giá:  {product.price} đ</p>

                    <p style={{ textAlign: "justify" }} className="py-3">
                        <strong>Mô tả về sản phẩm:</strong> {product.description}
                    </p>

                    <div  className="row">
                        <input  className="col input_size "  style={{backgroundColor:"white", }} placeholder="Size" disabled/>
                        
                        
                        <select  className="col">
                            <option value="1">M</option>
                            <option value="2">L</option>
                            <option value="3">XL</option>
                        </select>
                    </div>


                    {user && !user.isAdmin && (
                        <ButtonGroup style={{ width: "90%" }} className="mt-4">
                            <Form.Select size="lg" style={{ width: "40%", borderRadius: "0" }}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                            <Button size="lg" onClick={() => addToCart({ userId: user._id, productId: id, price: product.price, image: product.pictures[0].url })}>
                                Thêm Vào Giỏ Hàng
                            </Button>
                        </ButtonGroup>
                    )}
                    {user && user.isAdmin && (
                        <LinkContainer to={`/product/${product._id}/edit`}>
                            <Button size="lg">Sửa Sản Phẩm</Button>
                        </LinkContainer>
                    )}
                    {isSuccess && <ToastMessage bg="info" title="Thêm sản phẩm vào giỏ hàng" body={`${product.name} đã có trong giỏ hàng của bạn`} />}
                </Col>
            </Row>
            <div className="my-4">
                <h2>Sản Phẩm Tương Tự</h2>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate" />
                </div>
            </div>

            
        </Container>
    );
}

export default ProductPage;