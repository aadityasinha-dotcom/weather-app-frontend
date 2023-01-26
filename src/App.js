import "./App.css";
import React from "react";
import Map from "./components/Map";
import axios from "axios";
import { useState } from "react";

function App() {

  const [location, setLocation] = useState('');
  const [lat, setLat] = useState(7.8);
  const [long, setLong] = useState(37.2);
  const [temp, setTemp] = useState(15);
  const [position , setPosition] = useState([[21.250000,	81.629997],]);
  
  const [data, setData] =  useState([
      {lat: 21.250000,	lng: 81.629997, label: 'Temp is 18.5'},
      {lat: 16.166700,	lng: 74.833298, label: 'Temp is 5.25'},
      {lat: 26.850000,	lng: 80.949997, label: 'Temp is 15.5'},
      {lat: 28.679079,	lng: 77.069710, label: 'Temp is 25.5'},
      {lat: 14.167040,	lng: 75.040298, label: 'Temp is 13.5'},
	    {lat: 26.540457,	lng: 88.719391, label: 'Temp is 17.5'},
	    {lat: 24.633568,	lng: 87.849251, label: 'Temp is 16.5'},
	    {lat: 28.440554,	lng: 74.493011, label: 'Temp is 15.5'},
	    {lat: 24.882618,	lng: 72.858894, label: 'Temp is 22.5'},
      {lat: 16.779877,	lng: 74.556374, label: 'Temp is 25.5'},
	    {lat: 12.715035,	lng: 77.281296, label: 'Temp is 15.5'},
	    {lat: 13.432515,	lng: 77.727478, label: 'Temp is 25.5'},
	    {lat: 12.651805,	lng: 77.208946, label: 'Temp is 25.5'},
	    {lat: 22.728392,	lng: 71.637077, label: 'Temp is 13.5'},
	    {lat: 9.383452,	  lng: 76.574059, label: 'Temp is 25.5'},
	    {lat: 14.623801,	lng: 75.621788, label: 'Temp is 16.5'},
	    {lat: 10.925440,	lng: 79.838005, label: 'Temp is 25.5'},
	    {lat: 15.852792,	lng: 74.498703, label: 'Temp is 25.5'},
	    {lat: 19.354979,	lng: 84.986732, label: 'Temp is 25.5'},
	    {lat: 23.905445,	lng: 87.524620, label: 'Temp is 25.5'},
	    {lat: 20.296059,	lng: 85.824539, label: 'Temp is 25.5'},
	    {lat: 21.105001,	lng: 71.771645, label: 'Temp is 25.5'},
	    {lat: 30.172716,	lng: 77.299492, label: 'Temp is 14.5'},
  	  {lat: 25.477585,	lng: 85.709091, label: 'Temp is 25.5'},
      {lat: 12.120000,  lng: 76.680000, label: 'Temp is 25.5'},
      {lat: 24.879999,  lng: 74.629997, label: 'Temp is 25.5'},
      {lat: 19.076090,	lng: 72.877426, label: 'Temp is 17.5'},
      {lat: 16.994444,  lng: 73.300003, label: 'Temp is 25.5'},
      {lat: 19.155001,  lng: 72.849998, label: 'Temp is 25.5'},
      {lat: 24.794500,  lng: 73.055000, label: 'Temp is 25.5'},
  ]);

  const [zoom, setZoom] = useState(5);

  const updateLabel = (lat, newLabel) => {
    const updatedData = data.map(marker => {
      if (marker.lat === lat) {
        return { ...marker, label: "Temp is " + newLabel };
      }
      return marker;
    });
    setData(updatedData);
  };

  const addToArray = (newValue) => {
    setPosition([...position, newValue]);
  }

  const handleChange = (event) => {
     setLocation(event.target.value);
  }

  const getLocation = async(term) => {
    axios.get("http://localhost:3001/api/location", {
      params: {
        location: term,
      },
    }).then(response => {
        setLat(response.data.location.latitude[0]);
        setLong(response.data.location.longitude[0]);
        changeLocation();
    }).catch(error => {
        console.error(error);
    })
  };

  const getWeather = async(lat, lon) => {
    axios.get("http://localhost:3001/api/weather", {
      params: {
        lat: lat,
        lon: lon,
      },
    }).then(response => {
        // do something
        updateLabel(lat, response.data.data[0].temp);
        console.log(response.data.data[0].temp);
    }).catch(error => {
        console.log(error);
    })
  };

  const onTermSubmit = async(term) => {
    axios.get("http://localhost:3001/api/weather_by_location", {
      params: {
        location: term,
      },
    }).then(response => {
        // do something
    }).catch(error => {
        console.log(error);
    })
  };

  const changeLocation = () => {
    setPosition([lat, long]);
  };

  
    return (
      <div>
        <div className="ui container">
          <h2 className="ui center aligned icon header">
            <i class="map icon"></i>
            Weather Map
          </h2>
          <div className="ui grid">
            <div className="ui row">
              <Map key={data} data={data} zoom={zoom} temperature={temp}/>
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default App;
