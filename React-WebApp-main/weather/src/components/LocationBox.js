import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

// Styling of our website guided by material UI
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 750,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
        // remove paddingTop if dont want scroll
        paddingTop: theme.spacing(0),
        flexGrow: 1,
        fontSize: "1.25rem"
    },
    paper: {
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2)
      },
    item: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
    },
    item_first:{
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(0),
        color: theme.palette.text.secondary
    },
    item_second:{
        padding: theme.spacing(2),
        paddingTop: theme.spacing(0),
        color: theme.palette.text.secondary
    },
    item_third:{
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    item_fourth:{
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(0),
        color: theme.palette.text.secondary
    },
    item_fifth:{
        padding: theme.spacing(2),
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
        color: theme.palette.text.secondary
    },
    item_sixth:{
        padding: theme.spacing(2),
        paddingTop: theme.spacing(0),
        color: theme.palette.text.secondary
    },
    item_location:{
        color: theme.palette.text.primary,
    },
    item_date:{
        color: theme.palette.text.primary,
    },
    item_time:{
        color: theme.palette.text.primary,
        textAlign: "right"
    },
    item_feels:{
        padding: theme.spacing(2),
        paddingTop: theme.spacing(0),
        color: theme.palette.text.secondary
    },
    item_warning:{
        padding: theme.spacing(2),
        paddingTop: theme.spacing(0),
        color: "red"
    },
    item_temperature:{
        fontSize: "3.25rem",
        color: theme.palette.text.primary,
    },
    item_description:{
        color: theme.palette.text.primary,
        paddingTop: theme.spacing(3.5)
    }
  }));


function LocationBox({weather}) {
    
    // Retrieves months, days, etc to display
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        
        return `${day} ${date} ${month} ${year}`;
    }

    const time = new Date().toLocaleTimeString();
  
    // function handle(num){
    //     return num * 1000
    // }
    {/* <div>The weather is {handle(weather.main.temp)}˚F</div> */}

    const classes = useStyles();

    return(
        <div className={classes.root}>
                {/* If the weather.main is not underfined, we will display the weather card */}
                {(typeof weather.main != "undefined") ? (
                    <Paper className={classes.paper} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} container>
                                <Grid item xs={6} className={`${classes.item_first} ${classes.item_location}`}>{weather.name}, {weather.sys.country}</Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={5} className={`${classes.item_first} ${classes.item_time}`}> {time}</Grid>
                            </Grid>
                            {/* ---------------- */}
                            <Grid item xs={12} container>
                                <Grid item className={`${classes.item_second} ${classes.item_date}`}>
                                    {dateBuilder(new Date())}
                                </Grid>
                            </Grid>
                            {/* ---------------- */}
                            <Grid item xs={3} container>
                                <Grid item className={`${classes.item_third} ${classes.item_temperature}`}>
                                    <strong>{Math.round(weather.main.temp)}˚F</strong>
                                </Grid>
                            </Grid>
                            <Grid item xs={5} container>
                                <Grid
                                    direction="column"
                                    container
                                >
                                    <Grid item className={`${classes.item_third} ${classes.item_description}`}>{weather.weather[0].main}</Grid>
                                    <Grid item className={classes.item_feels}>Feels like {weather.main.feels_like}˚F</Grid>
                                    {/* If one of these weather conditions appear, it will trigger a dangerous condition response */}
                                    {(weather.weather[0].main === ("Thunderstorm" || "Fog" || "Sand" || "Dust" || "Ash" || "Tornado")) ?                  
                                        <Grid item container>
                                            <Grid item className={classes.item_warning}>Dangerous conditions!</Grid>
                                        </Grid> 
                                    :('')}
                                </Grid>
                            </Grid>
                            <Grid item xs={4} container>
                                <Grid item className={classes.item}>
                                    <img className="icon" src = {`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} style={{width: 75, height: 75}}></img>
                                </Grid>
                            </Grid>
                            {/* ---------------- */}
                            <Grid item xs={12} container>
                                <Grid item xs={6} className={classes.item_fourth}>High: <span style={{color:"black"}}>{weather.main.temp_max}˚F</span></Grid>
                                <Grid item xs={6} className={classes.item_fourth}>Humidity: <span style={{color:"black"}}>{weather.main.humidity}%</span></Grid>
                            </Grid>
                            <Grid item xs={12} container>
                                <Grid item xs={6} className={classes.item_fifth}>Low: <span style={{color:"black"}}>{weather.main.temp_min}˚F </span></Grid>
                                <Grid item xs={6} className={classes.item_fifth}>Pressure: <span style={{color:"black"}}>{weather.main.pressure} hPa </span></Grid>
                            </Grid>
                            <Grid item xs={12} container>
                                <Grid item xs={6} className={classes.item_sixth}>Wind Speed: <span style={{color:"black"}}>{weather.wind.speed} miles/hr</span></Grid>
                                <Grid item xs={6} className={classes.item_sixth}>Cloudiness: <span style={{color:"black"}}>{weather.clouds.all}%</span></Grid>
                            </Grid>
                        </Grid>
                        
                    </Paper>
                ): ('')}
        </div>
    );
}

export default LocationBox;



