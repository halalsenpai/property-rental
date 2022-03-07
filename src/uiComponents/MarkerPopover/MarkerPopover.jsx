import { InfoBox, InfoWindow, Marker, MarkerClusterer, useGoogleMap } from "@react-google-maps/api";
import { Popover, Tooltip } from "antd";
import React, { useState } from "react";
import { PropertyCard } from "../PropertyCard/PropertyCard";

export const MarkerPopover = (props) => {
  const { propertyData, clusterer, onClick, setPropetyCardData } = props;
  const map = useGoogleMap();

  return (
    <Marker
      onClick={() => setPropetyCardData(propertyData)}
      key={propertyData.longitude + propertyData.latitude}
      position={{ lng: propertyData.longitude, lat: propertyData.latitude }}
      clusterer={clusterer}
    />
  );
};
