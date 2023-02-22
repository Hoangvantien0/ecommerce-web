import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./layoutcss/NewProduct.css";

function NewProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();
// chức năng thêm ảnh
    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }
// thêm các trường
    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("bạn phải thêm tất cả các danh mục");
        }
        createProduct({ name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }
    // function kết nỗi cloudinary up ảnh 
    function showWidget() { 
        const widget = window.cloudinary.createUploadWidget(
            {
                //dxd9gomf2
                //aoqsofdf
                cloudName: "dxd9gomf2",
                uploadPreset: "aoqsofdf",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

return (
    <div className="new-product-top" style={{backgroundColor: 'white', height: '100vh'}}>
    <Container  >
        <Row >     
            <Col >
                <Form  className="new-product-container "  onSubmit={handleSubmit}  >
                    <h1 className="mt-4">Thêm Sản Phẩm</h1>
                    {isSuccess && <Alert variant="success">Thêm sản phẩm thành công</Alert>}
                    {isError && <Alert variant="danger">{error.data}</Alert>}

                    <div className="container">

                        <div className="row">
                            {/*  */}
                            <div className="col form_product">
                                <Form.Group className="mb-3  " >
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập tên sản phẩm" value={name} required onChange={(e) => setName(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Giá sản phẩm</Form.Label>
                                    <Form.Control type="bigint" placeholder="Nhập giá" value={price} required onChange={(e) => setPrice(e.target.value)} />
                                </Form.Group>
                        
                                <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                                    <Form.Label>Loại</Form.Label>
                                    <Form.Select>
                                    <option disabled selected>
                                        -- Loại Sản Phẩm --
                                    </option>               
                                    <option value="áo">Áo</option>
                                    <option value="quần">Quần</option>
                                    <option value="giày">Giày</option>
                                    </Form.Select>

                                </Form.Group>
                            {/*  */}
                                <Form.Group className="mb-3">
                                <Button type="button" onClick={showWidget}>
                                Thêm ảnh
                                </Button>
                                {/* load image */}
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>
                        
                        </div>
                        {/*  */}
                        <div className="col">

                        <Form.Group className="mb-3 ">

                            <Form.Label>Mô Tả Sản Phẩm</Form.Label>
                                <Form.Control as="textarea" placeholder="Mô Tả Về Sản Phẩm" style={{ height: "210px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess}>Tạo sản phẩm</Button>
                        </Form.Group>
                        </div>
                        {/*  */}

                        </div>
                            
                    </div>
                </Form>    
             </Col>                
        </Row>
    </Container>
    </div>
        
    );
}

export default NewProduct;