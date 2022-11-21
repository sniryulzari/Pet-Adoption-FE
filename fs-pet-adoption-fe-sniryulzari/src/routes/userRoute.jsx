import React from 'react'
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {UsersContext} from "../Context/Context-Users";

export default function UserRoute() {
const { isLogin } = useContext(UsersContext);

  return isLogin ? <Outlet/> : <Navigate to="/" />
}
