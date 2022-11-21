import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { Button, Form, Col, Row } from "react-bootstrap";
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { FaHorse } from "react-icons/fa";
import { GiDolphin } from "react-icons/gi";
import { GiTigerHead } from "react-icons/gi";
import RangeSlider from "react-bootstrap-range-slider";
import { PetContext } from "../Context/Context-Pets";
import SearchPetsCardList from "../components/Search-PetsCardList";

const SearchPets = () => {
  const [petInfo, setPetInfo] = useState({
    type: "",
    name: "",
    adoptionStatus: "",
    minHeight: 0,
    maxHeight: 300,
    minWeight: 0,
    maxWeight: 500,
  });
  const [isChecked, setIsChecked] = useState(false);
  
  
  const { setPetSearchRes } = useContext(PetContext);

  function handlePetInfo(e) {
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(`http://localhost:8080/pets/search`, {
      params: { ...petInfo },
    });
    setPetSearchRes(res.data);
  };

  const handleClearSearch = (e) => {
    setPetInfo({
      type: "",
      name: "",
      adoptionStatus: "",
      minHeight: 0,
      maxHeight: 300,
      minWeight: 0,
      maxWeight: 500,
    })
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h1 className="display-4">Search for Pet</h1>
      </div>
      <div className="pets-icons">
        <FaDog
          className="pet-icon"
          size="5em"
          name="type"
          onClick={() => setPetInfo({ ...petInfo, type: "Dog" })}
        />
        <FaCat
          className="pet-icon"
          size="5em"
          name="type"
          onClick={() => setPetInfo({ ...petInfo, type: "Cat" })}
        />
        <FaHorse
          className="pet-icon"
          size="5em"
          name="type"
          onClick={() => setPetInfo({ ...petInfo, type: "Horse" })}
        />
        <GiDolphin
          className="pet-icon"
          size="5em"
          name="type"
          onClick={() => setPetInfo({ ...petInfo, type: "Dolphin" })}
        />
        <GiTigerHead
          className="pet-icon"
          size="5em"
          name="type"
          onClick={() => setPetInfo({ ...petInfo, type: "Tiger" })}
        />
      </div>

      <Form.Group className="mb-3 fs-3" id="formGridCheckbox">
        <Form.Check
          type="checkbox"
          label="Advanced Search"
          onChange={(e) => setIsChecked(e.target.checked)}
        />
      </Form.Group>

      <div className={isChecked ? "d-block" : "d-none"}>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                onChange={handlePetInfo}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Adoption Status</Form.Label>
              <Form.Select
                name="adoptionStatus"
                value={petInfo.adoptionStatus}
                defaultValue="Choose..."
                onChange={handlePetInfo}
              >
                <option value="">Choose...</option>
                <option value="Adopted">Adopted</option>
                <option value="Fostered">Fostered</option>
                <option value="Available">Available</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group as={Row} className="search-bars">
            <Form.Label className="my-3">Height (min - max cm)</Form.Label>
            <Col xs="6">
              <RangeSlider
                value={petInfo.minHeight}
                onChange={(e) => {
                  setPetInfo({ ...petInfo, minHeight: e.target.value });
                }}
                // onSelect={(e) => {
                //   setPetInfo({ ...petInfo, minHeight: e.target.value });
                // }}
                tooltipPlacement="top"
                tooltip="on"
                className="my-3"
                name="minHeight"
                min={0}
                max={300}
              />
            </Col>
            <Col xs="6">
              <RangeSlider
                value={petInfo.maxHeight}
                onChange={(e) =>  setPetInfo({ ...petInfo, maxHeight: e.target.value })}
                // onSelect={(e) => {
                //   setPetInfo({ ...petInfo, maxHeight: e.target.value });
                // }}
                tooltipPlacement="bottom"
                tooltip="on"
                className="my-3"
                name="maxHeight"
                min={0}
                max={300}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="search-bars">
            <Form.Label className="my-3">Weight (min - max kg)</Form.Label>
            <Col xs="6">
              <RangeSlider
                value={petInfo.minWeight}
                onChange={(e) => setPetInfo({ ...petInfo, minWeight: e.target.value })}
                // onSelect={(e) => {
                //   setPetInfo({ ...petInfo, minWeight: e.target.value });
                // }}
                tooltipPlacement="top"
                tooltip="on"
                className="my-3"
                name="minWeight"
                min={0}
                max={500}
              />
            </Col>
            <Col xs="6">
              <RangeSlider
                value={petInfo.maxWeight}
                onChange={(e) => setPetInfo({ ...petInfo, maxWeight: e.target.value })}
                tooltipPlacement="bottom"
                tooltip="on"
                className="my-3"
                name="maxWeight"
                min={0}
                max={500}
              />
            </Col>
          </Form.Group>
        </Form>
      </div>
      <div className="search-pet-btn-container">
        <Button
         
          type="submit"
          className="search-pet-btn fs-4"
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
         
          type="submit"
          className="search-pet-btn fs-4"
          onClick={handleClearSearch}
        >
          Clear Search
        </Button>
      </div>

      <SearchPetsCardList />
    </div>
  );
};

export default SearchPets;
