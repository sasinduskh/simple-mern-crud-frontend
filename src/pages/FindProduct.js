import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Products from '../components/Products'
import { BACKEND_IP } from '../Config'

export default function FindProduct() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState();

    const fetchProducts = async () => {
        const res = await fetch(`${BACKEND_IP}/api/product`, {
            method: 'GET'
        })

        const json = await res.json();

        if (!res.ok) {
            setError(json.error);
            return
        }

        setProducts(json.data);
    }


    // Get Product By Search
    const searchHandler = async () => {
        if (searchInput.length >= 3) {
            const res = await fetch(`${BACKEND_IP}/api/product/search/?name=${searchInput}`, {
                method: 'GET',

            });


            const json = await res.json();

            if (!res.ok) {
                setError(json.error);
            }

            setProducts(json.data);
        } else {
            fetchProducts();
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div>
            <NavBar active={2} />

            <Container className='mt-4'>
                <center>
                    <h3>Products</h3>
                </center>

                <Container>
                    <Row>
                        <Col>
                            <input onChange={(e) => {
                                setSearchInput(e.target.value);
                                searchHandler();
                            }} className='form-control' placeholder='Search Product By Product Name...' />

                        </Col>
                        <Col xs='3'>
                            <Button onClick={() => navigate('/add-product')}>
                                Add New Product
                            </Button>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    {products.length == 0 && (
                        <center className='mt-4'>
                            <h4>
                                No Product Please <Link to='/add-product'>Add</Link> a new product
                            </h4>
                        </center>
                    )}
                    {products?.map((product) => (
                        <Products {...product} />
                    ))}
                </Container>
            </Container>
        </div>
    )
}
