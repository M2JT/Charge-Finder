import { useState, useEffect } from "react";
import {
  Link,
  Navigate,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";
import classes from "../css/SignUpForm.module.css";

export default function SignUpForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className={classes.registerForm}>
      <div className={classes.registerUsernameForm}>
        <label>Username</label>
        <input
          id="username"
          type="username"
          name="username"
          placeholder="Enter Username"
          required
        />
        {/* <Form.Control
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    /> */}
      </div>
      <div className={classes.registerEmailForm}>
        <label>Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter Email"
          required
        />
        {/* <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    /> */}
        <text className="text-muted">
          We'll never share your email with anyone else.
        </text>
      </div>
      <div className={classes.registerPasswordForm}>
        <label>Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter Password"
          required
        />
        {/* <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    /> */}
      </div>
      <button className={classes.registerSubmitBtn} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
      {data && data.errors && (
        <ul className={classes.registerFormError}>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p className={classes.registerFormErrorMsg}>{data.message}</p>}
    </Form>
  );
}
