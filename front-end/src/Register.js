import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Tabs, Tab, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Register.css";

const Register = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const Reroute = ({ to, children }) => (
    <Link to={to} className="reroute">
      {children}
    </Link>
  );

  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/account" />
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
          <main className="Register">
            <div className="Register-wrapperDiv">
              <div className="Register-tabDiv">
                <div className="Register-loginTab">
                  <Link to="/login">
                    <p>Login</p>
                  </Link>
                </div>
                <div className="Register-registerTab">Sign up</div>
              </div>
              <div className="Register-registerDiv">
                <Form className="Register-form">
                  <div className="Register-usernameForm">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="Register-emailForm">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </div>
                  <div className="Register-passwordForm">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button className="Register-submitBtn" type="submit">
                    Sign Up
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

export default Register;
