import React, { useState, useEffect, createRef } from "react";
import Navbar from "../home/Navbar";
import { Link, useLocation } from "react-router-dom";
import { HeaderOne, FormComponent } from "../../StyledComponents/utility";
import LoginComponent from "../../StyledComponents/auth/Login";
import { connect } from "react-redux";
import {
  login,
  setRegisterLoginLoading,
  clearRedirectToLogin,
} from "../../actions/authAction";
import { toast } from "react-toastify";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";

const Login = (props) => {
  const {
    isAuthenticated,
    alert,
    setRegisterLoginLoading,
    registerLoginLoading,
    login,
    clearRedirectToLogin,
  } = props;

  const location = useLocation();
  // refs
  const submitBtn = createRef();

  const [hidden, sethidden] = useState(true);
  const handleShowPassword = (e) => {
    sethidden(!hidden);
  };

  useEffect(() => {
    if (registerLoginLoading === true) {
      submitBtn.current.value = "Loading...";
      submitBtn.current.style.opacity = "0.5";
    } else {
      submitBtn.current.value = "Login";
      submitBtn.current.style.opacity = "1";
    }
  }, [registerLoginLoading]);

  useEffect(() => {
    if (isAuthenticated && alert.length === 0) {
      props.history.push("/dashboard");
    }
  }, [isAuthenticated, alert, props.history]);
  const [user, setUser] = useState({
    usernameOrEmail: "",
    password: "",
    lab: location?.state?.lab ? location.state.lab : "robotic-technology",
  });

  useEffect(() => {
    clearRedirectToLogin();
  }, []);

  const { usernameOrEmail, password, lab } = user;

  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    if (
      /\S/.test(user.usernameOrEmail) &&
      user.usernameOrEmail.length >= 3 &&
      user.password.length >= 5
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [disableSubmit, user]);

  const disabledBtn = () => {
    if (disableSubmit)
      return {
        color: "rgba(0, 0, 0, 0.26)",
        boxShadow: "none",
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        cursor: "default",
        pointerEvents: "none",
      };
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const emailRegex = /^([a-z0-9\.\-_]+)@([a-z0-9\.\-_]+)\.([a-z]{2,6})$/i;
  const handleSubmit = (e) => {
    setRegisterLoginLoading();
    e.preventDefault();

    if (emailRegex.test(usernameOrEmail)) {
      login({
        email: usernameOrEmail,
        password: password,
        lab: lab,
      });
    } else {
      login({
        username: usernameOrEmail,
        password: password,
        lab: lab,
      });
    }
  };

  useEffect(() => {
    alert.forEach((elem) => {
      if (elem.type === "success") toast.success(elem.msg);
      else toast.error(elem.msg);
    });
  }, [alert]);

  return (
    <>
      <Navbar public />
      <LoginComponent>
        <HeaderOne>Welcome back</HeaderOne>
        <p className="helper-form-text">
          Don't have an account yet? <Link to="/register">Sign Up</Link>
        </p>
        <FormComponent onSubmit={handleSubmit} registerLoginForm>
          <div className="form-group">
            <input
              type="text"
              name="usernameOrEmail"
              id="usernameOrEmail"
              required
              autoFocus
              placeholder="Your username or email"
              onChange={onChange}
              value={usernameOrEmail}
              minLength="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lab">Choose Lab:</label>

            <select name="lab" id="lab" onChange={onChange} value={lab}>
              <option value="robotic-technology">Robotic Technology</option>
              <option value="electronics-and-iot">Electronics and IoT</option>
              <option value="data-and-software-technology">
                Data and Software Technology
              </option>
              <option value="animation-and-game-design">
                Animation and Game Design
              </option>
              <option value="electric-mobility">Electric Mobility</option>
              <option value="finance-technology">Finanace Technology</option>
              <option value="smart-manufacturing">Smart Manufacturing</option>
              <option value="aeronautics-and-space-technology">
                Aeronautics and Space Technology
              </option>
            </select>
          </div>

          <div className="form-group">
            <div className="password-div">
              <input
                type={hidden ? "password" : "text"}
                name="password"
                id="password"
                required
                placeholder="Enter your password"
                onChange={onChange}
                value={password}
                minLength="5"
              />
              {hidden ? (
                <BsEyeFill onClick={handleShowPassword} />
              ) : (
                <BsEyeSlashFill onClick={handleShowPassword} />
              )}
            </div>
          </div>
          <input
            ref={submitBtn}
            style={disabledBtn()}
            type="submit"
            value="Login"
            className="submit-btn"
          />
        </FormComponent>
      </LoginComponent>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  registerLoginLoading: state.auth.registerLoginLoading,
  alert: state.auth.alert,
});

const mapDispatchToProps = {
  login,
  setRegisterLoginLoading,
  clearRedirectToLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
