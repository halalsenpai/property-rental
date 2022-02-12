import { InfoBox, InfoWindow, Marker, MarkerClusterer } from "@react-google-maps/api";
import { Popover, Tooltip } from "antd";
import React, { useState } from "react";
import { PropertyCard } from "../PropertyCard/PropertyCard";

export const MarkerPopover = (props) => {
  const [cardVisible, setcardVisible] = useState(false);
  const { propertyData } = props;
  return (
    <>
      <Marker onClick={() => setcardVisible(!cardVisible)} options={{ title: "test" }} position={{ lat: propertyData.latitude, lng: propertyData.longitude }}>
        {cardVisible && (
          <InfoWindow options={{ closeBoxURL: "", enableEventPropagation: true, disableAutoPan: false }} position={{ lat: propertyData.latitude, lng: propertyData.longitude }}>
            <div className="prop-card" style={{ width: "300px" }}>
              <PropertyCard propertyData={propertyData} />
            </div>
          </InfoWindow>
        )}
      </Marker>

    </>
  );
};
