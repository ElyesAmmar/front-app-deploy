import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ContactUs() {
  return (
    <div style={{height:"500px", width:"600px", margin:"100px auto 100px"}}>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
   <Button variant="success">Send</Button>
    </div>
    
  );
}

export default ContactUs;