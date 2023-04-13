import React from "react";
import NavbarComponent from "../../StyledComponents/home/Navbar";
import nvcti_logo from "../.././assets/nvctii.png";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { logout } from '../../actions/authAction'

const labs = {
  "robotic-technology": "Robotic Technology",
  "electronics-and-iot": "Electronics and IoT",
  "data-and-software-technology": "Data and Software Technology",
  "animation-and-game-design": "Animation and Game Design",
  "electric-mobility": "Electric Mobility",
  "finance-technology": "Finanace Technology",
  "smart-manufacturing": "Smart Manufacturing",
  "aeronautics-and-space-technology": "Aeronautics and Space Technology"
}

const Navbar = (props) => {
  const { logout, user } = props
  const publicLInksStyle = {
    display: props.private ? "none" : "inline-flex"
  }

  const handleLogout = () => {
    logout();
  }
  return (
    <NavbarComponent
      style={{
        boxShadow: props.dashboard
          ? "none"
          : "0px 6px 5px 0px rgba(128, 128, 128, 1)",
      }}
    >
      <ul>
        <div className="left">
          <li className="brand-name">
            <Link to={props.private ? "/dashboard" : "/"}>
              <img src={nvcti_logo} height={45} width={45} alt="nvcti-logo" />
            </Link>
            {user ? <div>{labs[user.lab]}</div> : ""}
          </li>
        </div>
        <div
          style={{
            display: props.notfound ? "none" : "flex",
          }}
          className="right"
        >
          <li style={publicLInksStyle} className="login">
            <Link to="/login">Log in </Link>
            <BiLogIn />
          </li>
          <li style={publicLInksStyle} className="login">
            <Link to="/register">Sign up</Link>
          </li>

          <li
            style={{ display: props.public ? "none" : "inline-flex" }}
            className="settings"
          >
            <Link to="/settings">Settings</Link>
            <FiSettings />
          </li>
          <li
            onClick={handleLogout}
            style={{
              display: props.public ? "none" : "inline-flex",
              paddingLeft: "1rem",
            }}
            className="logout"
          >
            <a href="#">Logout</a>
            <BiLogOut />
          </li>
        </div>
      </ul>
    </NavbarComponent>
  );
};

const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(Navbar);
