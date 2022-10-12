import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavDropdown } from 'react-bootstrap'
import './NavBar.css'



export default function NavBar({ active }) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            SAMPLE MERN STACK PROJECT
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className={active == 0 && 'active'}>Home</Nav.Link>
              <Nav.Link href="/find-product" className={active == 2 && 'active'}>Products</Nav.Link>

              <Nav.Link href="/add-product" className={active == 1 && 'active'}>Add Product</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  )
}

