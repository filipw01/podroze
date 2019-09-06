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
    if (selectedCountryId && selectedCountryId !== "ocean") {
      const ourCountryProperties = countries.filter(
        ({ id }) => id === selectedCountryId
      )[0];

      document.getElementById(selectedCountryId).focus();
      fetch(`https://restcountries.eu/rest/v2/alpha/${selectedCountryId}`)
        .then(res => res.json())
        .then(
          ({
            capital,
            population,
            timezones,
            topLevelDomain,
            languages,
            currencies,
            area,
            name
          }) => {
            const newCountryProperties = {
              capital,
              population,
              timezones: timezones ? timezones.join(", ") : "",
              topLevelDomain,
              languages: languages
                ? languages.map(language => language.name)
                : "",
              currencies,
              area,
              name
            };
            setSelectedCountry({
              ...newCountryProperties,
              ...ourCountryProperties
            });
          }
        );
    } else {
      setSelectedCountry(null);
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
        <div className="country-details">
          <p>
            {selectedCountry.name} - {selectedCountry.color || "red"}
          </p>
          <p>{selectedCountry.info}</p>
          <p>
            Powierzchnia: {selectedCountry.area} km<sup>2</sup>
          </p>
          <p>Stolica: {selectedCountry.capital}</p>
          <p>Populacja: {selectedCountry.population} ludzi</p>
          <p>Strefy czasowe: {selectedCountry.timezones}</p>
          <p>Domena: {selectedCountry.topLevelDomain}</p>
          <p>Języki: {selectedCountry.languages}</p>
          <p>
            {selectedCountry.currencies
              ? selectedCountry.currencies.map(currency => {
                  return (
                    <span key={currency.code}>
                      {currency.code} - {currency.code} - {currency.symbol}
                    </span>
                  );
                })
              : ""}
          </p>
        </div>
      ) : (
        ""
      )}
      <div className="countries-list">
        {sortedAndFilteredCountries.map(({ name, id }) => {
          return (
            <p key={id} onClick={() => setSelectedCountryId(id)}>
              {name}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default App;
