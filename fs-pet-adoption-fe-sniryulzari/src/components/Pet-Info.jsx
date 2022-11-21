import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UsersContext } from "../Context/Context-Users";

function PetCard() {
  const [pet, setPet] = useState();
  const { isLogin } = useContext(UsersContext);
  const [savePet, setSavePet] = useState(false);
  const [adoptPet, setAdoptPet] = useState(false);
  const [fosterPet, setFosterPet] = useState(false);

  const getPetId = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("petId");
    return id;
  };

  const fetchPet = async (petId) => {
    try {
      const res = await axios.get(`http://localhost:8080/pets/${petId}`, {
        withCredentials: true,
      });
      setPet(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const id = getPetId();
    fetchPet(id);
  }, []);

  const getUserInfo = async () => {
    try {
      const petId = getPetId();
      const res = await axios.get(`http://localhost:8080/users/userInfo`, {
        withCredentials: true,
      });
      // return res.data;
      const savedPet = res.data.savedPet;
      const adoptPet = res.data.adoptPet;
      const fosterPet = res.data.fosterPet;

      setSavePet(false);
      for (let i = 0; i <= savedPet.length; i++) {
        if (savedPet[i] === petId) {
          setSavePet(true);
          return;
        }
      }

      setAdoptPet(false);
      for (let i = 0; i <= adoptPet.length; i++) {
        if (adoptPet[i] === petId) {
          setAdoptPet(true);
          return;
        }
      }

      setFosterPet(false);
      for (let i = 0; i <= fosterPet.length; i++) {
        if (fosterPet[i] === petId) {
          setFosterPet(true);
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  });

  const handleSavePet = async () => {
    const petId = getPetId();
    try {
      const res = await axios.put(
        `http://localhost:8080/users/${petId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.ok) {
        setSavePet(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnSavedPet = async () => {
    try {
      const petId = getPetId();
      const res = await axios.delete(`http://localhost:8080/users/${petId}`, {
        withCredentials: true,
      });
      if (res.data.ok) {
        setSavePet(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdopt = async () => {
    try {
      const petId = getPetId();
      const res = await axios.put(
        `http://localhost:8080/users/adopt/${petId}`,
        {},
        {
          withCredentials: true,
        }
      );
      const userId = res.data;
      if (userId) {
        try {
          const res = await axios.put(
            `http://localhost:8080/pets/adopt`,
            { userId, petId },
            {
              withCredentials: true,
            }
          );
          setAdoptPet(true);
          setFosterPet(false);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFoster = async () => {
    try {
      const petId = getPetId();
      const res = await axios.put(
        `http://localhost:8080/users/foster/${petId}`,
        {},
        {
          withCredentials: true,
        }
      );
      const userId = res.data;
      if (userId) {
        try {
          const res = await axios.put(
            `http://localhost:8080/pets/foster`,
            { userId, petId },
            {
              withCredentials: true,
            }
          );
          setFosterPet(true);
          setAdoptPet(false);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReturn = async () => {
    try {
      const petId = getPetId();
      const res = await axios.delete(
        `http://localhost:8080/users/returnPet/${petId}`,
        {
          withCredentials: true,
        }
      );
      const userId = res.data;
      if (userId) {
        try {
          const res = await axios.put(
            `http://localhost:8080/pets/returnPet`,
            { userId, petId },
            {
              withCredentials: true,
            }
          );
          if (res.data) {
            setFosterPet(false);
            setAdoptPet(false);
            setSavePet(false);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="pet-card-container">
      {pet ? (
        <div className="pet-card">
          <div className="card-header">
            <img
              src={pet.imageUrl}
              height="300em"
              width="500em"
              alt="Pet Image"
            ></img>

            <h1>{pet.name}</h1>
          </div>
          <div className="pet-card-info">
            <p className="pet-info">
              This {pet.type} is of the breed {pet.breed}.
            </p>
            <p className="pet-info">
              {pet.name} is {pet.height} cm tall and weight {pet.weight} kg.
            </p>
            <p className="pet-info">color: {pet.color}</p>
            <p className="pet-info">Adoption Status: {pet.adoptionStatus}</p>
            <p className="pet-info">Hypoallergenic: {pet.hypoallergenic}</p>
            <p className="pet-info">
              Dietary Restrictions: {pet.dietaryRestrictions}
            </p>
            <p className="pet-info">Bio: {pet.bio}</p>
          </div>
          {isLogin ? (
            <div className="pet-card-button-container">
              {fosterPet ? (
                <button className="pet-card-button" onClick={handleAdopt}>
                  Adopt
                </button>
              ) : null}

              {adoptPet || fosterPet ? (
                <button className="pet-card-button" onClick={handleReturn}>
                  Return Pet
                </button>
              ) : (
                <div>
                  <button className="pet-card-button" onClick={handleAdopt}>
                    Adopt
                  </button>
                  <button className="pet-card-button" onClick={handleFoster}>
                    Foster
                  </button>
                </div>
              )}

              {savePet && !(adoptPet || fosterPet) ? (
                <button className="pet-card-button" onClick={handleUnSavedPet}>
                  Unsave Pet
                </button>
              ) : null}

              {!savePet && !(adoptPet || fosterPet) ? (
                <button className="pet-card-button" onClick={handleSavePet}>
                  Save Pet
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default PetCard;
