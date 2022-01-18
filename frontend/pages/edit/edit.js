import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, withRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const router = useRouter();
  const { email } = router.query;
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [editEmail, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [data, setData] = useState({
    nume: "",
    prenume: "",
    telefon: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8000/api/user/getUserByEmail", {
          headers: {
            email: email,
          },
        })
        .then((res) => {
          const user = res.data;
          const { firstName, lastName, email, phone, password } = user;
          const newData = {
            firstName,
            lastName,
            email,
            phone,
            password,
          };
          setData(newData);
          setLastName(newData.lastName);
          setFirstName(newData.firstName);
          setTelefon(newData.phone);
          setEmail(newData.email);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err.response);
    }
  }, []);

  const handleSave = async (e) => {
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

    const formValues = {
      lastName,
      firstName,
      email,
      phone: telefon,
    };
    console.log(formValues);
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/user/updateUser",
        formValues
      );
      if (response) {
        toast.success("Datele au fost salvate cu succes!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="edit">
      <NavBar data={data} />
      <div className="main">
        <div className="container">
          <h1 className="title-profile">Date Personale</h1>
          <div className="name-container">
            <div className="firstName">
              <h2>Nume</h2>
              <input
                type="text"
                name="nume"
                placeholder="Nume"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="lastName">
              <h2>Prenume</h2>
              <input
                type="text"
                name="prenume"
                placeholder="Prenume"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="phone-container">
            <h2>Numar de telefon</h2>
            <input
              type="text"
              name="telefon"
              placeholder="Numar telefon"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
            />
          </div>
          <div className="email-container">
            <h2>Email</h2>
            <input
              type="text"
              name="email"
              placeholder="Adresa de email"
              value={editEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Link
            as="/profile"
            href={{ pathname: "../profile/profile", query: data }}
          >
            <button type="submit" className="delete-btn-edit">
              Anulare
            </button>
          </Link>
          <button type="submit" className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Edit;
