/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/helper.js":
/*!**************************!*\
  !*** ./client/helper.js ***!
  \**************************/
/***/ ((module) => {

eval("/* Takes in an error message. Sets the error message up in html, and\r\n   displays it to the user. Will be hidden by other events that could\r\n   end in an error.\r\n*/\nconst handleError = message => {//document.getElementById('errorMessage').textContent = message;\n  //document.getElementById('domoMessage').classList.remove('hidden');\n};\n/* Sends post requests to the server using fetch. Will look for various\r\n   entries in the response JSON object, and will handle them appropriately.\r\n*/\n\n\nconst sendPost = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json(); //document.getElementById('domoMessage').classList.add('hidden');\n\n  if (result.error) {\n    handleError(result.error);\n    console.log(result.error);\n  }\n\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n\n  if (handler) {\n    handler(result);\n  }\n};\n\nconst hideError = () => {//document.getElementById('domoMessage').classList.add('hidden');\n};\n\nmodule.exports = {\n  handleError,\n  sendPost,\n  hideError\n};\n\n//# sourceURL=webpack://Logins/./client/helper.js?");

/***/ }),

/***/ "./client/maker.jsx":
/*!**************************!*\
  !*** ./client/maker.jsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\n\nconst handleClub = e => {\n  e.preventDefault();\n  helper.hideError();\n  const name = e.target.querySelector('#ClubName').value;\n  const latitude = e.target.querySelector('#ClubLatitude').value;\n  const longitude = e.target.querySelector('#ClubLongitude').value;\n  const stadium = e.target.querySelector('#ClubStadium').value;\n  const _csrf = e.target.querySelector('#_csrf').value;\n\n  if (!name || !latitude || !longitude || !stadium) {\n    helper.handleError('All fields are required!');\n    return false;\n  }\n\n  helper.sendPost(e.target.action, {\n    name,\n    latitude,\n    longitude,\n    stadium,\n    _csrf\n  }, loadClubsFromServer);\n  return false;\n};\n\nconst ClubForm = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"ClubForm\",\n    name: \"ClubForm\",\n    onSubmit: handleClub,\n    action: \"/maker\",\n    method: \"POST\",\n    className: \"ClubForm\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"name\"\n  }, \"Name: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"ClubName\",\n    type: \"text\",\n    name: \"name\",\n    placeholder: \"AFC United\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"latitude\"\n  }, \"Latitude: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"ClubLatitude\",\n    type: \"number\",\n    name: \"latitude\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"longitude\"\n  }, \"Longitude: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"ClubLongitude\",\n    type: \"number\",\n    name: \"longitude\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"stadium\"\n  }, \"Stadium Name: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"ClubStadium\",\n    type: \"text\",\n    name: \"name\",\n    placeholder: \"John Polishini Center\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"makeClubSubmit\",\n    type: \"submit\",\n    value: \"Make Club\"\n  }));\n};\n\nconst ClubList = props => {}; //will be replaced in the future once I'm certain information is being displayed properly\n\n/*\r\nconst ClubList = (props) => {\r\n    if(props.Clubs.length === 0){\r\n        return(\r\n            <div className = \"ClubList\">\r\n                <h3 className=\"emptyClub\">No Clubs Yet!</h3>\r\n            </div>\r\n        );\r\n    }\r\n\r\n    const ClubNodes = props.Clubs.map(Club => {\r\n        return (\r\n            <div key = {Club._id} className = \"Club\">\r\n                <h3 className = \"ClubName\">Name: {Club.name} </h3>\r\n                <h3 className = \"ClubLatitude\">Latitude: {Club.location.coordinates[1]}</h3>\r\n                <h3 className = \"ClubLongitude\">Longitude: {Club.location.coordinates[0]}</h3>\r\n                <h3 className = \"ClubStadium\">Stadium: {Club.stadium}</h3>\r\n            </div>\r\n            \r\n        );\r\n    });\r\n\r\n    return (\r\n        <div>\r\n            {ClubNodes}\r\n        </div>\r\n    );\r\n}\r\n*/\n\n\nconst loadClubsFromServer = async () => {\n  const response = await fetch('/getClubs');\n  const data = await response.json();\n  ReactDOM.render( /*#__PURE__*/React.createElement(ClubList, {\n    Clubs: data.Clubs\n  }), document.getElementById('Clubs'));\n}; //all the functions between here and init are placeholders from a previous project I maded a few semesters ago.\n//these will be here to make sure the map and club markers work as intended and will be refactored, moved elsewhere,\n//or removed once that is done\n\n\nconst initMap = () => {\n  const geojson = {\n    type: 'FeatureCollection',\n    features: []\n  }; //will most likely be moved to config var in final version\n\n  mapboxgl.accessToken = 'pk.eyJ1Ijoid3NhODczNyIsImEiOiJja2hmOGI1YjIwanpjMnBveHdwbWZicnVoIn0.wxTIYZj7IkkXy-BwDUmuBw';\n  const map = new mapboxgl.Map({\n    container: 'map',\n    style: 'mapbox://styles/mapbox/light-v10',\n    center: [-.1911, 51.4816],\n    //Chelsea FC's physical location\n    zoom: 15.5\n  });\n  map.on('load', function () {\n    const layers = map.getStyle().layers;\n    let labelLayerId;\n\n    for (let i = 0; i < layers.length; i++) {\n      if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {\n        labelLayerId = layers[i].id;\n        break;\n      }\n    }\n\n    map.addLayer({\n      'id': '3d-buildings',\n      'source': 'composite',\n      'source-layer': 'building',\n      'filter': ['==', 'extrude', 'true'],\n      'type': 'fill-extrusion',\n      'minzoom': 15,\n      'paint': {\n        'fill-extrusion-color': '#aaa',\n        // use an 'interpolate' expression to add a smooth transition effect to the\n        // buildings as the user zooms in\n        'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],\n        'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],\n        'fill-extrusion-opacity': 0.6\n      }\n    });\n  });\n};\n\nconst loadMarkers = () => {\n  const teamLocations = [{\n    latitude: -.1911,\n    longitude: 51.4816,\n    title: \"Chelsea\",\n    description: \"English Premier League\"\n  }]; // now convert this data to GeoJSON\n\n  for (let team of teamLocations) {\n    //an \"empty\" GEOJSON feature\n    const newFeature = {\n      type: 'Feature',\n      geometry: {\n        type: 'Point',\n        coordinates: []\n      },\n      properties: {\n        title: \"\",\n        description: ''\n      }\n    }; //add some properties for the current sports team\n\n    newFeature.geometry.coordinates[0] = team.latitude;\n    newFeature.geometry.coordinates[1] = team.longitude;\n    newFeature.properties.title = team.title;\n    newFeature.properties.description = team.description; //push it onto the 'geojson' array\n\n    geojson.features.push(newFeature);\n  } //console.log(geojson.features);\n\n};\n\nconst addMarker = (coordinates, title, description, className) => {\n  // create a HTML element for each feature\n  const el = document.createElement('div');\n  el.className = className;\n  new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(new mapboxgl.Popup({\n    offset: 25\n  }) //add popups\n  .setHTML('<h3>' + title + '</h3><p>' + description + '</p>')).addTo(map);\n};\n\nconst addMarkersToMap = () => {\n  for (let feature of geojson.features) {\n    addMarker(feature.geometry.coordinates, feature.properties.title, feature.properties.description, 'marker');\n  }\n};\n/* Functions from previous project that control map movement\r\nCurrently only here as reference, will be refactored in future update\r\n\r\n//Functions controling the center, zoom level, and perspective of the map. Values passed in are default \r\n//if nothing is passed in from function calls\r\nconst flyTo = (center = [0,0]) =>{\r\n\t//https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto\r\n\tmap.flyTo({center: center});\r\n}\r\n\r\nfunction setZoomLevel(value = 0)\r\n{\r\n\t//https://docs.mapbox.com/help/glossary/zoom-level/\r\n\tmap.setZoom(value);\r\n}\r\n\r\nfunction setPitchAndBearing(pitch = 0, bearing = 0)\r\n{\r\n\t//https://docs.mapbox.com/mapbox-gl-js/example/live-update-feature/\r\n\t//https://docs.mapbox.com/mapbox-gl-js/example/set-perspective/\r\n\tmap.setPitch(pitch);\r\n\tmap.setBearing(bearing);\r\n}\r\n*/\n\n\nconst init = async () => {\n  const response = await fetch('/getToken');\n  const data = await response.json();\n  ReactDOM.render( /*#__PURE__*/React.createElement(ClubForm, {\n    csrf: data.csrfToken\n  }), document.getElementById('makeClub'));\n  ReactDOM.render( /*#__PURE__*/React.createElement(ClubList, {\n    Clubs: []\n  }), document.getElementById('Clubs'));\n  loadClubsFromServer();\n  initMap();\n  loadMarkers();\n};\n\nwindow.onload = init;\n\n//# sourceURL=webpack://Logins/./client/maker.jsx?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/maker.jsx");
/******/ 	
/******/ })()
;