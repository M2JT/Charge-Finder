import { useState } from "react";
import classes from "../css/AuthForm.module.css";

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const authData = { email, password };

    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData),
    });

    if (!response.ok) {
      const text = await response.text();
      alert(text);
    } else {
      alert('Login successful.');
      localStorage.setItem('username', email);
      // Redirect or update state as needed
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.loginForm}>
      {/* Email input */}
      <div className={classes.loginUsernameEmailForm}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password input */}
      <div className={classes.loginPasswordForm}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Submit button */}
      <button type="submit" className={classes.loginSubmitBtn}>
        Login
      </button>
    </form>
  );
}
