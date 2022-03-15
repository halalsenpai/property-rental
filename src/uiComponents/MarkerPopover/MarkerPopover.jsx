import { InfoBox, InfoWindow, Marker, MarkerClusterer, useGoogleMap } from "@react-google-maps/api";
import { Popover, Tooltip } from "antd";
import React, { useState } from "react";
import { getTimeOnMarket } from "../../helpers/helpers";
import { PropertyCard } from "../PropertyCard/PropertyCard";

export const MarkerPopover = (props) => {
  const { propertyData, clusterer, setPropetyCardData } = props;
  const map = useGoogleMap();
  const weeks = getTimeOnMarket(propertyData.calc_posted);

  const markerColor = (weeks) => {
    if (weeks < 2) {
      return "#E84633";
    } else if (weeks > 2 && weeks < 4) {
      return "#A63124";
    } else if (weeks > 4 && weeks < 8) {
      return "#661E16";
    } else if (weeks > 8 && weeks < 12) {
      return "#591B14";
    } else if (weeks > 12) {
      return "#40130E";
    }
  };
  return (
    <Marker
      icon={{
        path: "M384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192H384z",
        fillColor: markerColor(weeks),
        fillOpacity: 0.9,
        scale: 0.05,
        strokeColor: markerColor(weeks),
        strokeWeight: 1,
      }}
      onClick={() => {
        setPropetyCardData(propertyData);
      }}
      key={propertyData.longitude + propertyData.latitude}
      position={{ lng: propertyData.longitude, lat: propertyData.latitude }}
      clusterer={clusterer}
    />
  );
};
