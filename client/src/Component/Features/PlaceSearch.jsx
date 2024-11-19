// frontend/src/components/PlaceSearch.js

import React, { useState } from "react";
import axios from "axios";

const PlaceSearch = ({ onSelectPlace }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (input) => {
    if (input.length < 3) return;
    try {
      const response = await axios.get("http://localhost:5000/api/place-autocomplete", {
        params: { input },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSelect = async (suggestion) => {
    setQuery(suggestion.description);
    setSuggestions([]);
    try {
      const response = await axios.get("http://localhost:5000/api/place-details", {
        params: { placeId: suggestion.place_id },
      });
      onSelectPlace(response.data);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        placeholder="Search for a place"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceSearch;
