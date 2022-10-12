import React, { useState } from 'react'
import { Container, Alert, Form, Button, Card } from 'react-bootstrap'
import NavBar from '../components/NavBar'
import { BACKEND_IP } from '../Config';
import axios from 'axios';

export default function AddProduct() {

    const [productDetails, setProductDetails] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [file, setFile] = useState();

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    const inputHandler = (e) => {
        setProductDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // Product Send to Backend
    const submitProduct = async () => {
        try {
            setError(null);

            if(!file){
                setError('Please Select Image..')
                return
            }

            if(!productDetails.productName || !productDetails.productDescription){
                setError('Please Enter All Field....');
                return
            }
            setIsLoading(true);

            const formData = new FormData();
            formData.append("file", file);
            formData.append('productName', productDetails.productName);
            formData.append('productDescription', productDetails.productDescription);

            await axios(`${BACKEND_IP}/api/product/new`,{
                method: 'POST',
                data: formData,
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                setIsLoading(false);
                setFile(null);
                setError(null);
                setMessage('Product Add Success...!')
            }).catch((e)=>console.log(e))

           

            
        } catch (err) {
            console.log(err);
        }
    }

    const submitHandler = () => {
        submitProduct();
    }

    return (
        <div>
            <NavBar active={1} />

            <Container className='add-product-container mt-4'>
                <h3>Add New product</h3>
                <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control onChange={inputHandler} name='productName' type="text" placeholder="Product Name" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control onChange={inputHandler} name='productDescription' type="text" placeholder="Description" />
                    </Form.Group>
                    <Form.Group>
                        <label>
                            Add Product Image
                        </label>
                        {file && (
                            <Card className='m-4'>
                                <Card.Body>
                                    {file && `Attach - ${file.name}`}
                                    <button onClick={()=>{
                                        setFile(null);
                                    }}>Clear</button>
                                </Card.Body>
                            </Card>
                        )}
                        <input name="file-input" onChange={fileSelected} type='file' className='form-control' />
                    </Form.Group>
                    {(error || message) && (
                        <Alert variant={error ? 'danger' : 'success'} className='mt-4'>
                            <Alert.Heading>
                                {error && error}
                                {message && message}
                            </Alert.Heading>
                        </Alert>
                    )}
                    <Button disabled={isLoading ? true : false} onClick={submitHandler} className='mt-4' variant="primary" type="submit">
                        {isLoading ? 'Please Wait....' : 'Submit'}
                    </Button>
                </div>
            </Container>
        </div>
    )
}
