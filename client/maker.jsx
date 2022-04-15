const helper = require('./helper.js');

const handleClub = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#ClubName').value;
    const latitude = e.target.querySelector('#ClubLatitude').value;
    const longitude = e.target.querySelector('#ClubLongitude').value;
    const stadium = e.target.querySelector('#ClubStadium').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!name || !latitude || !longitude || !stadium){
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, latitude, longitude, stadium, _csrf}, loadClubsFromServer);

    return false;
}

const ClubForm = (props) => {
    return (
        <form id = "ClubForm"
            name = "ClubForm"
            onSubmit = {handleClub}
            action = "/maker"
            method = "POST"
            className= "ClubForm"
        >
            <label htmlFor = "name">Name: </label>
            <input id = "ClubName" type = "text" name = "name" placeholder= "AFC United"/>
            <label htmlFor = "latitude">Latitude: </label>
            <input id = "ClubLatitude" type = "number" name= "latitude"/>
            <label htmlFor = "longitude">Longitude: </label>
            <input id = "ClubLongitude" type = "number" name= "longitude"/>
            <label htmlFor = "stadium">Stadium Name: </label>
            <input id = "ClubStadium" type = "text" name = "name" placeholder= "John Polishini Center"/>
            <input id = "_csrf" type = "hidden" name = "_csrf" value = {props.csrf} />
            <input className="makeClubSubmit" type = "submit" value = "Make Club" />
        </form>


    );
};



const ClubList = (props) => {

}
//will be replaced in the future once I'm certain information is being displayed properly
/*
const ClubList = (props) => {
    if(props.Clubs.length === 0){
        return(
            <div className = "ClubList">
                <h3 className="emptyClub">No Clubs Yet!</h3>
            </div>
        );
    }

    const ClubNodes = props.Clubs.map(Club => {
        return (
            <div key = {Club._id} className = "Club">
                <h3 className = "ClubName">Name: {Club.name} </h3>
                <h3 className = "ClubLatitude">Latitude: {Club.location.coordinates[1]}</h3>
                <h3 className = "ClubLongitude">Longitude: {Club.location.coordinates[0]}</h3>
                <h3 className = "ClubStadium">Stadium: {Club.stadium}</h3>
            </div>
            
        );
    });

    return (
        <div>
            {ClubNodes}
        </div>
    );
}
*/

const loadClubsFromServer = async () => {
    const response = await fetch('/getClubs');
    const data = await response.json();
    ReactDOM.render(
    <ClubList Clubs = {data.Clubs} />,
        document.getElementById('Clubs')
    );
}

//all the functions between here and init are placeholders from a previous project I maded a few semesters ago.
//these will be here to make sure the map and club markers work as intended and will be refactored, moved elsewhere,
//or removed once that is done
const initMap = () => {

    const geojson = {
        type: 'FeatureCollection',
        features: [],
    };

    //will most likely be moved to config var in final version
    mapboxgl.accessToken = 'pk.eyJ1Ijoid3NhODczNyIsImEiOiJja2hmOGI1YjIwanpjMnBveHdwbWZicnVoIn0.wxTIYZj7IkkXy-BwDUmuBw';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-.1911,51.4816], //Chelsea FC's physical location
		zoom: 15.5,
    });

    map.on('load', function(){
        const layers = map.getStyle().layers;

        let labelLayerId;
        for(let i = 0; i < layers.length; i++){
            if(layers[i].type === 'symbol' && layers[i].layout['text-field']){
                labelLayerId = layers[i].id;
                break;
            }
        }

        map.addLayer({
            'id': '3d-buildings',
			'source': 'composite',
			'source-layer': 'building',
			'filter': ['==', 'extrude', 'true'],
			'type': 'fill-extrusion',
			'minzoom': 15,
			'paint': {
			'fill-extrusion-color': '#aaa',
		 
			// use an 'interpolate' expression to add a smooth transition effect to the
			// buildings as the user zooms in
			'fill-extrusion-height': [
			'interpolate',
			['linear'],
			['zoom'],
			15,
			0,
			15.05,
			['get', 'height']
		],
			'fill-extrusion-base': [
			'interpolate',
			['linear'],
			['zoom'],
			15,
			0,
			15.05,
			['get', 'min_height']
		],
			'fill-extrusion-opacity': 0.6
			}
        });
    })
}

const loadMarkers = () =>{
    const teamLocations = [
        {
            latitude:-.1911,
			longitude:51.4816,
			title: "Chelsea",
			description: "English Premier League"
        },
    ]

    // now convert this data to GeoJSON
	for (let team of teamLocations)
	{
		//an "empty" GEOJSON feature
		const newFeature =
		{
			type: 'Feature',
			geometry:
			{
				type: 'Point',
				coordinates: []
			},
			properties:
			{
				title: "",
				description: ''
			}
		};
		
		//add some properties for the current sports team
		newFeature.geometry.coordinates[0] = team.latitude;
		newFeature.geometry.coordinates[1] = team.longitude;
		newFeature.properties.title = team.title;
		newFeature.properties.description = team.description;
		
		//push it onto the 'geojson' array
		geojson.features.push(newFeature);
	}
	//console.log(geojson.features);
}

const addMarker =(coordinates, title, description, className) =>{
	// create a HTML element for each feature
	const el = document.createElement('div');
	el.className = className;

	new mapboxgl.Marker(el)
		.setLngLat(coordinates)
		.setPopup(new mapboxgl.Popup({ offset: 25}) //add popups
		.setHTML('<h3>' + title + '</h3><p>' + description + '</p>'))
		.addTo(map);
}

const addMarkersToMap = () =>{
	for (let feature of geojson.features)
	{
		addMarker(feature.geometry.coordinates, feature.properties.title, feature.properties.description, 'marker');
	}
}

/* Functions from previous project that control map movement
Currently only here as reference, will be refactored in future update

//Functions controling the center, zoom level, and perspective of the map. Values passed in are default 
//if nothing is passed in from function calls
const flyTo = (center = [0,0]) =>{
	//https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto
	map.flyTo({center: center});
}

function setZoomLevel(value = 0)
{
	//https://docs.mapbox.com/help/glossary/zoom-level/
	map.setZoom(value);
}

function setPitchAndBearing(pitch = 0, bearing = 0)
{
	//https://docs.mapbox.com/mapbox-gl-js/example/live-update-feature/
	//https://docs.mapbox.com/mapbox-gl-js/example/set-perspective/
	map.setPitch(pitch);
	map.setBearing(bearing);
}
*/
const init = async () => {
    const response = await fetch ('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <ClubForm csrf = {data.csrfToken} />,
        document.getElementById('makeClub'),
    );

    ReactDOM.render(
        <ClubList Clubs = {[]} />,
        document.getElementById('Clubs')
    );
    loadClubsFromServer();
    initMap();
    loadMarkers();
}

window.onload = init;