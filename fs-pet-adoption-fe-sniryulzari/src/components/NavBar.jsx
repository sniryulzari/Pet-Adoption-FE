import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../Context/Context-Users";
import logo from "../Images/petlogo.png"

function NavigationBar(props) {
  const { isAdmin, isLogin } = useContext(UsersContext);

  return (
    <nav className="navBar">
      <ul className="nav-links">
        <img src={logo} className="logo"/>
        <div className="link-container">
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>

        <li>
          <Link className="link" to="/search">
            Search
          </Link>
        </li>

        {isLogin ? (
          <li>
            <Link className="link" to="/mypets">
              My Pets
            </Link>
          </li>
        ) : null}

        {isLogin ? (
          <li>
            <Link className="link" to="/profile-Settings">
              Profile Settings
            </Link>
          </li>
        ) : null}

        {isAdmin && (
          <li>
            <Link className="link" to="/admin-Dashboard">
              Admin
            </Link>
          </li>
        )}
        </div>
      </ul>
    </nav>
  );
}

export default NavigationBar;
