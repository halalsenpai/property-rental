import { InfoBox, InfoWindow, Marker } from "@react-google-maps/api";
import { Popover, Tooltip } from "antd";
import React, { useState } from "react";
import { PropertyCard } from "../PropertyCard/PropertyCard";

export const MarkerPopover = (props) => {
  const [cardVisible, setcardVisible] = useState(false);
  const { propertyData } = props;
  return (
    <>
      <Marker onClick={() => setcardVisible(true)} options={{ title: "test" }} position={{ lat: propertyData.latitude, lng: propertyData.longitude }}>
        {cardVisible && (
          <InfoBox options={{ closeBoxURL: "", enableEventPropagation: true }} position={{ lat: propertyData.latitude, lng: propertyData.longitude }}>
            <PropertyCard propertyData={propertyData} />
          </InfoBox>
        )}
      </Marker>
    </>
  );
};
