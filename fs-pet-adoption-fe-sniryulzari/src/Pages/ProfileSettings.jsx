import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";

const ProfileSettings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/users/userInfo`, {
        withCredentials: true,
      });
      if (res.data._id) {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setPhoneNumber(res.data.phoneNumber);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setBio(res.data.bio);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
    try {
        const res = await axios.put(
            `http://localhost:8080/users/userInfo`,
            { firstName, lastName, phoneNumber, email, password, bio},
            {
              withCredentials: true,
            }
          );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-settings-container">
      <h1 className="display-5 ">Profile Settings</h1>
      <form>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            type="text"
            value={firstName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            type="text"
            value={lastName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            onChange={(e) => setPhoneNumber(e.target.value)}
            name="phoneNumber"
            type="text"
            value={phoneNumber}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            // value={password}
          />
        </Form.Group>

        <Form.Label>Bio</Form.Label>
        <FloatingLabel controlId="floatingTextarea" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </FloatingLabel>

        <div className="signup-form-buttons">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
