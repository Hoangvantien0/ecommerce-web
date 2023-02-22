import axios from '../axios'
import React, { useEffect,useState }  from "react";
import {Link} from 'react-router-dom'
import {Col, Navbar, Row} from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import categories from "../categories";
import './layoutcss/Home.css'
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";
import Footer from './Footer';


function Home(){
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 8);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);

    

    return (
        <div  > 
       
        <img src="https://lambanner.com/wp-content/uploads/2017/07/thoi-trang-nu.jpg"
         width="1300" height="500" className="home-banner" />
            <div className="featured-products-container container mt-4">
                <h2>SẢN PHẨM MỚI NHẤT</h2>
                {/* new products*/}
                    <div className="d-flex justify-content-center flex-wrap">
                    
                        {lastProducts.map((product) => (
                            <ProductPreview {...product} />
                            
                        ))}
                    </div>
                <div>
                    <Link to="/category/all" style={{ textAlign: "right",display:"block",textDecoration: "none" }}>
                    Xem thêm {">>"}
                    </Link>
                </div>
            </div>

            {/* sale banner */}
            <div className="sale__banner--container mt4">
                
            </div>
            <div className="recent-products-container container mt-4">
                <h2>lOẠI SẢN PHẨM</h2>
                <Row>
                {categories.map((category) => (
                        <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                                 url(${category.img})`, gap: "15px" }} className="category-tile">{category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
            {/* <Footer /> */}
        </div>
            
    )
 }
export default Home