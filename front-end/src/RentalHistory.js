import { Table, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./css/RentalHistory.css";

const RentalHistory = () => {
  const [rentalHistoryData, setRentalHistoryData] = useState([]);

  useEffect(() => {
    fetchRentalHistory();
  }, []);

  const fetchRentalHistory = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL + "/getRentalHistory/" + username}`
      );
      if (response.ok) {
        const data = await response.json();
        setRentalHistoryData(data);
      } else {
        console.error("Failed to fetch rental history");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReturn = async (rentalId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/return/${rentalId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Rental returned successfully");
        await fetchRentalHistory();
      } else {
        console.error("Failed to return rental");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatDateString = (inputDateString) => {
    const inputDate = new Date(inputDateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(inputDate);

    return formattedDate.replace(",", "");
  };

  const calculateDuration = (returnDate, rentalDate, powerBankReturned) => {
    let timeDifference = 0;

    if (powerBankReturned) {
      returnDate -= 5 * 3600000;
      timeDifference = new Date(returnDate) - new Date(rentalDate);
    } else {
      timeDifference = new Date() - new Date(rentalDate);
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    let formattedDuration = "";

    if (hours > 0) {
      formattedDuration += `${hours} ${hours === 1 ? "hour" : "hours"}`;
    }

    if (minutes > 0) {
      if (formattedDuration !== "") {
        formattedDuration += " and ";
      }

      formattedDuration += `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    }

    if (hours === 0 && minutes === 0) {
      formattedDuration = "less than 1 minute";
    }

    return formattedDuration;
  };

  const Reroute = ({ to, children }) => (
    <Link to={to} className="reroute">
      {children}
    </Link>
  );

  return (
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
            <th>Transaction ID</th>
            <th>Start Time</th>
            <th>Duration</th>
            <th>Charges</th>
            <th>Status</th>
            <th>Return Power Bank</th>
          </tr>
        </thead>
        <tbody>
          {rentalHistoryData.map((item, index) => (
            <tr key={index}>
              <td>{item.transactionId}</td>
              <td>{formatDateString(item.rentalDate)}</td>
              <td>
                {item.rentalStatus === "Rented"
                  ? calculateDuration(item.updateTime, item.rentalDate, false)
                  : calculateDuration(item.updateTime, item.rentalDate, true)}
              </td>
              <td>
                {item.rentalStatus === "Rented"
                  ? `$${item.charges}/hr`
                  : `$${item.charges}`}
              </td>
              <td>{item.rentalStatus}</td>
              <td>
                {item.rentalStatus === "Rented" && (
                  <button
                    className="return-button"
                    onClick={() => handleReturn(item.rentalId)}
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RentalHistory;
