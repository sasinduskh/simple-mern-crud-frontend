import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { BACKEND_IP } from '../Config'
import EditProduct from './EditProduct';

export default function Products({ productName, _id, productDescription, imageUrl }) {

    const [ShowEditModal, setShowEditModal] = useState(false);


    const navigate = useNavigate();
    // Delete Handler
    const deleteHandler = async () => {
        if (window.confirm('Are you sure you want to Delete product database?')) {
            const res = await fetch(`${BACKEND_IP}/api/product/delete/${_id}`,{
                method: 'POST'
            })

            const json = await res.json();

            if(!res.ok){
                alert(json.error);
                return
            }

            navigate(0)
        }else{
            
        }
    }


    return (

        <Card className='mt-4'>
            <Card.Body>
                <Row>
                    <Col>
                        <img src={imageUrl} width={250}/>
                    </Col>
                    <Col>
                        {productName}
                        <p>
                            {productDescription}
                        </p>
                    </Col>
                    <Col>
                        <Button variant='primary' onClick={()=>setShowEditModal(true)}>Edit</Button>
                        <Button className='ms-4' variant='danger' onClick={deleteHandler}>Delete</Button>
                    </Col>
                </Row>
            </Card.Body>

            <EditProduct _id={_id} productName={productName} productDescription={productDescription} show={ShowEditModal} onHide={()=>setShowEditModal(false)} />
        </Card>

    )
}
