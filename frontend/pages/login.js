import React, { useContext, useState, Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, withRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValues = {
      email,
      parola,
    };
    //console.log(formValues);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formValues
      );
      console.log(response);
      if (response.data && response.data.login === true) {
        router.push({
          pathname: "/profile",
          as: "/",
          query: {
            email: email,
          },
        });
      }
    } catch (err) {
      console.warn(err);
      toast.error(err.response);
    }
  };

  return (
    <div className="login">
      <form className="container">
        <h1 className="title">Bine ai venit!</h1>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
          <label className="register-label">Email</label>
        </div>
        <div className="inputContainer">
          <input
            type="password"
            placeholder="Introduceti parola"
            name="parola"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            className="register-input"
          />
          <label className="register-label">Introduceti parola</label>
        </div>
        <button type="submit" onClick={handleSubmit} className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
