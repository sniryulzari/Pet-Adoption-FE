import React from 'react'
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {UsersContext} from "../Context/Context-Users";

export default function AdminRoute() {
const { isAdmin } = useContext(UsersContext);


  return isAdmin ? <Outlet/> : <Navigate to="/" />
}
