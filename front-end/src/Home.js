import React, { useState, useEffect } from "react";
import "./css/Home.css";
import { Tabs, Tab } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ClickedLocationIcon from "./images/cur-location.png";

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // get user's current location using Geolocation API
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
  }, []);

  const onMapClick = (e) => {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setMarkers([newMarker]);
  };

  return (
    <div className="home-container">
      <Tabs className="home-tabs" defaultActiveKey="map">
        <Tab eventKey="map" title="Map"></Tab>
        <Tab eventKey="rentals" title="Rentals"></Tab>
        <Tab eventKey="account" title="Account"></Tab>
      </Tabs>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        <GoogleMap
          mapContainerStyle={{
            height: "93vh",
            width: "100%",
          }}
          zoom={currentLocation ? 15 : 10}
          center={currentLocation || { lat: 40.73061, lng: -73.935242 }}
          onClick={onMapClick}
        >
          {currentLocation && (
            <Marker position={currentLocation} label="You are here!" />
          )}

          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Home;
