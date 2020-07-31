import React, {useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core"
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then ((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
            name: country.country, // United States, United Kingdom
            value: country.countryInfo.iso2 // UK, USA, FR
          }));
          setCountries(countries)
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    console.log("Yoooo", countryCode);

    setCountry(countryCode);
    
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select
            variant="outlined"
            onChange={onCountryChange}
            value={country}
          >
            <MenuItem value = "worldwide">Worldwide</MenuItem>
            {
              countries.map(country => (
                <MenuItem value = {country.value}>{country.name}</MenuItem>                
              ))  
            }

          </Select>
        </FormControl>
      </div>

      <div className ="app__stats">  
      {/* Infobox = COVID Cases */}
      {/* Infobox = COVID Recoveries */}
      {/* Infobox */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
      </div>
    </div>
  );
}

export default App;
