import React from "react";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginUser = () => {
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });
  };
  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={loginUser}>SUBMIT</button>
    </div>
  );
}

export default Login;
