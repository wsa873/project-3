const helper = require('./helper.js');

const handleClub = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#ClubName').value;
    const latitude = e.target.querySelector('#ClubLatitude').value;
    const longitude = e.target.querySelector('#ClubLongitude').value;
    const stadium = e.target.querySelector('#ClubStadium').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!name || !age || !color){
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

//will be replaced in the future once I'm certain information is being displayed properly
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
                <h3 className = "ClubLatitude">Latitude: {Club.latitude}</h3>
                <h3 className = "ClubLongitude">Longitude: {Club.longitude}</h3>
                <h3 className = "ClubStadium">Stadium: {Club.stadium}</h3>
            </div>
            
        );
    });
}


const loadClubsFromServer = async () => {
    const response = await fetch('/getClubs');
    const data = await response.json();
    ReactDOM.render(
    <ClubList Clubs = {data.Clubs} />,
        document.getElementById('Clubs')
    );
}

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
}

window.onload = init;