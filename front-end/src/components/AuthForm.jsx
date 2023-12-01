import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "../css/AuthForm.module.css"
export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method="post" className={classes.loginForm}>
      <div className={classes.loginUsernameEmailForm}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
        {/* <Form.Control
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> */}
      </div>
      <div className={classes.loginPasswordForm}>
        <label htmlFor="image">Password</label>
        <input id="password" type="password" name="password" required />
        {/* <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
      </div>
      <button className = {classes.loginSubmitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Login'}
          </button>
    </Form>
  );
}
