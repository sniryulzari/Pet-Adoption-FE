import React, { useState, useEffect, useContext } from "react";
import { UsersContext } from "../Context/Context-Users";
import SearchPetCard from "../components/Search-PetCard";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



function AdminUserPets() {
  const [userAdoptedPetInfo, setUserAdoptedPetInfo] = useState([]);
  const [userFosteredPetInfo, setUserFosteredPetInfo] = useState([]);

  const { userPets } = useContext(UsersContext);
  const navigate = useNavigate();

  const adoptedPets = userPets.adoptPet;
  const fosteredPets = userPets.fosterPet;

  const getUserAdoptedPetsInfo = async () => {

    try {
      for (let key of adoptedPets) {
        // console.log("key:", key);
        const res = await axios.get(
          `http://localhost:8080/pets/myAdoptedPets/${key}`,
          {
            withCredentials: true,
          }
        );
        if (res.data._id) {
            setUserAdoptedPetInfo((prev) => [...prev, res.data]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserAdoptedPetsInfo();
  }, []);

  const getUserFosteredPetsInfo = async () => {
    // console.log("myFosteredPetId:", myFosteredPetId);
    try {
      for (let key of fosteredPets) {
        // console.log("key:", key);
        const res = await axios.get(
          `http://localhost:8080/pets/myFosteredPets/${key}`,
          {
            withCredentials: true,
          }
        );
        // console.log("fostered pets result:",res.data);
        if (res.data._id) {
            setUserFosteredPetInfo((prev) => [...prev, res.data]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserFosteredPetsInfo();
  }, []);

  return (
    <div className="admin-user-pets-container">
      <h1 className="display-5 mx-4">
        Pets that {userPets.firstName} {userPets.lastName} owned
      </h1>
      <div>
        
          <Row xs={1} md={2} lg={3} xl={4} className="g-4 mx-1 my-1">
            {userAdoptedPetInfo.map((pet) => (
              <Col key={pet._id} onClick={() => navigate(`/petcard?petId=${pet._id}`)}>
                <SearchPetCard {...pet} />
              </Col>
            ))}
            {userFosteredPetInfo.map((pet) => (
              <Col key={pet._id} onClick={() => navigate(`/petcard?petId=${pet._id}`)}>
                <SearchPetCard {...pet} />
              </Col>
            ))}
          </Row>
        </div>
    </div>
  );
}

export default AdminUserPets;
