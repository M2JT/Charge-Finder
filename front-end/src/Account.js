import { Link } from "react-router-dom";
import { Popover, OverlayTrigger, Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Account.css";
import profileImg from "./images/profile-img.png";

const Account = () => {
  const showRentalHistoryPopover = (
    <Popover className="Account-overlay">
      <Popover.Header>System Messages:</Popover.Header>
      <Popover.Body>Hello!</Popover.Body>
    </Popover>
  );

  const Reroute = ({ to, children }) => (
    <Link to={to} className="reroute">
      {children}
    </Link>
  );

  return (
    <>
      <Tabs className="home-tabs" defaultActiveKey="account">
        <Tab eventKey="map" title={<Reroute to="/">Map</Reroute>}></Tab>
        <Tab eventKey="rentals" title="Rentals"></Tab>
        <Tab
          eventKey="account"
          title={<Reroute to="/login">Login/Register</Reroute>}
        ></Tab>
      </Tabs>
      <main className="Account">
        <img
          className="Account-image"
          src={profileImg}
          alt="user profile image"
        ></img>
        <div className="Account-wrapperDiv">
          <div className="Account-tabDiv">
            <div className="Account-infoTab">Overview</div>
          </div>
          <div className="Account-infoDiv">
            <div className="Account-details">
              <p>
                <b>Username: </b> admin
              </p>
            </div>
            <div className="Account-details">
              <p>
                <b>Email address: </b> 123@gmail.com
              </p>
            </div>
            <div className="Account-details">
              <p>
                <b>Joined on: </b> 11/25/2023
              </p>
            </div>
            <OverlayTrigger
              trigger="click"
              placement="top"
              overlay={showRentalHistoryPopover}
            >
              <button className="Account-checkRentalHistoryBtn">
                Rental History
              </button>
            </OverlayTrigger>
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
