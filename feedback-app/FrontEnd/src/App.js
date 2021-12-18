import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import useUser from "./useUser";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
export const UserContext = React.createContext();

function App() {
  const ret = useUser();

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <UserContext.Provider value={ret}>
      <div className="App">
        <Router>
          {!ret.isLoggedIn ? (
            <Routes>
              <Route exact path="/Register" element={<Register />} />
              <Route exact path="/" element={<Login />} />
            </Routes>
          ) : (
            //console.log("pola")
            console.log("pola")
          )}
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
