import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchPetCard(props) {
  const {
    id,
    type,
    breed,
    name,
    adoptionStatus,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    imageUrl,
  } = props;
  const navigate = useNavigate();

  return (
    <div
      className="pets-search-results mx-1 my-1 ">
      <Card border={adoptionStatus == "Available" && "primary"}>
        <Card.Img
          variant="top"
          src={imageUrl}
          height="300em"
          width="300em"
          object-fit="contain"
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Breed: {breed}</Card.Text>
          <Card.Text style={adoptionStatus === "Available" ? {color:"#22CC14"} : {color: "#EF233C"}}>
            {adoptionStatus}
          </Card.Text>
        </Card.Body>
        <Button onClick={() => navigate(`/petcard?petId=${id}`)}>See more</Button>
      </Card>
    </div>
  );
}

export default SearchPetCard;
