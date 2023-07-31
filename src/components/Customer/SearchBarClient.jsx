import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AddClient from './Addclient';
import { useDispatch } from 'react-redux';
import { searchClient } from '../../JS/actions/clients';




function ClientsBar() {
 
  const dispatch = useDispatch()

  const handleChange=(e)=>{
    dispatch(searchClient(e.target.value))
    
  }

  return (
    <div>
    <div className='searchbar'>
      <div style={{paddingTop:'7px',paddingLeft:'7px'}}>
        <AddClient />
      </div>
      <div style={{display:'flex',height:'45px',paddingTop:'7px',paddingRight:'7px'}}>
      <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
      <Button variant="outline-success" >Search</Button>
      </div>
    </div>
    </div>
  );
}

export default ClientsBar;