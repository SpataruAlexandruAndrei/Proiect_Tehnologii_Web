import NavBar from "../components/NavBar";
import { useRouter, withRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";

const Profile = () => {
  const router = useRouter();
  const { email } = router.query;
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
        .get("http://localhost:8000/api/user/getAllUsers")
        // .get("http://localhost:8000/api/user/getUserByEmail", email)
        .then((res) => {
          console.log(res.data);
          const users = res.data;
          users.forEach((user) => {
            if (user.email === email) {
              console.log(user);
              const { firstName, lastName, email, phone, password } = user;
              const newData = {
                firstName,
                lastName,
                email,
                phone,
                password,
              };
              setData(newData);
            }
          });
          // const { firstName, lastName, email, phone, password } = res.data;
          // const newData = {
          //   firstName,
          //   lastName,
          //   email,
          //   phone,
          //   password,
          // };
          // setData(newData);
        })

        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err.response.data);
    }
  }, []);
  console.log(data);
  return (
    <div className="profile">
      <NavBar data={data} />
      <div className="main">
        <div className="container">
          <h1 className="title-profile">Date Personale</h1>
          <div className="name-container">
            <div className="firstName">
              <h2>Nume</h2>
              <p>{data.firstName}</p>
            </div>
            <div className="lastName">
              <h2>Prenume</h2>
              <p>{data.lastName}</p>
            </div>
          </div>
          <div className="phone-container">
            <h2>Numar de telefon</h2>
            <p>{data.phone}</p>
          </div>
          <div className="email-container">
            <h2>Email</h2>
            <p>{data.email}</p>
          </div>
          <div className="btn-container">
            <button type="submit" className="delete-btn">
              Dezactivare cont
            </button>
            <button type="submit" className="edit-btn">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
