import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import SearchPetCard from "../components/Search-PetCard";
import { useNavigate } from "react-router-dom";

const MyPets = () => {
  const [mySavedPetId, setmySavedPetId] = useState([]);
  const [mySavedPetInfo, setmySavedPetInfo] = useState([]);

  const [myAdoptedPetId, setmyAdoptedPetId] = useState([]);
  const [myAdoptedPetInfo, setMyAdoptedPetInfo] = useState([]);

  const [myFosteredPetId, setmyFosteredPetId] = useState([]);
  const [myFosteredPetInfo, setMyFosteredPetInfo] = useState([]);

  const [togglePets, setTogglePets] = useState(true); 

  const navigate = useNavigate();

  const getMyPetsId = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/users/mypets`, {
        withCredentials: true,
      });
      // console.log("my pets result:", res.data)
      setmySavedPetId(res.data[0].savedPet);
      setmyAdoptedPetId(res.data[0].adoptPet);
      setmyFosteredPetId(res.data[0].fosterPet);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyPetsId();
  }, []);

  const getMySavedPetsInfo = async () => {
    // console.log("mySavedPetId:", mySavedPetId);
    try {
      for (let key of mySavedPetId) {
        // console.log("key:", key);
        const res = await axios.get(
          `http://localhost:8080/pets/mySavedPets/${key}`,
          {
            withCredentials: true,
          }
        );
        // console.log("saved pets result:",res.data.);
        if (res.data._id) {
          setmySavedPetInfo((prev) => [...prev, res.data]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMySavedPetsInfo();
  }, [mySavedPetId]);

  const getMyAdoptedPetsInfo = async () => {
    // console.log("myAdoptedPetId:", myAdoptedPetId);
    try {
      for (let key of myAdoptedPetId) {
        // console.log("key:", key);
        const res = await axios.get(
          `http://localhost:8080/pets/myAdoptedPets/${key}`,
          {
            withCredentials: true,
          }
        );
        // console.log("adopted pets result:",res.data);
        if (res.data._id) {
          setMyAdoptedPetInfo((prev) => [...prev, res.data]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyAdoptedPetsInfo();
  }, [myAdoptedPetId]);

  const getMyFosteredPetsInfo = async () => {
    // console.log("myFosteredPetId:", myFosteredPetId);
    try {
      for (let key of myFosteredPetId) {
        // console.log("key:", key);
        const res = await axios.get(
          `http://localhost:8080/pets/myFosteredPets/${key}`,
          {
            withCredentials: true,
          }
        );
        // console.log("fostered pets result:",res.data);
        if (res.data._id) {
          setMyFosteredPetInfo((prev) => [...prev, res.data]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyFosteredPetsInfo();
  }, [myFosteredPetId]);


  return (
    <div className="my-pets-container">
      <h1 className="display-4 my-3">My Pets Page</h1>
      {togglePets ? (
        <button
          className="pet-card-button"
          onClick={(e) => {
            setTogglePets(false);
          }}
        >
          My Saved Pets
        </button>
      ) : (
        <button
          className="pet-card-button"
          onClick={(e) => {
            setTogglePets(true);
          }}
        >
          My Owen Pets
        </button>
      )}

      {!togglePets && (
        <div>
          <h2 className="display-5 mx-4">My Saved Pets</h2>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4 mx-1 my-1">
            {mySavedPetInfo.map((pet) => (
              <Col key={pet._id} onClick={() => navigate(`/petcard?petId=${pet._id}`)} className="my-pets">
                <SearchPetCard {...pet} />
              </Col>
            ))}
          </Row>
        </div>
      )}

      {togglePets && (myAdoptedPetInfo.length || myFosteredPetInfo.length) 
      ? (
        <div>
          <h2 className="display-5 mx-4">My Owen Pets</h2>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4 mx-1 my-1">
            {myAdoptedPetInfo.map((pet) => (
              <Col key={pet._id} onClick={() => navigate(`/petcard?petId=${pet._id}`)} className="my-pets">
                <SearchPetCard {...pet} />
              </Col>
            ))}
            {myFosteredPetInfo.map((pet) => (
              <Col key={pet._id} onClick={() => navigate(`/petcard?petId=${pet._id}`)} className="my-pets">
                <SearchPetCard {...pet} />
              </Col>
            ))}
          </Row>
        </div>) 
        : togglePets && !(myAdoptedPetInfo.length || myFosteredPetInfo.length) ? (
        <h3 className="display-5">You currently do not own or foster any pets.</h3>) 
        : null
      }
    </div>
  );
};

export default MyPets;
