import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./layoutcss/Signup.css";
import { useSignupMutation } from "../services/appApi";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    function handleSignup(e) {
        e.preventDefault();
        signup({ name, email, password });
    }

    return (
        <Container>
            <Row>
                <Col  className="signup_form_container">
                    <Form onSubmit={handleSignup}>
                    <label className="text-form-signup form-control ">Tạo tài khoản mới</label>
                        {isError && <Alert variant="danger">{error.data}</Alert>}

                        {/* ảnh */}
                        <div class="container py-5 h-100">
                            <div class="row d-flex align-items-center justify-content-center h-100">
                            <div class="col-md-8 col-lg-7 col-xl-6">
                                <img  src="https://naidecor.vn/wp-content/uploads/2020/09/Chup-quan-ao-treo-tuong.jpg"
                                className="img-fluid"  alt="Phone image"/>
                            </div>
                            {/*  */}

                            <div class=" col-md-7 col-lg-5 col-xl-5 offset-xl-1"> 
                            <Form className="signup_form">
                        <Form.Group>
                            <Form.Label>Tên người dùng</Form.Label>
                            <Form.Control type="text" placeholder="Nhập họ tên" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Nhập Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Nhập mật khẩu" value={password} required onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        </Form>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading}>
                                Tạo tài khoản
                            </Button>
                        </Form.Group>


                        <p className="pt-3 text-center">
                            Bạn đã có tài khoản! <Link to="/login">Đăng nhập</Link>{" "}
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

export default Signup;