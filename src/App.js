import React, { useEffect, useState } from "react";
import Map from "./Map";
import countries from "./countries";

function translateColorToRGB(color) {
  if (color === "green") {
    return "rgb(198, 245, 155)";
  }
  if (color === "yellow") {
    return "rgb(255, 249, 121)";
  }
  if (color === "green-yellow") {
    return "rgb(235, 247, 167)";
  }
  if (color === "red") {
    return "rgb(245, 155, 155)";
  }
}

function App() {
  const sortedAndFilteredCountries = countries
    .filter(({ color }) => color !== "red")
    .sort((a, b) => a.name.localeCompare(b.name));
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  useEffect(() => {
    for (const country of countries) {
      const countryNode = document.getElementById(country.id);
      countryNode.tabIndex = 1;
      countryNode.style.fill = translateColorToRGB(country.color);
    }
  }, []);
  useEffect(() => {
    if (selectedCountryId) {
      setSelectedCountry(
        countries.filter(({ id }) => id === selectedCountryId)[0]
      );
      document.getElementById(selectedCountryId).focus();
    }
  }, [selectedCountryId]);
  function setCountry(e) {
    let tempNode = e.target;
    try {
      while (tempNode.id.length !== 2) {
        if (tempNode.id === "ocean") return setSelectedCountryId("ocean");
        tempNode = tempNode.parentElement;
      }
      tempNode.focus();
      setSelectedCountryId(tempNode.id);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div>
      <div onClick={setCountry}>
        <Map />
      </div>
      {selectedCountry ? (
        <div className="country-details">{selectedCountry.name}</div>
      ) : (
        ""
      )}
      <div className="countries-list">
        {sortedAndFilteredCountries.map(({ name, id }) => {
          return <p key={id} onClick={() => setSelectedCountryId(id)}>{name}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
