Readme Document for INF 133 Final Project
Authors: Ryan La (10601017, lar1@uci.edu), Nathaniel Pham (14787324, thiendp@uci.edu), Tyler Matsunami (45316796, tkmatsun@uci.edu)

*******************************************************************************
A better formatted readme is also included in our submission
Please check readme.pdf for more detailed run instructions (images included).
Thank you!
*******************************************************************************

Project: React JS-based weather app

Run instructions:
To run the project first open the React-WebApp directory and navigate to the weather folder. In the command line, run npm start to get the project started.


Some precautions:
It takes a few seconds for the "Current Location" button to work its magic. Please be patient with it. 
After selecting a location from the autocomplete suggestions, the user will need to click within the search bar again and hit the "Enter" key in order to get the weather.

API used:
https://openweathermap.org/api
(limited to 60calls/min, and 1000000 calls/month)

Languages: HTML, CSS, Javascript, React Javascript Framework, Material-UI: React UI Framework

Project requirements:
1. Add a search bar that will prompt for the city name/ ZIP code and suggest possible locations or suggestions.
    - Works as intended. The user will be able to input a city and select from the following autocomplete options or input a ZIP code. After selecting a location from the autocomplete suggestions, the user will need to click within the search bar again and hit the ÅgEnterÅh key in order to get the weather.
2. Within the search bar, users will be able to input a location name or ZIP code and the website will display the weather for their location. The ZIP code only works for locations in the US, but text-based location search works worldwide.
    -  Both the city and zip code functions work as intended. To add on, we even manage to make zipcode work internationally.
3. The website will display the weather report for the current day, week, or month, or get the forecast for the coming day/week.
    - Our weather application displays the current day's temperature (highs and lows), wind speed, humidity, pressure and cloudiness. We were limited to single day weather forecasts because more extensive forecasting data was put behind a paywall.
4. The user will be able to display the weather in Fahrenheit or Celsius.
    - Currently only works for Fahrenheit.
5. Users can also have the weather presented as a map for the location they choose. 
    - This requirement was not completed because the original API we intended to use was locked behind a paywall. Our team changed APIs out of necessity, but the one we switched to does not support the mapping function.
6. The weather report will be able to indicate additional information such as the sunrise/set, moonrise/set, humidity, air pressure, wind speed, visibility, and air quality. Once the user gets the results for a certain location, they will be alerted if the air quality for the location is unhealthy.
    - As mentioned above, all available weather information from the API is displayed after the user searches (or presses the local weather button). Hazardous weather conditions are reported if applicable.
7. The website will be able to detect the location of the user and present weather data for that location.
    - Instead of automatically detecting the user location, our team implemented a button that will ask user permission for his or her location. After the user approves, his/her local weather data is displayed.
      The current location weather takes a few seconds to appear after clicking the button.

Project details:
1. How long, in hours, did it take you to complete this assignment?
20+ hours. We worked on the project over the course of several weeks.

2. What online resources did you consult when completing this assignment? (list specific URLs)
The openweathermap API documentation:
 https://openweathermap.org/current

React JS documentation: 
https://reactjs.org/docs/getting-started.html
https://reactjs.org/docs/hooks-intro.html
https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs

Mozilla web developer documentation: 
https://developer.mozilla.org/en-US/docs/Web/API

Stack Overflow:
https://www.stackoverflow.com/
https://stackoverflow.com/questions/64850959/while-trying-to-fetch-data-i-get-unhandled-rejection-typeerror-undefined-is

Navigator:
https://heartbeat.fritz.ai/how-to-use-the-geolocation-api-in-a-react-native-app-b5e611b00a0c

Material UI:
https://material-ui.com/

3. Did you design your app with a particular type of user in mind? If so, whom?
We designed this weather application with the average computer user in mind. The interface was designed to be clean and easily 
understandable even by the average person.



Lessons Learned:
During this quarter, we learned about many different languages such as HTML, CSS, Javascript etc. For this project, we wanted to implement 
everything we learned. 

1. We utilized the Javascript React library to build our user interface components.

2. We incorporated Node.js using NPM (npm start).

3. We worked with changing DOM and event listeners throughout our implementation of the app.

4. This course was one of the first times we were exposed in great detail to using APIs, and we 
   incorporated our knowledge of fetching responses from the APIs, and using promises to work with them.

5. For future reference, our team will be more mindful of the APIs we choose to work with. On the project requirements, 
   we specified that we were going to implement a map feature. Upon closer inspection however, we found that the only API 
   that provides that service charges a fee.

6. One of our main focuses when designing the app was responsiveness. We tried to ensure that all the functionalities of the
   app remain responsive under all foreseeable circumstances, and respond as intended in the requirements.

7. A primary goal for the project was accessibility and ease of use. We learned through the course of this class that different
   users have varying needs and capabilities, and we tried to cater to that and incorporate an accessible design that can be used by a basic, average user with ease.
8. Overall, throughout the implementation of the app and our work towards realizing it, we paid as much attention as possible
   towards the needs of our clients and users. We tried to emphasize the underlying reason we built this app - the fact that we care about its users.