import React from 'react'
import { Container, Navbar, Nav, Badge } from 'react-bootstrap';
import { IoMdCart } from "react-icons/io";
// import { IoMdHeart } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {

  const count = useSelector((state)=>state.cart.value)

  return (
    <>
      <Navbar bg="dark" expand="lg" className='shadow' fixed='top'>
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{backgroundColor:'white'}}/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{height:'100%', alignItems:'center'}}>
              <Link>Home</Link>
              <Link to='/'>Shop</Link>
              <Link>Features</Link>
              <Link>Blog</Link>
              <Link>FAQ</Link>
              <Link>Contact</Link>
            </Nav>
            {/* <div style={{marginRight:15, position:'relative'}}>
              <IoMdHeart style={{color:'white', fontSize:22}} /><Badge style={{position:'absolute', marginRight:10, backgroundColor:'darkgreen'}}>{count}</Badge>
            </div> */}
            <div style={{marginRight:25, position:'relative'}}>
              <Link to='/cart'><IoMdCart style={{color:'white', fontSize:26}} /><Badge style={{position:'absolute', marginRight:10, backgroundColor:'darkgreen'}}>{count}</Badge></Link>    
            </div>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header