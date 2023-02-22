import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import "./layoutcss/Login.css";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isError, isLoading, error }] = useLoginMutation();
    function handleLogin(e) {
        e.preventDefault();
        login({ email, password });
    }
return (
    <Container >
        <Row> 

            <Col md={15} className="login__form--container">     
                <Form style={{ width: "100%" }} onSubmit={handleLogin}>
                    <label className="text-form form-control ">Đăng nhập tài khoản</label>
                        {isError && <Alert variant="danger">{error.data}</Alert>}  
                        {/* ảnh */}
                        <div class="container py-5 h-100">
                            <div class="row d-flex align-items-center justify-content-center h-100">
                            <div class="col-md-8 col-lg-7 col-xl-6">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                class="img-fluid" alt="Phone image"/>
                            </div>
                            {/*  */}

                            <div class=" col-md-7 col-lg- col-xl-5 offset-xl-1"> 
                            <Form className="login__form">
                       <Form.Group >
                            <Form.Label >Tên Email</Form.Label>
                            <Form.Control  type="email" placeholder="Nhập email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mt-4" >
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        </Form> 
                        <Form.Group>
                            <Button type="submit" disabled={isLoading}>Đăng nhập</Button>
                        </Form.Group>
                        
                        <p className=" text-center pt-4 ">
                            Bạn chưa có tài khoản? 
                            <Link to="/signup" className="link--to">Tạo tài khoản</Link>{" "}
                        </p>
                        </div>
                            </div>
                            </div>
                               
                   </Form>
                </Col> 
             </Row>
         </Container>
    );
}

export default Login;