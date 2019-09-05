import React, { useEffect, useState } from "react";
import Map from "./Map";
import countries from "./countries";

function translateColorToRGB(color){
  if(color==="green"){
    return "rgb(198, 245, 155)"
  }
  if(color==="yellow"){
    return "rgb(255, 249, 121)"
  }
  if(color==="green-yellow"){
    return "rgb(235, 247, 167)"
  }
  if(color==="red"){
    return "rgb(245, 155, 155)"
  }
}

function App() {
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  useEffect(() => {
    for (const country of countries) {
      const countryNode = document.getElementById(country.id);
      countryNode.style.fill = translateColorToRGB(country.color);
      countryNode.addEventListener("click", () => {
        setSelectedCountryId(country.id);
      });
    }
  }, []);
  useEffect(() => {
    if (selectedCountryId) {
      setSelectedCountry(
        countries.filter(({ id }) => id === selectedCountryId)[0]
      );
    }
  }, [selectedCountryId]);
  console.log(selectedCountry);
  return (
    <div>
      <Map />
      {selectedCountry ? <div>{selectedCountry.name}</div> : ""}
    </div>
  );
}

export default App;
