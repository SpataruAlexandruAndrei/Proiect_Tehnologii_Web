import React, { useContext, useState } from "react";
import "./Login.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import LoginIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
import Register from "../Register/Register";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(UserContext);

  const handleSubmitLogin = async () => {
    console.log("pola");
  };

  const handleSubmitRegister = async () => {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Register />} />
        </Routes>
      </Router>
    );
  };

  return (
    <div className="login">
      <form className="login__container" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <EmailIcon className="form-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <VpnKeyIcon className="form-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/reset-password">Ai uitat parola?</Link>
        <div className="btn-group">
          <button
            type="submit"
            className="login-btn"
            onClick={handleSubmitLogin}
          >
            <LoginIcon />
            Login
          </button>
          <Link to="/Register">
            <button
              type="submit"
              className="register-btn"
              onClick={handleSubmitRegister}
            >
              <LoginIcon className="register-icon" />
              Register
            </button>
          </Link>
        </div>

        {/* <ExitToAppIcon /> */}
      </form>
    </div>
  );
}

export default Login;
