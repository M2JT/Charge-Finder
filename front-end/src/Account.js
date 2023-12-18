import { Link, Navigate } from "react-router-dom";
import { Popover, OverlayTrigger, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Account.css";
import profileImg from "./images/profile-img.png";

const Account = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const joinDateTimestamp  = Number(localStorage.getItem("joinDate"));
  const joinDate = new Date(joinDateTimestamp);
  const formattedDate = joinDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
  console.log('formattedDate: ' , joinDateTimestamp)

  // const showRentalHistoryPopover = (
  //   <Popover className="Account-overlay">
  //     <Popover.Header>System Messages:</Popover.Header>
  //     <Popover.Body>Hello!</Popover.Body>
  //   </Popover>
  // );

  const Reroute = ({ to, children }) => (
    <Link to={to} className="reroute">
      {children}
    </Link>
  );

  // handle user logout
  const handleLogout = () => {
    window.location.href = "/logout";
  };

  return (
    <>
      <div>
        <Tabs className="home-tabs" defaultActiveKey="account">
          <Tab eventKey="map" title={<Reroute to="/">Map</Reroute>}></Tab>
          <Tab
            eventKey="rentals"
            title={<Reroute to="/rentals">Rental History</Reroute>}
          ></Tab>
          <Tab
            eventKey="account"
            title={<Reroute to="/account">Account</Reroute>}
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
                  <b>Username: </b> {username}
                </p>
              </div>
              <div className="Account-details">
                <p>
                  <b>Email address: </b> {email}
                </p>
              </div>
              <div className="Account-details">
                <p>
                  <b>Joined on: </b> {formattedDate}
                </p>
              </div>
              <Button onClick={handleLogout} className="Account-logoutBtn">
                Logout
              </Button>
              {/* <OverlayTrigger
                  trigger="click"
                  placement="top"
                  overlay={showRentalHistoryPopover}
                >
                  <button className="Account-checkRentalHistoryBtn">
                    Rental History
                  </button>
                </OverlayTrigger> */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Account;
