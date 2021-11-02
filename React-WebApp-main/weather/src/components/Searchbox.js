import React from "react";
import {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {state} from '../states.js'
import Scroll from './Scroll'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 750,
        margin: `${theme.spacing(1)}px auto`,
        marginTop: theme.spacing(10),
        padding: theme.spacing(2)
    },
  }));


function Searchbox({api, query, setQuery, setWeather}) {
    let lat;
    let long;
  
    //Accesses the users current location by retrieving the latitude and longitude
    const searchByCurrent = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
          //console.log("Latitude is :", position.coords.latitude);
          lat = position.coords.latitude;
          console.log(lat);
          //console.log("Longitude is :", position.coords.longitude);
          long = position.coords.longitude;
          console.log(long);
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=f4519cec440c722ca8e65e2fcd60e27b`)
            // fetch(`${api.base}forecast?q=${query}&appid=${api.key}`)
            // fetch(`${api.base}weather?zip={query},&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result)
                    setQuery("")
                    console.log(result)
                });
        });
    }

    const [states] = useState([state]);

    const suggestionPanel = document.querySelector('.suggestions')

    const search = evt => {
        if (evt.key === "Enter") {
            // Retrieves the weather data by the zipcode
            if (typeof query === "number"){
                fetch(`${api.base}weather?zip=${query},&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result)
                    setQuery("")
                    console.log(result)
                });
            // Retrieves the weather data by the query
            } else {
                fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result)
                    setQuery("")
                    suggestionPanel.classList.remove('show')
                    console.log(result)
                });
            }
        }
    }

    // used to append the suggestions of what the users typed
    const appendSuggestion = evt => {
        // selects the queries
        const searchBar = document.querySelector('.search-bar')
        const suggestionPanel = document.querySelector('.suggestions')

        suggestionPanel.classList.add('show')
        const input = searchBar.value
        // suggestionPanel get empty everytime
        suggestionPanel.innerHTML=''
        // filters the city
        const filteredQuery = states[0].filter(st => {
            return st.city.toLowerCase().startsWith(input.toLowerCase())
        })

        // creates the suggestions for characters entered
        filteredQuery.forEach(nameOf => {
            const div = document.createElement('div');
            div.innerHTML = nameOf.city
            div.setAttribute('class', 'suggestion')
            suggestionPanel.appendChild(div)
        })

        // if no input, suggestion panel is empty
        if (input === ''){
            suggestionPanel.innerHTML = '';
        }
        
        // when user clicks, set the value to the query
        document.addEventListener('click', evt => {
            if (evt.target.className === "suggestion"){
                searchBar.value = evt.target.innerHTML;
                setQuery(searchBar.value)
                suggestionPanel.classList.remove('show')
            }
        } )
    }

    // FIRST METHOD
    // const searchByClick = evt => {
    //     if (typeof query === "number"){
    //         fetch(`${api.base}weather?zip=${query},&appid=${api.key}`)
    //         .then(res => res.json())
    //         .then(result => {
    //             setWeather(result)
    //             setQuery('')
    //             console.log(result)
    //         });
    //     } else {
    //         fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    //         .then(res => res.json())
    //         .then(result => {
    //             setWeather(result)
    //             setQuery('')
    //             console.log(result)
    //         });
    //     }
    //     const suggestionPanel = document.querySelector('.suggestions')
    //     suggestionPanel.innerHTML='';
    // }

    // FIRST METHOD
    // useEffect(() => {    
    //     const suggestionPanel = document.querySelector('.suggestions')
    //     // suggestionPanel get empty everytime
    //     suggestionPanel.innerHTML=''
    //     const filteredQuery = states[0].filter(st => {
    //         return st.city.toLowerCase().startsWith(query.toLowerCase())
    //     })
        
    //     // console.log(filteredQuery)
    //     filteredQuery.forEach(nm => {
    //         const div = document.createElement('div');
    //         div.innerHTML = nm.city
    //         suggestionPanel.appendChild(div)
    //     })

    //     if (query === ''){
    //         suggestionPanel.innerHTML = '';
    //     }
    // }, [query]);

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <main>
                <div className="search-box">
                    {/* input for search bar */}
                    <input
                        type="text"
                        className="search-bar search-bar1"
                        placeholder="Search by City or Zip Code"
                        onChange={e => setQuery(e.target.value)}
                        onKeyUp = {appendSuggestion}
                        value={query}
                        onKeyPress={search}  
                    />
                    {/* input button for current lcoation */}
                    <input
                        type="button"
                        className="search-bar search-bar2"
                        value="Access my Location"
                        onClick={searchByCurrent}  
                    />
                </div>
                <br></br>
                <Scroll>
                    <div className="suggestions" ></div>
                    {/* FIRST METHOD */}
                    {/* <div className="suggestions" onClick={searchByClick} ></div> */}
                </Scroll> 
            </main>
        </div>
    );
}

export default Searchbox;
