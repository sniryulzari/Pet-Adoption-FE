import React, { useContext } from "react";
import { PetContext } from "../Context/Context-Pets";
import { Table } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PetsList = () => {
  const { pets, setPetId } = useContext(PetContext);
  const navigate = useNavigate();

  const handleEdit = (petId) => {
    setPetId(petId);
    navigate("/admin-EditPet");
  };

  const handleDelete = async (petId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/admin/${petId}`, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pets-list">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="fs-5 text-center">Number</th>
            <th className="fs-5 text-center">Type</th>
            <th className="fs-5 text-center">Breed</th>
            <th className="fs-5 text-center">Name</th>
            <th className="fs-5 text-center">AdoptionStatus</th>
            <th className="fs-5 text-center">Color</th>
            <th className="fs-5 text-center">Hypoallergenic</th>
            <th className="fs-5 text-center">DietaryRestrictions</th>
            <th className="fs-5 text-center">Edit</th>
            <th className="fs-5 text-center">Delete</th>
          </tr>
        </thead>

        <tbody>
          {pets.map((pet, index) => (
            <tr key={pet._id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{pet.type}</td>
              <td className="text-center">{pet.breed}</td>
              <td className="text-center">{pet.name}</td>
              <td className="text-center">{pet.adoptionStatus}</td>
              <td className="text-center">{pet.color}</td>
              <td className="text-center">{pet.hypoallergenic}</td>
              <td className="text-center">{pet.dietaryRestrictions}</td>
              <td className="text-center">
                <GrEdit
                  className="edit-icon"
                  size="1.1em"
                  name="type"
                  onClick={() => handleEdit(pet._id)}
                ></GrEdit>
              </td>
              <td className="text-center">
                <AiOutlineDelete
                  className="edit-icon"
                  size="1.3em"
                  name="type"
                  onClick={() => handleDelete(pet._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PetsList;
