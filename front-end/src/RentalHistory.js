import { Table, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import "./css/RentalHistory.css";

const RentalHistory = () => {
  const [rentalHistoryData, setRentalHistoryData] = useState([]);
  const API_BASE_URL = 'http://localhost:8080/api/rental';


  useEffect(() => {
    fetchRentalHistory();
  }, []);

  const fetchRentalHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      if (response.ok) {
        const data = await response.json();
        setRentalHistoryData(data);
      } else {
        console.error('Failed to fetch rental history');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReturn = async (rentalId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/return/${rentalId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Rental returned successfully');
        await fetchRentalHistory();
      } else {
        console.error('Failed to return rental');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
            <th>Start time</th>
            <th>Duration</th>
            <th>Charges</th>
            <th>Status</th>
            <th>Return charger</th>
          </tr>
          </thead>
          <tbody>
          {rentalHistoryData.map((item, index) => (
              <tr key={index}>
                <td>{format(new Date(item.date), 'yyyy-MM-dd HH:mm:ss')}</td>
                <td>{item.duration} hours</td>
                <td>$ {item.charges}</td>
                <td>{item.rentalStatus}</td>
                <td>
                  {item.rentalStatus === 'Rented' && (
                      <button onClick={() => handleReturn(item)}>Return</button>
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
