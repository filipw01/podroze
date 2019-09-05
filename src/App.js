import React, { useEffect, useState } from "react";
import Map from "./Map";
import countries from './countries';

function App() {
const [selectedCountryId, setSelectedCountryId] = useState('');
  useEffect(() => {
    for (const country of countries) { 
      const countryNode = document.getElementById(country.id);
      countryNode.classList.add('hover');
      countryNode.addEventListener('click',()=>{
        setSelectedCountryId(country.id);
      })
    }
  }, []);
  const selectedCountry = countries.filter(({id})=>id === selectedCountryId);
  return (
    <div>
      <Map />
      {selectedCountry.name}
    </div>
  );
}

export default App;
