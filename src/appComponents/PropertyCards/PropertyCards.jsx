import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { selectProperties } from "../../pages/PropertySearch/slice";
import { getProperties } from "../../pages/PropertySearch/thunk";
import { PropertyCard } from "../../uiComponents/PropertyCard/PropertyCard";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import "./_propertyCards.scss";

export const PropertyCards = () => {
  const [filterParams, setFilterParams] = useState(null);
  const dispatch = useAppDispatch();

  const properties = useAppSelector(selectProperties);

  useEffect(() => {
    dispatch(getProperties({ params: "?limit=50" }));
  }, []);

  return (
    <div className="property-cards-container container">
      <Row gutter={[16, 16]} wrap>
        {properties &&
          properties.map((property, i) => (
            <Col key={i} span={8} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
              <PropertyCard propertyData={property} />
            </Col>
          ))}
      </Row>
    </div>
  );
};
