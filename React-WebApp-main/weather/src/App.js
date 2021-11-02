import React from "react";
import Searchbox from "./components/Searchbox.js"
import LocationBox from "./components/LocationBox.js"
import Background from "./weather2.jpg"
import {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    minHeight: '100vh',
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: "cover"
  },
}));

// API key and base URL
const api = {
    key: "f4519cec440c722ca8e65e2fcd60e27b",
    // key:"7f396124ecf2b4afc0dd7251b4e5c22e",
    base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Two main components */}
      <Searchbox api={api} query={query} setQuery={setQuery} setWeather={setWeather} />
      <LocationBox weather={weather}/>
    </div>
  );
}

export default App;
