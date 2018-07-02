//Call geocode
//geocode();
//Get location form
let locationForm = document.getElementById('location-form');
locationForm.addEventListener('submit', geocode);
function geocode(e) {
    //Prevent default event
    e.preventDefault();
    //Get input value
    let location = document.getElementById('location-input').value;
    //AJAX get API data
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: location,
            key: 'AIzaSyBCnldsPj3Mseb9FDUJLMNNyXsZ5V3nXMM'
        }
    })
        .then(function (response) {
            //Log full response
            console.log(response);
            //Formatted Address
            let formattedAddress = response.data.results[0].formatted_address;
            let formattedAddressOutput = `
                <ul class="list-group">
                    <li class="list-group-item"><strong>Address</strong>: ${formattedAddress}</li>
                </ul>`;
            //Address Components
            let addressComponents = response.data.results[0].address_components;
            let addressComponentsOutput = '<ul class="list-group">';
            for (let i in addressComponents) {
                addressComponentsOutput += `
                <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>`;
            }
            addressComponentsOutput += '</ul>';
            //Geometry
            let lat = response.data.results[0].geometry.location.lat;
            let lng = response.data.results[0].geometry.location.lng;
            let geometryOutput = `
                <ul class="list-group">
                    <li class="list-group-item"><strong>Latitude</strong>: ${lat}</li>
                    <li class="list-group-item"><strong>Latitude</strong>: ${lng}</li>
                </ul>`;
            //Output to app
            document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
            document.getElementById('address-components').innerHTML = addressComponentsOutput;
            document.getElementById('geometry').innerHTML = geometryOutput;
        })
        .catch(function (error) {
            console.log(error);
        })
}