import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AddModal from './AddProduct';
import {useDispatch, useSelector} from 'react-redux'
import { FilterByCategorie, searchP } from '../../JS/actions/products';

function SearchProducts() {
  const [selectedValue, setSelectedValue] = useState('');
  const user = useSelector((state)=> state.userReducer.user)
  const dispatch = useDispatch()
  const handleChange= (e)=>{  
       dispatch(searchP(e.target.value))
  }
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const Filter = ()=>{
    dispatch(FilterByCategorie(selectedValue))
  }

  return (
    <div>
    <div className='searchbar'>
      <div style={{paddingTop:'7px',paddingLeft:'7px'}}>
      <AddModal />
      </div>
      <div style={{display:'flex', height:'40px', marginTop:'8px'}}>
      <Form.Group className="mb-3">
        <Form.Select value={selectedValue} onChange={handleSelectChange}>
          <option>Products Category</option>
          <option value='Memoire'>Memoire</option>
          <option value='Carte Graphique'>Carte Graphique</option>
          <option value='Processeur'>Processeur</option>
          <option value='Carte Mère'>Carte Mère</option>
        </Form.Select>
      </Form.Group>
      <Button variant="outline-success" onClick={Filter} >Filter</Button>
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

export default SearchProducts;