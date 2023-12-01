import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "../css/AuthForm.module.css";
export default function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method="post" className={classes.loginForm}>
      <div className={classes.loginUsernameEmailForm}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter Email"
          required
        />
        {/* <Form.Control
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> */}
      </div>
      <div className={classes.loginPasswordForm}>
        <label htmlFor="image">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter Password"
          required
        />
        {/* <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
      </div>
      <button className={classes.loginSubmitBtn} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Login"}
      </button>
      {data && data.errors && (
        <ul className={classes.loginFormError}>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p className={classes.loginFormErrorMsg}>{data.message}</p>}
    </Form>
  );
}
