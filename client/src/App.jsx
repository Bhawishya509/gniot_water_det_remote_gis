// frontend/src/App.js

import React, { useState, useEffect } from "react";
import PlaceSearch from "./Component/Features/PlaceSearch";
import MapComponent from "./Component/Map/MapComponent ";
import ChartComponent from "./Component/Features/ChartComponent";
import axios from "axios";

const App = () => {
  const [location, setLocation] = useState(null);
  const [waterData, setWaterData] = useState([]);

  useEffect(() => {
    const fetchWaterData = async () => {
      const response = await axios.get("http://localhost:5000/api/water-data");
      setWaterData(response.data);
    };
    fetchWaterData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Surface Water Exploration</h1>
      <PlaceSearch onSelectPlace={(loc) => setLocation([loc.lat, loc.lng])} />
      <MapComponent location={location} />
      <ChartComponent data={waterData} />
    </div>
  );
};

export default App;
