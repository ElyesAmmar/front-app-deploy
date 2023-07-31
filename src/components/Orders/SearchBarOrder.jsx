import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch,useSelector } from 'react-redux';
import { FindOrdersByMonth } from '../../JS/actions/order';
import SummaryExports from './SummaryExports'



function OrdersBar() {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.userReducer.user)
 
const handleSelectChange = (e) => {
setSelectedValue(Number(e.target.value));
};

const Find = ()=>{
  dispatch(FindOrdersByMonth(user.UserID,selectedValue))
}

  
  return (
    <div>
    <div className='searchbar'>
      <div style={{paddingTop:'7px',paddingLeft:'7px'}}>
      <Button variant="secondary">Print Invoices</Button>
      </div>
      <div style={{display:'flex', height:'40px', marginTop:'8px'}}>
      <Form.Group className="mb-3">
        <Form.Select value={selectedValue.Month} onChange={handleSelectChange}>
          <option>Months</option>
          <option value='1'>January</option>
          <option value='2'>February</option>
          <option value='3'>March</option>
          <option value='4'>April</option>
          <option value='5'>May</option>
          <option value='6'>June</option>
          <option value='7'>July</option>
          <option value='8'>August</option>
          <option value='9'>September</option>
          <option value='10'>October</option>
          <option value='11'>November</option>
          <option value='12'>December</option>
        </Form.Select>
      </Form.Group>
      <Button variant="outline-success" onClick={Find} >Apply</Button>
     <SummaryExports />
      </div>
      <div style={{display:'flex',height:'45px',paddingTop:'7px',paddingRight:'7px'}}>
      <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            
            />
      <Button variant="outline-success" >Search</Button>
      </div>
    </div>
    </div>
  );
}

export default OrdersBar;