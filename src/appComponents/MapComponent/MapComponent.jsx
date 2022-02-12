import React, { useCallback, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Spin } from "antd";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 51.5140318432464,
  lng: -0.12632193087922333,
};

export const MapComponent = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAxfn5nn1AZl1aVNbZyqm6FoSizrczwalw", // ,
    // ...otherOptions
  });

  const RenderMap = () => {
    const [map, setMap] = useState(null);
    const [bounds, setBounds] = useState(null);
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
      <GoogleMap
        onBoundsChanged={handleBoundsChange}
        options={{ restriction: { strictBounds: true, latLngBounds: { north: 58, south: 49.9, west: -7, east: 3 } } }}
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}>
        {props.children}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  return isLoaded ? <RenderMap /> : <Spin spinning={true} />;
};
