import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const getMe = () => {
    fetch("http://localhost:8080/auth/me", {
      credentials: "include",
    });
  };
  return (
    <div>
      <h1>Home page</h1>
      <Link to="/register">Register Page</Link>
      <br />
      <Link to="/login">Login Page</Link>
      <button onClick={getMe}>GET ME! :)</button>
    </div>
  );
}

export default Home;
