import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import './LoginForm.css'

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      localStorage.setItem("userId", user.id)
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupClick = () => {
    return history.push('/sign-up')
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className='formContainer'>
    <form className='loginForm' onSubmit={onLogin}>
      <div className='innerLogin'>
      <div className='errors'>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
        {/* <label htmlFor="email">Email</label> */}
      <div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
        {/* <label htmlFor="password">Password</label> */}
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </div>
        <button type="submit">Login</button>
      <div id='signupClick' onClick={handleSignupClick}>Don't have an account? Sign Up</div>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
