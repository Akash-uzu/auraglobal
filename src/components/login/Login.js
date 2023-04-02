import React, { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import {  useSelector} from "react-redux"



const Login = () => {
  const users = useSelector((state)=> state.addUser.users)

  console.log(users)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const handleLogin = (event) => {
    event.preventDefault();
    checkUser() 
  };

  const checkUser = ()=>{
    const userCheck = users.find((user)=>(user.username===username && user.password===password))

    if (userCheck) {
      localStorage.setItem("login",true)
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }

  }  

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="form-container">
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="username(admin)"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password(12345)"
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}

      </div>

    </div>
  );
};

export default Login;
