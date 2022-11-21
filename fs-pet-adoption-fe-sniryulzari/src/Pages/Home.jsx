import { useContext, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../Images/547.jpg";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";
import axios from "axios";
import { UsersContext } from "../Context/Context-Users";
import ProfileSettings from "../Pages/ProfileSettings";

const Home = () => {
  const [show, setShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const { isLogin, setIsLogin, setisAdmin } = useContext(UsersContext);

  const navigate = useNavigate();

  useEffect(() => {
    const userFirstName = JSON.parse(localStorage.getItem("userFirstName"));
    const userLastName = JSON.parse(localStorage.getItem("userLastName"));
    setfirstName(userFirstName);
    setlastName(userLastName);
  }, []);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleLoginShow = () => {
    setLoginShow(true);
  };

  const handleLoginClose = () => {
    setLoginShow(false);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users/logout", {
        withCredentials: true,
      });
      // console.log(res.data);
      if (res.data.ok) {
        localStorage.clear();
        setIsLogin(false);
        setisAdmin(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home-container">
      {isLogin ? (
        <div>
          <h1 className="welcome-title display-5">
            Welcom {firstName} {lastName}
          </h1>
          <button className="Login-Btn btn btn-success" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="welcome-container">
          <span className="welcome-title-top">
            Two Is always Better Than One
          </span>
          <span className="welcome-title-bottom-start">AdoPet Your</span>
          <span className="welcome-title-bottom-end">New Best Friend</span>
          <button className="Login-Btn" onClick={handleLoginShow}>
            Login
          </button>
        </div>
      )}

      <div className="home-bottom-page-container">
        {/* <label>what are we doing?</label>
        <p>
          For almost two decades, Adopt a Pet has helped in creating true social
          change by bringing pet adoption into the mainstream. Our work has
          helped make a difference to the Israel rescue community and thousands
          of pets in need of rescue and rehabilitation. But, until every pet is
          safe, respected, and loved, we all still have big, hairy work to do.
          Find out more about our mission to help save 100,000 healthy and
          rehomable pets each year.
        </p> */}
      </div>
      <SignupModal
        show={show}
        handleClose={handleClose}
        handleLoginShow={handleLoginShow}
      />
      <LoginModal
        loginShow={loginShow}
        handleLoginClose={handleLoginClose}
        handleShow={handleShow}
        setfirstName={setfirstName}
        setlastName={setlastName}
      />
    </div>
  );
};

export default Home;
