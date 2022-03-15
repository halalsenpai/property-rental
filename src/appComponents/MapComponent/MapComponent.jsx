import React, { memo, useCallback, useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import debounce from "lodash.debounce";
import { getTileURL } from "../../helpers/helpers";
import { MAP } from "react-google-maps/lib/constants";
import { useAppDispatch } from "../../utils/hooks";
import { getLandBounds } from "../../pages/PropertySearch/thunk";
import "./_MapComponent.scss";

const googleLibs = ["places"];

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
  const [mapNode, setMapNode] = useState(null);
  const dispatch = useAppDispatch();

  const onLoad = useCallback(function onLoad(mapInstance) {
    // console.log(mapInstance);
    setMap(mapInstance);
  });
  useEffect(() => {
    if (props.center) {
      map.setCenter(props.center);
    }
  }, [props.center]);

  const handleBoundsChange = () => {
    let b = map.getBounds();
    let bounds = { ne: b.getNorthEast(), sw: b.getSouthWest() };
    console.log("Map Bounds: ", JSON.stringify(bounds));
    let center = map.getCenter();
    console.log("map center", center);
    let zoom = map.getZoom();
    console.log("zoom", zoom);
    const coords = getTileURL(center.lat(), center.lng(), zoom);
    // dispatch(getLandBounds(coords));
  };
  // const debouncedHandleBoundsChange = useCallback(debounce(handleBoundsChange, 2000));
  return (
    <LoadScript libraries={googleLibs} googleMapsApiKey="AIzaSyAxfn5nn1AZl1aVNbZyqm6FoSizrczwalw">
      <GoogleMap
        options={{
          mapTypeControlOptions: { position: 6.0, style: 1.0 },
          disableDefaultUI: false,
          fullscreenControl: false,
          restriction: { strictBounds: true, latLngBounds: { north: 58, south: 49.9, west: -7, east: 3 } },
        }}
        onLoad={onLoad}
        // onBoundsChanged={debouncedHandleBoundsChange}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={props.zoom}>
        {/* Child components, such as markers, info windows, etc. */}
        {props.children}
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(MapComponent);
