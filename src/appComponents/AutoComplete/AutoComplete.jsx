import { Autocomplete, useGoogleMap } from "@react-google-maps/api";
import React, { useState } from "react";

export const AutoComplete = () => {
  const map = useGoogleMap();
  const [autoComplete, setAutoComplete] = useState(null);

  const onload = (autocomplete) => {
    setAutoComplete(autocomplete);
  };
  return (
    <Autocomplete
      restrictions={{ country: "GB" }}
      onLoad={onload}
      onPlaceChanged={(c) => {
        if (autoComplete) {
          console.log("place:", autoComplete.getPlace().geometry.viewport.getNorthEast());
          map.setZoom(16);
          map.setCenter({ lat: autoComplete.getPlace().geometry.location.lat(), lng: autoComplete.getPlace().geometry.location.lng() });
        }
      }}>
      <input
        type="text"
        placeholder="Search for properties"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `300px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "50%",
          top: "10px",
          marginLeft: "-120px",
        }}
      />
    </Autocomplete>
  );
};
