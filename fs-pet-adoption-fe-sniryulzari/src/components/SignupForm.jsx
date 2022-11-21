import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from 'react-toastify';

function SignupForm(props) {
  const { handleClose, handleLoginShow } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        repassword: repassword,
      };
      const res = await axios.post(
        "http://localhost:8080/users/signup",
        newUser
      );
      if (res.data.email.length > 0) {
        handleClose();
        handleLoginShow();
        toast.success('Signup Success!', {
          position: toast.POSITION.TOP_RIGHT
      });
      }
    } catch (err) {
      console.log(err);
      toast.error('Error: ' + err.message, {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  };

  return (
    <div className="SignupForm">
      <form onSubmit={handleSubmit}>
        <h1 className="display-5 ">Signup</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              name="firstName"
              type="text"
              placeholder="First Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
            />
          </Form.Group>

          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Enter password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-Password</Form.Label>
          <Form.Control
            onChange={(e) => setRepassword(e.target.value)}
            name="repassword"
            type="password"
            placeholder="Re-Password"
          />
        </Form.Group>

        <div className="signup-modal-bottom">
          <div className="signup-buttons">
            <button className="signup-login-btn" type="submit">
              Submit
            </button>
            <button
              className="signup-login-btn"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
