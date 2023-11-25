import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Tabs, Tab, Button, Form } from "react-bootstrap";
import "./css/Login.css";

const Login = () => {
  const usernameLocalStorage = localStorage.getItem("username");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Reroute = ({ to, children }) => (
    <Link to={to} className="reroute">
      {children}
    </Link>
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (username && password) {
      // store username in localStorage
      localStorage.setItem("username", username);
      window.location.href = "/account";
    } else {
      alert("Please fill out all parts!");
    }
  };

  return (
    <>
      {usernameLocalStorage ? (
        <Navigate to={"/account"} />
      ) : (
        <div>
          <Tabs className="home-tabs" defaultActiveKey="account">
            <Tab eventKey="map" title={<Reroute to="/">Map</Reroute>}></Tab>
            <Tab eventKey="rentals" title="Rentals"></Tab>
            <Tab
              eventKey="account"
              title={<Reroute to="/login">Login/Register</Reroute>}
            ></Tab>
          </Tabs>
          <main className="Login">
            <div className="Login-wrapperDiv">
              <div className="Login-tabDiv">
                <div className="Login-loginTab">Login</div>
                <div>
                  <Link className="Login-registerTab" to="/register">
                    <p>Sign up</p>
                  </Link>
                </div>
              </div>
              <div className="Login-loginDiv">
                <Form className="Login-form" onSubmit={handleLogin}>
                  <div className="Login-usernameEmailForm">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="Login-passwordForm">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="Login-submitBtn">
                    Login
                  </Button>
                </Form>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Login;
