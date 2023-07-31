import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom'
import { userLogout } from '../JS/actions/user';


function Bar() {

  const navigate = useNavigate();
  const user = useSelector((state)=> state.userReducer.user)
  const isAuth = useSelector((state)=> state.userReducer.isAuth)
  const dispatch = useDispatch()

  const handleLogout =()=>{
    dispatch(userLogout());
    
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{position:"fixed",top:"0",width:"100%"}}>
      <Container>
       {isAuth && <Navbar.Brand >{user.FirstName} {user.LastName}</Navbar.Brand> } 
       {!isAuth && <Navbar.Brand >My Project Name</Navbar.Brand> } 
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
        {!isAuth && <Nav.Link href="#features"><Link to="/" style={{ textDecoration: "none" }} > Home </Link> </Nav.Link> }  
          {isAuth && <div style={{width:'200px', display:'flex', justifyContent:'space-around'}}>
            <Link style={{ textDecoration: "none" }} onClick={handleLogout}> Log Out </Link>
            <Link to="/dashboard" style={{ textDecoration: "none" }} onClick={()=>{navigate('products')}} > Dashboard </Link>
            
          </div>
          
          }
          
          
          </Nav>
          <Nav>
          <Nav.Link href="#deets">  <Link to="/contact" style={{ textDecoration: "none" }} > Contact </Link></Nav.Link>
          <Nav.Link href="">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
    
  );
}

export default Bar;