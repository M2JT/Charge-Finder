import { Table, Tabs, Tab } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "./css/RentalHistory.css";

const RentalHistory = () => {
  const usernameLocalStorage = localStorage.getItem("username");
  const rentalHistoryData = [
    {
      date: "2023-11-25",
      duration: "2 hours",
      charges: "$10.00",
      status: "Completed",
      chargerId: "CHG001",
    },
  ];

  const Reroute = ({ to, children }) => (
    <Link to={to} className="reroute">
      {children}
    </Link>
  );

  return (
    <>
    {usernameLocalStorage ? (
        <div className="rental-history-container">
        <Tabs className="home-tabs" defaultActiveKey="rentals">
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
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Duration</th>
              <th>Charges</th>
              <th>Status</th>
              <th>Charger ID</th>
            </tr>
          </thead>
          <tbody>
            {rentalHistoryData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.duration}</td>
                <td>{item.charges}</td>
                <td>{item.status}</td>
                <td>{item.chargerId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    ) : (
        <Navigate to={"/login"}/>
    )}
    </>
  );
};

export default RentalHistory;
