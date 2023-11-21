import React, { useState, useEffect } from "react";
import "./css/Home.css";
import { Tabs, Tab } from "react-bootstrap";
import {
  GoogleMap,
  MarkerF,
  InfoWindow,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import chargingStationIcon from "./images/charging-station.png";
import curLocationIcon from "./images/cur-location.png";

const Home = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedStationLocation, setSelectedStationLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const defaultLocation = { lat: 40.73061, lng: -73.935242 };
  const home = { lat: 40.691929, lng: -73.97998 };
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
  useEffect(() => {
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

  // call the calc direction function when a charging station
  // is selected
  useEffect(() => {
    if (selectedStationLocation) {
      calculateDirections(currentLocation, selectedStationLocation);
    }
  }, [selectedStationLocation]);

  const calculateDirections = async (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();

    await directionsService.route(
      {
        origin,
        destination,
        travelMode: "DRIVING",
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

  return (
    <div className="home-container">
      <Tabs className="home-tabs" defaultActiveKey="map">
        <Tab eventKey="map" title="Map"></Tab>
        <Tab eventKey="rentals" title="Rentals"></Tab>
        <Tab eventKey="account" title="Account"></Tab>
      </Tabs>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            height: "93vh",
            width: "100%",
          }}
          // for testing purpose DO NOT DELETE
          // zoom={15}
          // center={home}
          zoom={currentLocation ? 15 : 10}
          center={currentLocation || defaultLocation}
          onLoad={(map) => setMap(map)}
        >
          {/* show the location of each charging station on the map */}
          {allChargingStations.map((station) => (
            <MarkerF
              key={station.name}
              position={station.position}
              onClick={() => setSelectedStationLocation(station.position)}
              icon={{
                url: chargingStationIcon,
                scaledSize: new window.google.maps.Size(45, 45),
              }}
            />
          ))}

          {/* show the detailed direction info */}
          {selectedStationLocation && directions && (
            <InfoWindow position={selectedStationLocation}>
              <div>
                <p>Location: {directions.routes[0].legs[0].end_address}</p>
                <p>Distance: {directions.routes[0].legs[0].distance.text}</p>
                <p>Duration: {directions.routes[0].legs[0].duration.text}</p>
                <p>Travel Mode: {directions.request.travelMode}</p>
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

          {/* for testing purpose DO NOT DELETE */}
          {/* {home && (
            <MarkerF
              position={home}
              label="You are here!"
              icon={{
                url: curLocationIcon,
                scaledSize: new window.google.maps.Size(45, 45),
              }}
            />
          )} */}

          {/* show the route to a selected charging station */}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Home;
