import React, { useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import "./App.css";

const App = (props) => {
  console.log("props->", props.google);
  const [coord, setCoord] = useState({
    lat: -32.892593193276035,
    lng: -68.8490681956871,
  });

  const [inputs, setInputs] = useState({ from: "", to: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const [markers, setMarkers] = useState([]);

  const handleInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };
  //TODO: MOUNT pero con extra data
  const handleMapReady = (mapProps, map) => {
    console.log("Mapa listo: ", map);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const geocoder = new props.google.maps.Geocoder(); // geocoder { } -> marca
    setMarkers([]); // upDate de los marcadores
    for (const key in inputs) {
      if (inputs[key].length > 0) {
        geocoder.geocode({ address: inputs[key] }, (results, status) => {
          if (status === "OK" && results[0]) {
            const { lat, lng } = results[0].geometry.location;
            const newMaker = {
              name: inputs[key],
              position: { lat: lat(), lng: lng() },
              description: "Holis",
            };
            setMarkers((prevMak) => [...prevMak, newMaker]);
            setInputs({ from: "", to: "" });
            setErrorMessage("");
          } else {
            setErrorMessage("ubicación no encontrada");
          }
        });
      }
    }
  };
  const selectMarker = (marker)=>{
    
  }
  return (
    console.log("markers ", markers),
    (
      <div className="container">
        <h1>Mapa Interactivo</h1>
        <form onSubmit={handleSubmit}>
          <label>From: </label>
          <input
            key="from"
            type="text"
            name="from"
            value={inputs.from}
            onChange={handleInputs}
          ></input>
          <label>To: </label>
          <input
            key="to"
            type="text"
            name="to"
            value={inputs.to}
            onChange={handleInputs}
          ></input>
          <button type="submit">Search</button>
        </form>
        <div className="map_container">
          <Map
            google={props.google}
            zoom={14}
            style={{
              width: "98%",
              height: "400px",
              borderRadius: "4px",
              border: "2px solid #333",
            }}
            initialCenter={{ lat: coord.lat, lng: coord.lng }}
            onReady={handleMapReady}
          >
            {markers?.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  title={marker.name}
                  name={marker.name}
                  position={marker.position}
                  draggable={true}
                  onClick={()=> selectMarker(marker)}
                ></Marker>
              );
            })}
          </Map>
        </div>
      </div>
    )
  );
};

import API_KEY from "./utils/api_key";
export default GoogleApiWrapper({
  apiKey: API_KEY,
})(App);
