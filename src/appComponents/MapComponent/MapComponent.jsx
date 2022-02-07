// import React from "react";

// import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

// export const MapComponent = withScriptjs(
//   withGoogleMap((props) => (
//     <GoogleMap
//       defaultOptions={{
//         restriction: {
//           latLngBounds: { north: 58, south: 49.9, west: -7, east: 3 },
//           strictBounds: true,
//         },
//       }}
//       defaultZoom={1}
//       defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//       {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//     </GoogleMap>
//   ))
// );

import React, { memo, useCallback } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 51.5140318432464,
  lng: -0.12632193087922333,
};

const MapComponent = (props) => {
  const onLoad = useCallback(function onLoad(mapInstance) {
    console.log(mapInstance);
  });
  return (
    <LoadScript googleMapsApiKey="AIzaSyAxfn5nn1AZl1aVNbZyqm6FoSizrczwalw">
      <GoogleMap
        options={{ restriction: { strictBounds: true, latLngBounds: { north: 58, south: 49.9, west: -7, east: 3 } } }}
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <>{props.children}</>
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(MapComponent);
