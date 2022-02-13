import { Col, Empty, Row } from "antd";
import React, { useEffect, useState } from "react";
import { selectProperties } from "../../pages/PropertySearch/slice";
import { getProperties } from "../../pages/PropertySearch/thunk";
import { PropertyCard } from "../../uiComponents/PropertyCard/PropertyCard";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import "./_propertyCards.scss";

export const PropertyCards = (props) => {
  const [filterParams, setFilterParams] = useState(null);
  const dispatch = useAppDispatch();

  const properties = useAppSelector(selectProperties);

  // useEffect(() => {
  //   dispatch(getProperties({ params: "limit=5" }));
  // }, []);

  if (!properties.length) {
    props.setActivePanel(1);
    return <Empty description={"Search for Properties using the filters"} />;
  }
  // if (properties.length) {
  //   props.setActivePanel(1);
  // }

  return (
    <div className="property-cards-container container">
      <Row gutter={[16, 16]} wrap>
        {properties &&
          properties.map((property, i) => (
            <Col key={i} span={24} xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
              <PropertyCard propertyData={property} />
            </Col>
          ))}
      </Row>
    </div>
  );
};
