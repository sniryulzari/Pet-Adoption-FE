import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import PetsList from "../components/Admin-PetList";
import UsersList from "../components/Admin-UserList";
import { UsersContext } from "../Context/Context-Users";
import { PetContext } from "../Context/Context-Pets";
import axios from "axios";


const AdminDashboard = () => {
  const { users, setusers } = useContext(UsersContext);
  const { pets, setPets } = useContext(PetContext);

  const navigate = useNavigate();
 
  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/allusers", 
      {
        withCredentials: true,
      });
      setusers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/all", {
        withCredentials: true,
      });
      setPets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllPets();
  }, []);

  return (
    <div className="admin-dashboard-pets-container mt-3">
      <h1 className="display-4">Admin Dashboard</h1>
      <h3 className="display-7 mt-4 mb-2">List of Users</h3>

      <UsersList />
      <div className="admin-table-header mt-5 mb-2">
        <h3 className="display-7">List of Pets</h3>
        <button className="add-pet-button-link" onClick={() => navigate("/admin-AddPet")}>Add Pet</button>
      </div>
      <PetsList />
    </div>
  );
};

export default AdminDashboard;
