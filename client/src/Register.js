import React from "react";

function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hello, setHello] = React.useState("");

  const registerUser = () => {
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    }).then(() => {
      setHello("yooooooooooooooooo");
    });
  };

  return (
    <div>
      <h1>Register</h1>
      {hello}
      <div style={{ marginBottom: 20 }}>
        <label htmlFor="username">username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          type="text"
          name="username"
          id=""
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="text"
          name="password"
          id=""
        />
      </div>
      <button onClick={registerUser}>SUBMIT</button>
    </div>
  );
}

export default Register;
