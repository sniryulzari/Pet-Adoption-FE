import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import { PetContext } from "./Context/Context-Pets";
import { UsersContext } from "./Context/Context-Users";
import NavigationBar from "./components/NavBar";
import Home from "./Pages/Home";
import MyPets from "./Pages/MyPets";
import ProfileSettings from "./Pages/ProfileSettings";
import AdminAddPet from "./Pages/Admin-AddPet";
import AdminEditPet from "./Pages/Admin-EditPet";
import AdminDashboard from "./Pages/Admin-Dashboard";
import AdminUserPets from "./Pages/Admin-UserPets";
import SearchPets from "./Pages/Search";
import PetCard from "./components/Pet-Info";
import UserRoute from "./routes/userRoute";
import AdminRoute from "./routes/adminRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [pets, setPets] = useState([]);
  const [users, setusers] = useState([]);
  const [petSearchRes, setPetSearchRes] = useState([]);
  const [isAdmin, setisAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [petId, setPetId] = useState([]);
  const [userPets, setUserPets] = useState({});

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/users/userInfo`, {
        withCredentials: true,
      });
      if (res.data._id) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      if (res.data.isAdmin === true) {
        setisAdmin(true);
      } else {
        setisAdmin(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  });

  return (
    <UsersContext.Provider
      value={{
        users,
        setusers,
        isLogin,
        setIsLogin,
        isAdmin,
        setisAdmin,
        userPets, 
        setUserPets,
      }}
    >
      <PetContext.Provider
        value={{
          pets,
          setPets,
          petSearchRes,
          setPetSearchRes,
          petId,
          setPetId,
        }}
      >
        <div className="main-container">
          <BrowserRouter>
           
            <NavigationBar />
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/search" element={<SearchPets />} />

              <Route path="/petcard" element={<PetCard />} />

              <Route element={<UserRoute />}>
                <Route path="/profile-Settings" element={<ProfileSettings />} />

                <Route path="/myPets" element={<MyPets />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="/admin-AddPet" element={<AdminAddPet />} />

                <Route path="/admin-EditPet" element={<AdminEditPet />} />

                <Route path="/admin-Dashboard" element={<AdminDashboard />} />

                <Route path="/admin-UserPets" element={<AdminUserPets />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </PetContext.Provider>
    </UsersContext.Provider>
  );
};

export default App;
