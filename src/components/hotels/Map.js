import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = (props) => <span className="p-1 bg-warning text-dark rounded">{props.text}</span>;
 
function SimpleMap(props) {
    const defaultVals = {
        center: { lat: 23.8103, lng: 90.4125 },
        zoom: 7
    };

    return (
      <div style={{ height: '675px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCvedBqOEVVEdVpwdAsNqnWFvaQBrXrMC8' }}
          defaultCenter={defaultVals.center}
          defaultZoom={defaultVals.zoom}
        >
          <AnyReactComponent
            lat={22.3569}
            lng={91.7832}
            text="You"
          />
          <AnyReactComponent
            lat={props.lat}
            lng={props.lng}
            text={props.name}
          />
        </GoogleMapReact>
      </div>
    );
}
 
export default SimpleMap;