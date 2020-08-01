import React, {useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core"

import InfoBox from './InfoBox'
import Map from './Map'
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});

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
    setCountry(countryCode);

    // https://disease.sh/v3/covid-19/all
    // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]

    const url = 
    countryCode === 'worldwide' 
      ? 'https://disease.sh/v3/covid-19/all' 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);

      //All the data from the country response.
      setCountryInfo(data);    
    })
  };

  return (
    <div className="app">
      <div className="app__left">
        
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
          <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>
          <InfoBox title="Recovered" cases={1234} total={3000}/>
          <InfoBox title="Deaths" cases={1235} total={4000}/>
        </div>

        {/* Infobox = COVID Cases */}
        {/* Infobox = COVID Recoveries */}
        {/* Infobox */}

        {/* Map */}
        <Map />
      </div>
      
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by country</h3>
          {/* Table */}
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
