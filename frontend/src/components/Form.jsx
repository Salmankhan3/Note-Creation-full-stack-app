import api from "../api.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator.jsx"; 
export default function Form({ route, method }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const name = method == "login" ? "Login" : "Register";
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await api.post(route, {username,password});
      
      if (method == "login") {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        type="text"
        placeholder="Enter Use Name"
        id="username"
        className="form-input"
        value={username}
        onChange={(evt) => {
          setUserName(evt.currentTarget.value);
        }}
      />
      <input
        type="password"
        placeholder="enter password"
        id="password"
        className="form-input"
        value={password}
        onChange={(evt) => {
          setPassword(evt.currentTarget.value);
        }}
      ></input>
      {loading ? <LoadingIndicator/>: ""}
      <button type="submit" className="form-button">
        {name}
      </button>
      
    </form>
  );
}
