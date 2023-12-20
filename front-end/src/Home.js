import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  MarkerF,
  InfoWindow,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import chargingStationIcon from "./images/charging-station.png";
import curLocationIcon from "./images/cur-location.png";
import centerIcon from "./images/center.png";
import "./css/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuthToken } from "./util/auth";
import axios from "axios";

const Home = () => {
  const token = getAuthToken();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });
  const usernameLocalStorage = localStorage.getItem("username");
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [isGettingDirection, setIsGettingDirection] = useState(false);
  const [selectedTravelMode, setSelectedTravelMode] = useState("DRIVING");
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const defaultLocation = { lat: 40.724030, lng: -73.987610 };
  const [allStationsInfo, setAllStationsInfo] = useState([]);

  useEffect(() => {
    getUserCurrentLocation();
    fetchAllStationsInfo();
  }, []);

  // call the calc direction function when a charging station is selected
  useEffect(() => {
    if (selectedStation) {
      calculateDirections(currentLocation, selectedStation);
      setIsGettingDirection(false);
    }
  }, [selectedStation, selectedTravelMode]);

  // check if currentLocation is null and set it to defaultLocation
  useEffect(() => {
    if (!currentLocation) {
      setCurrentLocation(defaultLocation);
    }
  }, [currentLocation]);

  const fetchAllStationsInfo = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/getAllStations`)
        .then((response) => {
          setAllStationsInfo(response.data);
        });
    } catch (err) {
      console.log("couldn't get stations info from backend...");
      console.error(err);
    }
  };

  // get user's current location using Geolocation API
  const getUserCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  };

  const calculateDirections = async (origin, selectedStation) => {
    const directionsService = new window.google.maps.DirectionsService();
    const destination = {
      lat: selectedStation.latitude,
      lng: selectedStation.longitude,
    };

    await directionsService.route(
      {
        origin,
        destination,
        travelMode: selectedTravelMode,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  const closeInfoWindow = () => {
    setDirections(null);
    setIsInfoWindowOpen(false);
  };

  const centerMapOnUser = () => {
    if (currentLocation && map) {
      map.panTo(currentLocation);
      map.setZoom(15);
    }
  };

  const Reroute = ({ to, children }) => (
    <Link className="reroute" to={to}>
      {children}
    </Link>
  );

  const rentPowerBank = async () => {
    try {
      const data = {
        username: usernameLocalStorage,
        transactionId: generateRandomTransactionId(),
        rentedOnDate: getCurrentTime(),
        duration: 1,
        chargesPerHour: selectedStation.price,
        rentalStatus: "Rented",
        chargingStationId: selectedStation.stationId,
      };
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/rent`, data);
      alert("rent successful!");
      closeInfoWindow();
    } catch (err) {
      console.error(err);
      alert("Rent failed!");
    }

    fetchAllStationsInfo();
  };

  const generateRandomTransactionId = () => {
    const min = 1;
    const max = 999999999;
    const randomTransactionId = Math.floor(
      Math.random() * (max - min + 1) + min
    );

    return randomTransactionId;
  };

  const getCurrentTime = () => {
    const currentDate = new Date();
    const formattedTime = currentDate.toISOString();

    return formattedTime;
  };

  return (
    <div className="home-container">
      <Tabs className="home-tabs" defaultActiveKey="map">
        <Tab eventKey="map" title={<Reroute to="/">Map</Reroute>}></Tab>
        <Tab
          eventKey="rentals"
          title={<Reroute to="/rentals">Rental History</Reroute>}
        ></Tab>
        <Tab
          eventKey="account"
          title={
            token ? (
              <Reroute to="/account">Account</Reroute>
            ) : (
              <Reroute to="/login">Login/Register</Reroute>
            )
          }
        ></Tab>
      </Tabs>

      <img
        src={centerIcon}
        alt="center user on map"
        onClick={centerMapOnUser}
        style={{
          cursor: "pointer",
          width: "30px",
          height: "30px",
        }}
      />

      {isLoaded && allStationsInfo.length !== 0 ? (
        <GoogleMap
          mapContainerStyle={{
            height: "93vh",
            width: "100%",
          }}
          zoom={15}
          center={currentLocation}
          onLoad={(map) => setMap(map)}
        >
          {/* show the location of each charging station on the map */}
          {allStationsInfo.map((station) => (
            <MarkerF
              key={station.stationName}
              position={{ lat: station.latitude, lng: station.longitude }}
              onClick={() => {
                setSelectedStation(station);
                setIsInfoWindowOpen(true);
              }}
              icon={{
                url: chargingStationIcon,
                scaledSize: new window.google.maps.Size(45, 45),
              }}
            />
          ))}

          {/* show the detailed direction info */}
          {selectedStation && directions && isInfoWindowOpen && (
            <InfoWindow
              position={{
                lat: selectedStation.latitude,
                lng: selectedStation.longitude,
              }}
              onCloseClick={closeInfoWindow}
            >
              <div className="infowindow-container">
                <p className="pTag">
                  Location: {directions.routes[0].legs[0].end_address}
                </p>
                <p className="pTag">
                  Distance: {directions.routes[0].legs[0].distance.text}
                </p>
                <p className="pTag">
                  Duration: {directions.routes[0].legs[0].duration.text}
                </p>
                <Form.Group controlId="travelModeSelect">
                  <Form.Label className="pTag">Travel Mode: </Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedTravelMode}
                    onChange={(e) => setSelectedTravelMode(e.target.value)}
                  >
                    <option value="WALKING">Walking</option>
                    <option value="DRIVING">Driving</option>
                    <option value="BICYCLING">Bicycling</option>
                    <option value="TRANSIT">Transit</option>
                  </Form.Control>
                </Form.Group>
                <p className="pTag" id="quantityPTag">
                  Available Power Banks:{" "}
                  <strong>{selectedStation.availablePowerBanks}</strong>
                </p>
                <p className="pTag">
                  Price: <strong>${selectedStation.price}</strong>/hr
                </p>
                <div className="button-container">
                  <Button
                    onClick={() => setIsGettingDirection(true)}
                    id="getDirectionBtn"
                  >
                    Get Direction
                  </Button>
                  {usernameLocalStorage && (
                    <Button onClick={() => rentPowerBank()} id="rentBtn">
                      Rent
                    </Button>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}

          {/* user's current location */}
          {currentLocation && (
            <MarkerF
              position={currentLocation}
              label="You are here!"
              icon={{
                url: curLocationIcon,
                scaledSize: new window.google.maps.Size(45, 45),
              }}
            />
          )}

          {/* show the route to a selected charging station */}
          {directions && isGettingDirection && (
            <DirectionsRenderer directions={directions} />
          )}
        </GoogleMap>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Home;
