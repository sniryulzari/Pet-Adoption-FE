import React from "react";
import { useContext } from "react";
import { PetContext } from "../Context/Context-Pets";
import { Row, Col } from "react-bootstrap";
import SearchPetCard from "./Search-PetCard";

function SearchPetsCardList() {
  const { petSearchRes } = useContext(PetContext);


  return (
    <div>
      <Row xs={1} md={2} lg={3} xl={4} className="search-pet-results g-4">
        {petSearchRes.map((pet) => (
          <Col key={pet._id} >
            <SearchPetCard
              id={pet._id}
              type={pet.type}
              breed={pet.breed}
              name={pet.name}
              adoptionStatus={pet.adoptionStatus}
              height={pet.height}
              weight={pet.weight}
              color={pet.color}
              bio={pet.bio}
              hypoallergenic={pet.hypoallergenic}
              dietaryRestrictions={pet.dietaryRestrictions}
              imageUrl={pet.imageUrl}
            />
          </Col>
        ))}
      </Row>
      </div>
  );
}

export default SearchPetsCardList;
