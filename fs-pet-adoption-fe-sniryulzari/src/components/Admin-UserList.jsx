import React, { useContext, useEffect, useState } from "react";
import { UsersContext } from "../Context/Context-Users";
import { Table } from "react-bootstrap";
import axios from "axios";
import { MdPets } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const UsersList = () => {
  const { users, setUserPets } = useContext(UsersContext);
  const navigate = useNavigate();

// update table if user pet owner

//take pet id from user/ map the adopted and foster, and fetch each one
const handleUserPets = (user) => {
  setUserPets(user);
  navigate("/admin-UserPets")
  };


  return (
    <div className="users-list">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="fs-5 text-center">Number</th>
            <th className="fs-5 text-center">First Name</th>
            <th className="fs-5 text-center">Last Name</th>
            <th className="fs-5 text-center">Email</th>
            <th className="fs-5 text-center">Phone Number</th>
            <th className="fs-5 text-center">Bio</th>
            <th className="fs-5 text-center">Pet Owner</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{user.firstName}</td>
              <td className="text-center">{user.lastName}</td>
              <td className="text-center">{user.email}</td>
              <td className="text-center">{user.phoneNumber}</td>
              <td className="text-center">{user.bio}</td>
              <td className="text-center"><MdPets className="edit-icon" size="1.3em" name="type" onClick={()=> handleUserPets(user)}/></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersList;
