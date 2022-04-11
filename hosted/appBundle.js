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

eval("/* Takes in an error message. Sets the error message up in html, and\r\n   displays it to the user. Will be hidden by other events that could\r\n   end in an error.\r\n*/\nconst handleError = message => {\n  document.getElementById('errorMessage').textContent = message; //document.getElementById('domoMessage').classList.remove('hidden');\n};\n/* Sends post requests to the server using fetch. Will look for various\r\n   entries in the response JSON object, and will handle them appropriately.\r\n*/\n\n\nconst sendPost = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json(); //document.getElementById('domoMessage').classList.add('hidden');\n\n  if (result.error) {\n    handleError(result.error);\n  }\n\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n\n  if (handler) {\n    handler(result);\n  }\n};\n\nconst hideError = () => {//document.getElementById('domoMessage').classList.add('hidden');\n};\n\nmodule.exports = {\n  handleError,\n  sendPost,\n  hideError\n};\n\n//# sourceURL=webpack://Logins/./client/helper.js?");

/***/ }),

/***/ "./client/maker.jsx":
/*!**************************!*\
  !*** ./client/maker.jsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\n\nconst handleClub = e => {\n  e.preventDefault();\n  helper.hideError();\n  const name = e.target.querySelector('#ClubName').value;\n  const latitude = e.target.querySelector('#ClubLatitude').value;\n  const longitude = e.target.querySelector('#ClubLongitude').value;\n  const stadium = e.target.querySelector('#ClubStadium').value;\n  const _csrf = e.target.querySelector('#_csrf').value;\n\n  if (!name || !latitude || !longitude || !stadium) {\n    helper.handleError('All fields are required!');\n    return false;\n  }\n\n  helper.sendPost(e.target.action, {\n    name,\n    latitude,\n    longitude,\n    stadium,\n    _csrf\n  }, loadClubsFromServer);\n  return false;\n};\n\nconst ClubForm = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"ClubForm\",\n    name: \"ClubForm\",\n    onSubmit: handleClub,\n    action: \"/maker\",\n    method: \"POST\",\n    className: \"ClubForm\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"name\"\n  }, \"Name: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"ClubName\",\n    type: \"text\",\n    name: \"name\",\n    placeholder: \"AFC United\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"latitude\"\n  }, \"Latitude: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"ClubLatitude\",\n    type: \"number\",\n    name: \"latitude\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"longitude\"\n  }, \"Longitude: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"ClubLongitude\",\n    type: \"number\",\n    name: \"longitude\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"stadium\"\n  }, \"Stadium Name: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"ClubStadium\",\n    type: \"text\",\n    name: \"name\",\n    placeholder: \"John Polishini Center\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"makeClubSubmit\",\n    type: \"submit\",\n    value: \"Make Club\"\n  }));\n}; //will be replaced in the future once I'm certain information is being displayed properly\n\n\nconst ClubList = props => {\n  if (props.Clubs.length === 0) {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      className: \"ClubList\"\n    }, /*#__PURE__*/React.createElement(\"h3\", {\n      className: \"emptyClub\"\n    }, \"No Clubs Yet!\"));\n  }\n\n  const ClubNodes = props.Clubs.map(Club => {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      key: Club._id,\n      className: \"Club\"\n    }, /*#__PURE__*/React.createElement(\"h3\", {\n      className: \"ClubName\"\n    }, \"Name: \", Club.name, \" \"), /*#__PURE__*/React.createElement(\"h3\", {\n      className: \"ClubLatitude\"\n    }, \"Latitude: \", Club.latitude), /*#__PURE__*/React.createElement(\"h3\", {\n      className: \"ClubLongitude\"\n    }, \"Longitude: \", Club.longitude), /*#__PURE__*/React.createElement(\"h3\", {\n      className: \"ClubStadium\"\n    }, \"Stadium: \", Club.stadium));\n  });\n};\n\nconst loadClubsFromServer = async () => {\n  const response = await fetch('/getClubs');\n  const data = await response.json();\n  ReactDOM.render( /*#__PURE__*/React.createElement(ClubList, {\n    Clubs: data.Clubs\n  }), document.getElementById('Clubs'));\n};\n\nconst init = async () => {\n  const response = await fetch('/getToken');\n  const data = await response.json();\n  ReactDOM.render( /*#__PURE__*/React.createElement(ClubForm, {\n    csrf: data.csrfToken\n  }), document.getElementById('makeClub'));\n  ReactDOM.render( /*#__PURE__*/React.createElement(ClubList, {\n    Clubs: []\n  }), document.getElementById('Clubs'));\n  loadClubsFromServer();\n};\n\nwindow.onload = init;\n\n//# sourceURL=webpack://Logins/./client/maker.jsx?");

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