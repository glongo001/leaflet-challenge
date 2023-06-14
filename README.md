# Leaflet Challenge
I used earthquake data from the United States Geological Survey, or USGS, to create a tool that allows the visualization of earthquake information to better educate the public and other government organizations, and secure more funding for earthquake research and pass new guidelines to prevent earthquake damage.

## Create the Earthquake Visualization
1. First, I saved the url `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson` in order to access data of all earthquakes from the last 7 days. 

2. I created function called `createMap()`:
    - This function used `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` as the tileLayer.
    - I created the map and set the streetmap layer as the base and the earthquake layer as an overlay.
3. I created a function called `createMarkers()`:
    - I changed the markers to circles.
    - I set the earthquake magnitude as the radius of the circle, making circles larger as magnitude increases.
    - I set the fill color based on the getColor() function based on the depth of the earthquake.
    - I bound a pop-up that showed up when a marker was selected. The pop-up listed the place as the title, the magnitude, the latitude, the longitude, and the depth of the earthquake.
4. I created a function called `getColor()`:
    - I set limits for the color of the markers. The markers ranged from lighter to darker as depth of the earthquake increased.
5. I created a function called `createLegend()`:
    - I positioned the legend on the bottom right.
    - I listed the colors used in the `getColor()` function next to the depth range.
6. I used D3 to retrieve data from the url and call the functions.
7. I added the legend on the style.css file.
8. This is the result:

![alt text](https://github.com/glongo001/leaflet-challenge/blob/main/Images/leaflet-map.png)

Source: Used https://leafletjs.com/, https://d3js.org/, previous class assignments and Stack Overflow for reference.
