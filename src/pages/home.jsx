import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserRegiser from "../components/formUser";
import { useDispatch, useSelector } from "react-redux";
import {userLogin} from '../JS/actions/user';
import { Navigate } from "react-router-dom";


function Home() {
  const isAuth = useSelector((state)=> state.userReducer.isAuth)
  const dispatch = useDispatch();
  const [user, setUser] = useState({Email:"", Password:""});
  

  const handleLogin = (e)=>{
    e.preventDefault()
    dispatch(userLogin(user));
    setUser({Email:"", Password:""})
    
  }
  return (
    <div  className="home" >
      <div className="logform">
      <Form >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  value={user.Email} onChange={(e)=> setUser({...user, Email: e.target.value})} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={user.Password} placeholder="Password" onChange={(e)=> setUser({...user, Password: e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <div style={{width:'250px', display:'flex', justifyContent:'space-between'}}>    
      <Button style={{width:'100px'}} variant="primary" type="submit" onClick={handleLogin}>
        Log In
      </Button>
      <UserRegiser />
     
      </div>
     
    </Form>
    </div>
    {isAuth && <Navigate to='/dashboard' />}
    </div>
  );
}

export default Home;
