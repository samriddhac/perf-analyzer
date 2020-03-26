import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '20vw',
    height: '32vh'
};

const Location = (props) => {

    return (
        <Map
            google={props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
                lat: 22.5726,
                lng: 88.3639
            }}
        >
            <Marker name={'My Location'} />
        </Map>
    );
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBkCSyr2k7LPRRTd3vYjdA77O3cywRxTBw'
})(Location);