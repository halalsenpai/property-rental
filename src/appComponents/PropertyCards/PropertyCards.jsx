import { Col, Empty, Row } from "antd";
import React, { useEffect, useState } from "react";
import { selectProperties } from "../../pages/PropertySearch/slice";
import { getProperties } from "../../pages/PropertySearch/thunk";
import { PropertyCard } from "../../uiComponents/PropertyCard/PropertyCard";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import "./_propertyCards.scss";

export const PropertyCards = ({ listData, setSelectedProperty, selectedProperty , setPropetyCardData, ref}) => {
  return (
    <div className="property-cards-container container">
      <Row gutter={[16, 16]} wrap>
        {listData &&
          listData.map((property, i) => (
            <Col key={i} span={24} xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
              <PropertyCard ref={ref} setPropetyCardData={setPropetyCardData} selectedProperty={selectedProperty} setSelectedProperty={setSelectedProperty} propertyData={property} />
            </Col>
          ))}
      </Row>
    </div>
  );
};
