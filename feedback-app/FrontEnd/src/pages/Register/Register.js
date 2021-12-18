import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LockIcon from "@material-ui/icons/Lock";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [parola, setParola] = useState("");
  const [confirmareParola, setConfirmareParola] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (lastName === "") {
      toast.error("Vă rugăm să vă completați numele!");
      return;
    }

    if (firstName === "") {
      toast.error("Vă rugăm să vă completați prenumele!");
      return;
    }

    if (email === "") {
      toast.error("Vă rugăm să vă completați email-ul!");
      return;
    }

    if (
      !/([a-zA-Z0-9]+)([_.-{1}])?([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.])([a-zA-Z.]+)/g.test(
        email
      )
    ) {
      toast.error("Formatul email-ului nu este valid!");
      return;
    }

    if (!telefon.match("^[0-9+]{10}$")) {
      toast.error("Numărul de telefon nu este scris corect!");
      return;
    }

    if (parola === "") {
      toast.error("Alegeți o parolă!");
      return;
    }

    if (parola.length < 6) {
      toast.error("Alegeți o parolă mai lungă!");
      return;
    }

    if (confirmareParola !== parola) {
      toast.error("Parolele nu se potrivesc!");
      return;
    }

    const formValues = {
      lastName,
      firstName,
      email,
      phone: telefon,
      password: parola,
    };
    console.log(formValues);
    try {
      setIsLoading(true);
      await axios.post(
        "http://localhost:8080/api/recruits/addRecruit",
        formValues
      );
      navigate("/congrats");
    } catch (err) {
      setIsLoading(false);
      console.warn(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="register">
      <form className="register__container" onSubmit={handleSubmit}>
        <div className="form-group">
          <AccountCircleIcon className="register-icon" />
          <input
            type="text"
            placeholder="Nume"
            name="nume"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <AccountCircleIcon className="register-icon" />
          <input
            type="text"
            placeholder="Prenume"
            name="prenume"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <EmailIcon className="register-icon" />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <PhoneIcon className="register-icon" />
          <input
            type="number"
            placeholder="Număr de telefon"
            name="telefon"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
          />
        </div>

        <div className="form-group">
          <LockIcon className="register-icon" />
          <input
            type="password"
            placeholder="Introduceți parola"
            name="parola"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
          />
        </div>

        <div className="form-group">
          <LockIcon className="register-icon" />
          <input
            type="password"
            placeholder="Confirmă parola"
            name="confirmare-parola"
            value={confirmareParola}
            onChange={(e) => setConfirmareParola(e.target.value)}
          />
        </div>

        {!isLoading ? (
          <input
            type="submit"
            value="Înregistrează-te"
            className="submit-btn"
            disabled={isLoading}
          />
        ) : (
          <ClipLoader color="#0574e5" loading={isLoading} size={30} />
        )}

        <div style={{ marginTop: 10 }}>
          Ești deja înregistrat?{" "}
          <span
            onClick={() => navigate("/")}
            style={{ fontWeight: "bold", cursor: "pointer" }}
          >
            Loghează-te aici
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
