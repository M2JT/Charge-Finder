import { useState, useEffect } from "react";
import { Link, Navigate, json, redirect } from "react-router-dom";
import { Tabs, Tab} from "react-bootstrap";
import "./css/Login.css";
import AuthForm from "./components/AuthForm.jsx";
import { getAuthToken } from "./util/auth.js";

const Login = () => {
  const token = getAuthToken();

  const Reroute = ({ to, children }) => (
    <Link to={to} className="reroute">
      {children}
    </Link>
  );

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   if (username && password) {
  //     // store username in localStorage
  //     localStorage.setItem("username", username);
  //     window.location.href = "/account";
  //   } else {
  //     alert("Please fill out all parts!");
  //   }
  // };

  return (
    <>
      {token ? (
        <Navigate to={"/account"} />
      ) : (
        <div>
          <Tabs className="home-tabs" defaultActiveKey="account">
            <Tab eventKey="map" title={<Reroute to="/">Map</Reroute>}></Tab>
            <Tab eventKey="rentals" title={<Reroute to="/rentals">Rental History</Reroute>}></Tab>
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
                <AuthForm />
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Login;

export async function action({ request }) {
  const formData = await request.formData();
  console.log('Email:', formData.get('email'));
  console.log('Password:', formData.get('password'));
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  const authData = { email, password };

  const response = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authData),
  });

  if (!response.ok) {
    const text = await response.text();
    alert(text);
    return null;
  }

  alert('Login successful.');
  localStorage.setItem('username', email);
  return redirect('/');
}

