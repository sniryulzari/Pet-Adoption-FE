import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Col, Row } from "react-bootstrap";
import { PetContext } from "../Context/Context-Pets";
import { toast } from 'react-toastify';

export default function AdminEditPet() {
  const { petId } = useContext(PetContext);
  const [newPetInfo, setNewPetInfo] = useState({
    type: "",
    breed: "",
    name: "",
    adoptionStatus: "",
    height: "",
    weight: "",
    color: "",
    bio: "",
    hypoallergenic: "",
    dietaryRestrictions: "",
  });
  const [petImage, setPetImage] = useState();
  const navigate = useNavigate();

  const getPetInfo = async (petId) => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/${petId}`, {
        withCredentials: true,
      });
      setNewPetInfo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPetInfo(petId);
  }, []);

  const handlePetInfo = (e) => {
    setNewPetInfo({ ...newPetInfo, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPetImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      for (let key in newPetInfo) {
        formData.append(key, newPetInfo[key]);
      }
      formData.append("petImage", petImage);

      for (let value of formData.values()) {
        console.log(value);
      }
      const res = await axios.put(
        `http://localhost:8080/admin/editpet`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        toast.success('Pet Info updated Successfully  !', {
          position: toast.POSITION.TOP_RIGHT
      });
        navigate("/admin-Dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-add-pet-container">
      <div className="admin-add-pet-header">
        <h1 className="display-3">Edit Pet</h1>
        <img
          className="pet-img"
          src={newPetInfo.imageUrl}
          height="200em"
          width="200em"
        />
      </div>
      <Form className="admin-add-pet-form">
        <Row className="mb-3">
          <Form.Group
            as={Col}
            className="mb-3"
            controlId="formBasicAdoptionStatus"
          >
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              onChange={handlePetInfo}
              value={newPetInfo.type}
            >
              <option>Select Type of Pet</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Horse">Horse</option>
              <option value="Dolphin">Dolphin</option>
              <option value="Tiger">Tiger</option>
            </Form.Select>
          </Form.Group>

          <Form.Group
            as={Col}
            className="mb-3"
            controlId="formBasicBreedOfAnimal"
          >
            <Form.Label>Breed of Animal</Form.Label>
            <Form.Control
              name="breed"
              onChange={handlePetInfo}
              type="text"
              placeholder="Breed of Pet"
              value={newPetInfo.breed}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formBasicname">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              onChange={handlePetInfo}
              type="text"
              placeholder="Name"
              value={newPetInfo.name}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            className="mb-3"
            controlId="formBasicAdoptionStatus"
          >
            <Form.Label>Adoption Status</Form.Label>
            <Form.Select
              name="adoptionStatus"
              onChange={handlePetInfo}
              value={newPetInfo.adoptionStatus}
            >
              <option>Select Adoption Status</option>
              <option value="Adopted">Adopted</option>
              <option value="Fostered">Fostered</option>
              <option value="Available">Available</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formBasicHeight">
            <Form.Label>Height (cm)</Form.Label>
            <Form.Control
              name="height"
              onChange={handlePetInfo}
              type="number"
              placeholder="Enter Height"
              value={newPetInfo.height}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formBasicWeight">
            <Form.Label>Weight (kg)</Form.Label>
            <Form.Control
              name="weight"
              onChange={handlePetInfo}
              type="number"
              placeholder="Enter Weight"
              value={newPetInfo.weight}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group
            as={Col}
            className="mb-3"
            controlId="formBasicAdoptionStatus"
          >
            <Form.Label>Color</Form.Label>
            <Form.Select
              name="color"
              onChange={handlePetInfo}
              value={newPetInfo.color}
            >
              <option>Select Pet Color</option>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Brown">Brown</option>
              <option value="Grey">Grey</option>
              <option value="Orange">Orange</option>
              <option value="Golden">Golden</option>
              <option value="MixColors">Mix Colors</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="formBasicBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              name="bio"
              onChange={handlePetInfo}
              as="textarea"
              rows={3}
              type="text"
              placeholder="Bio"
              value={newPetInfo.bio}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group
            as={Col}
            className="mb-3"
            controlId="formBasicAdoptionStatus"
          >
            <Form.Label>Hypoallergenic</Form.Label>
            <Form.Select
              name="hypoallergenic"
              onChange={handlePetInfo}
              type="boolean"
              placeholder="Hypoallergenic"
              value={newPetInfo.hypoallergenic}
            >
              <option>Hypoallergenic?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group
            as={Col}
            className="mb-3"
            controlId="formBasicDietaryRestrictions"
          >
            <Form.Label>Dietary Restrictions</Form.Label>
            <Form.Control
              name="dietaryRestrictions"
              onChange={handlePetInfo}
              type="text"
              placeholder="Dietary Restrictions"
              value={newPetInfo.dietaryRestrictions}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formImageFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImage}
            />
          </Form.Group>
        </Row>
        <div className="add-pet-buttons-container">
          <button
            className="add-pet-buttons"
            type="submit"
            onClick={handleSubmit}
          >
            Edit Pet
          </button>
          <button
            className="add-pet-buttons"
            type="submit"
            onClick={() => navigate("/admin-Dashboard")}
          >
            Dashboard
          </button>
        </div>
      </Form>
    </div>
  );
}
