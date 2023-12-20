import { Link, Navigate, json, redirect } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Register.css";
import SignUpForm from "./components/SignUpForm";
import { getAuthToken } from "./util/auth";

const Register = () => {
  const token = getAuthToken();

  const Reroute = ({ to, children }) => (
    <Link to={to} className="reroute">
      {children}
    </Link>
  );

  return (
    <>
      {token ? (
        <Navigate to={"/account"} />
      ) : (
        <div>
          <Tabs className="home-tabs" defaultActiveKey="account">
            <Tab eventKey="map" title={<Reroute to="/">Map</Reroute>}></Tab>
            <Tab
              eventKey="rentals"
              title={<Reroute to="/rentals">Rental History</Reroute>}
            ></Tab>
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
                <SignUpForm />
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Register;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    userPassword: data.get("password"),
    username: data.get("username"),
  };

  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400
  ) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
  localStorage.setItem("username", resData.username);
  localStorage.setItem("email", resData.email);
  localStorage.setItem("joinDate", resData.joinDate);

  return redirect("/");
}
