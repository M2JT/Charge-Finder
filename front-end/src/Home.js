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

const Home = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });
  const usernameLocalStorage = localStorage.getItem("username");
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedStationLocation, setSelectedStationLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [isGettingDirection, setIsGettingDirection] = useState(false);
  const [selectedTravelMode, setSelectedTravelMode] = useState("DRIVING");
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const defaultLocation = { lat: 40.73061, lng: -73.935242 };
  const homeLocation = { lat: 40.691929, lng: -73.97998 };
  const allChargingStations = [
    { name: "school", position: { lat: 40.694292, lng: -73.985205 } },
    { name: "random place", position: { lat: 40.6933639, lng: -73.9704101 } },
    { name: "bobst lib", position: { lat: 40.7294287, lng: -73.9972178 } },
    { name: "machi machi", position: { lat: 40.7479431, lng: -73.987102 } },
    {
      name: "flatiron building",
      position: { lat: 40.7410592, lng: -73.9896416 },
    },
  ];

  // get user's current location using Geolocation API
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCurrentLocation({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         console.error("Error getting current location:", error);
  //       }
  //     );
  //   }
  // }, []);

  // call the calc direction function when a charging station
  // is selected
  // useEffect(() => {
  //   if (selectedStationLocation) {
  //     calculateDirections(currentLocation, selectedStationLocation);
  //     setIsGettingDirection(false);
  //   }
  // }, [selectedStationLocation, selectedTravelMode]);

  // for testing purpose DO NOT DELETE
  useEffect(() => {
    if (selectedStationLocation) {
      calculateDirections(homeLocation, selectedStationLocation);
      setIsGettingDirection(false);
    }
  }, [selectedStationLocation, selectedTravelMode]);

  const calculateDirections = async (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();

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

  // const centerMapOnUser = () => {
  //   if (currentLocation && map) {
  //     map.panTo(currentLocation);
  //     map.setZoom(15);
  //   }
  // };

  // for testing DO NOT DELETE
  const centerMapOnUser = () => {
    if (homeLocation && map) {
      map.panTo(homeLocation);
      map.setZoom(15);
    }
  };

  const Reroute = ({ to, children }) => (
    <Link className="reroute" to={to}>
      {children}
    </Link>
  );

  return (
    <div className="home-container">
      <Tabs className="home-tabs" defaultActiveKey="map">
        <Tab eventKey="map" title={<Reroute to="/">Map</Reroute>}></Tab>
        <Tab eventKey="rentals" title="Rentals"></Tab>
        <Tab
          eventKey="account"
          title={usernameLocalStorage ? (
            <Reroute to="/account">Account</Reroute>
          ) : (
            <Reroute to="/login">Login/Register</Reroute>
          )}
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

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            height: "93vh",
            width: "100%",
          }}
          // for testing purpose DO NOT DELETE
          zoom={15}
          center={homeLocation}
          // zoom={currentLocation ? 15 : 10}
          // center={currentLocation || defaultLocation}
          onLoad={(map) => setMap(map)}
        >
          {/* show the location of each charging station on the map */}
          {allChargingStations.map((station) => (
            <MarkerF
              key={station.name}
              position={station.position}
              onClick={() => {
                setSelectedStationLocation(station.position);
                setIsInfoWindowOpen(true);
              }}
              icon={{
                url: chargingStationIcon,
                scaledSize: new window.google.maps.Size(45, 45),
              }}
            />
          ))}

          {/* show the detailed direction info */}
          {selectedStationLocation && directions && isInfoWindowOpen && (
            <InfoWindow
              position={selectedStationLocation}
              onCloseClick={closeInfoWindow}
            >
              <div>
                <p>Location: {directions.routes[0].legs[0].end_address}</p>
                <p>Distance: {directions.routes[0].legs[0].distance.text}</p>
                <p>Duration: {directions.routes[0].legs[0].duration.text}</p>
                <Form.Group controlId="travelModeSelect">
                  <Form.Label>Travel Mode: </Form.Label>
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
                <Button
                  onClick={() => setIsGettingDirection(true)}
                  id="getDirectionBtn"
                >
                  get direction
                </Button>
              </div>
            </InfoWindow>
          )}

          {/* user's current location */}
          {/* {currentLocation && (
            <MarkerF
              position={currentLocation}
              label="You are here!"
              icon={{
                url: curLocationIcon,
                scaledSize: new window.google.maps.Size(45, 45),
              }}
            />
          )} */}

          {/* for testing purpose DO NOT DELETE */}
          {homeLocation && (
            <MarkerF
              position={homeLocation}
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
