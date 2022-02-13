import React, { memo, useCallback, useState } from "react";
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
  const [map, setMap] = useState(null);
  const onLoad = useCallback(function onLoad(mapInstance) {
    console.log(mapInstance);
    setMap(mapInstance);
  });

  const handleBoundsChange = () => {
    let b = map.getBounds();
    let bounds = { ne: b.getNorthEast(), sw: b.getSouthWest() };
    console.log("Map Bounds: ", JSON.stringify(bounds));
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyAxfn5nn1AZl1aVNbZyqm6FoSizrczwalw">
      <GoogleMap
        options={{ restriction: { strictBounds: true, latLngBounds: { north: 58, south: 49.9, west: -7, east: 3 } } }}
        onLoad={onLoad}
        onBoundsChanged={handleBoundsChange}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}>
        {/* Child components, such as markers, info windows, etc. */}
        <>{props.children}</>
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(MapComponent);
