import React from 'react'
import { Container } from 'react-bootstrap'
import NavBar from '../components/NavBar'

export default function Home() {
    return (
        <div>
            <NavBar active={0} />

            <Container style={{
                marginTop: 45
            }}>
                <h1>
                    Hello there this is sample mern CRUD system 🍕🍔
                </h1>
                <p>
                    My Name is Sasindu Kavinda Herath
                    <br />
                    and i'm Javascript developer
                    <br />
                    <a target='_blank' href='https://github.com/sasinduskh'>My Github Profile</a>
                    <br />
                    Getstart <a href='/add-product'> Add a Product</a>
                </p>
                <p>
                    <h3>Using Technologies</h3>
                    <h5>Backend - Node.js | Express.js</h5>
                    <h5>Frontend - React.js</h5>
                    <h5>File Upload - AWS S3 Bucket</h5>
                </p>
            </Container>
        </div>
    )
}
