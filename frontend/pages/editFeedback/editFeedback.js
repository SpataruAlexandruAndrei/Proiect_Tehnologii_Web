import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";

export default function AddFeedback() {
  const router = useRouter();
  const idF = parseInt(router.query.id);
  const [startingPoint, setStartingPoint] = useState("");
  const [finishingPoint, setFinishingPoint] = useState("");
  const [transportMean, setTransportMean] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [duration, setDuration] = useState("");
  const [congestionLevel, setCongestionLevel] = useState("");
  const [observations, setObservations] = useState("");
  const [satisfactionLevel, setObservations] = useState("");
  const [feedback, setFeedback] = useState({
    id: "",
    ID_USER: "",
    STARTING_POINT: "",
    FINISHING_POINT: "",
    TRANSPORT_MEAN: "",
    DEPARTURE_TIME: "",
    DURATION: "",
    CONGESTION_LEVEL: "",
    OBSERVATIONS: "",
    SATISFACTION_LEVEL: "",
  });

  useEffect(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/feedback/findFeedbackByID",
        {
          headers: {
            id: idF,
          },
        }
      );
      const oFeedback = response.data;
      setFeedback(oFeedback);
      setStartingPoint(oFeedback.STARTING_POINT);
      setFinishingPoint(oFeedback.FINISHING_POINT);
      setTransportMean(oFeedback.TRANSPORT_MEAN);
      setDepartureTime(oFeedback.DEPARTURE_TIME);
      setDuration(oFeedback.DURATION);
      setCongestionLevel(oFeedback.CONGESTION_LEVEL);
      setObservations(oFeedback.OBSERVATIONS);
      setObservations(oFeedback.SATISFACTION_LEVEL);
      console.log(response.data);
    } catch (err) {
      console.error(err.response);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(data);

    if (startingPoint === "") {
      toast.error("Vă rugăm să vă completați punctul de plecare!");
      return;
    }

    if (finishingPoint === "") {
      toast.error("Vă rugăm să vă completați punctul de sosire!");
      return;
    }

    if (transportMean === "") {
      toast.error("Vă rugăm să vă completați mijlocul de transport!");
      return;
    }

    if (departureTime === "") {
      toast.error("Vă rugăm să vă completați ora de plecare!");
      return;
    }

    if (duration === "") {
      toast.error("Vă rugăm să vă completați durata calatoriei!");
      return;
    }

    if (congestionLevel === "") {
      toast.error(
        "Vă rugăm să vă completați nivelul de aglomerare in mijlocul de transport!"
      );
      return;
    }

    if (observations === "") {
      toast.error("Vă rugăm să vă completați observatiile!");
      return;
    }

    if (satisfactionLevel === "") {
      toast.error("Vă rugăm să vă completați nivelul de satisfactie!");
      return;
    }

    const formValues = {
      id,
      startingPoint,
      finishingPoint,
      transportMean,
      departureTime,
      duration,
      congestionLevel,
      observations,
      satisfactionLevel,
    };
    console.log(formValues);
    // console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/feedback/addFeedback",
        formValues
      );
      if (response.data && response.data.created) {
        toast.success("Feedback-ul a fost adaugat cu succes!");
      }
    } catch (err) {
      console.warn(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="addFeedback">
      <NavBar data={feedback.ID_USER} />
      <div className="main">
        <form className="container" onSubmit={handleSubmit}>
          <h1 className="title">Adauga feedback!</h1>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Punct de plecare"
              name="Punct de plecare"
              value={startingPoint}
              onChange={(e) => setStartingPoint(e.target.value)}
              className="register-input"
            />
            <label className="register-label">Punct de plecare</label>
          </div>

          <div className="inputContainer">
            <input
              type="text"
              placeholder="Punct de sosire"
              name="Punct de sosire"
              value={finishingPoint}
              onChange={(e) => setFinishingPoint(e.target.value)}
              className="register-input"
            />
            <label className="register-label">Punct de sosire</label>
          </div>

          <div className="inputContainer">
            <select
              name="Mijloc de transport"
              value={transportMean}
              onChange={(e) => setTransportMean(e.target.value)}
              className="register-input"
            >
              <option value="autobuz">Autobuz</option>
              <option value="tramvai">Tramvai</option>
              <option value="metrou">Metrou</option>
              <option value="troleibuz">Troleibuz</option>
              <option value="tren">Tren</option>
            </select>
            <label className="register-label">Mijloc de transport</label>
          </div>

          <div className="inputContainer">
            <input
              type="datetime-local"
              placeholder="Ora de plecare"
              name="Ora de plecare"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="register-input"
            />
            <label className="register-label">Ora de plecare</label>
          </div>

          <div className="inputContainer">
            <input
              type="number"
              placeholder="Durata calatoriei"
              name="Durata calatoriei"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="register-input"
            />
            <label className="register-label">Durata calatoriei</label>
          </div>

          <div className="inputContainer">
            <select
              name="Nivel de aglomerare"
              value={congestionLevel}
              onChange={(e) => setCongestionLevel(e.target.value)}
              className="register-input"
            >
              <option value="mic">Mic</option>
              <option value="destul de mic">Destul de mic</option>
              <option value="moderat">Moderat</option>
              <option value="destul de mare">Destul de mare</option>
              <option value="mare">Mare</option>
            </select>
            <label className="register-label">Nivel de aglomerare</label>
          </div>

          <div className="inputContainer">
            <input
              type="text"
              placeholder="Observatii"
              name="Observatii"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="register-input"
            />
            <label className="register-label">Observatii</label>
          </div>

          <div className="inputContainer">
            <input
              type="text"
              placeholder="Nivel de satisfactie"
              name="Nivel de satisfactie"
              value={satisfactionLevel}
              onChange={(e) => setSatisfactionLevel(e.target.value)}
              className="register-input"
            />
            <label className="register-label">Nivel de satisfactie</label>
          </div>

          <input type="submit" value="Adauga feedback" className="submit-btn" />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
