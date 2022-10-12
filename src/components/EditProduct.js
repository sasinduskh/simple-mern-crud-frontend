import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BACKEND_IP } from '../Config';
import { Alert } from 'react-bootstrap';

export default function EditProduct(props) {

    const [productDetails, setProductDetails] = useState({
        productDescription: props.productDescription,
        productName: props.productName
    });



    const inputHandler = (e) => {
        setProductDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const submitHandler = async () => {

        setIsLoading(true);

        setError(null);
        setMessage(null);

        const res = await fetch(`${BACKEND_IP}/api/product/edit/${props._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productDetails)
        });

        setIsLoading(false);

        const json = await res.json();

        if (!res.ok) {
            alert(json.error);
            return
        }

        setMessage('Product Edit Success..!');



    }


    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Products</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input name='productName' onChange={inputHandler} value={productDetails.productName} className='form-control' />
                <br />
                <input name='productDescription' onChange={inputHandler} value={productDetails.productDescription} className='form-control' />

                {(error || message) && (
                    <Alert variant={error ? 'danger' : 'success'} className='mt-4'>
                        <Alert.Heading>
                            {error && error}
                            {message && message}
                        </Alert.Heading>
                    </Alert>
                )}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button onClick={submitHandler} variant="primary" >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
