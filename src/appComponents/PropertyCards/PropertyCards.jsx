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
    dispatch(getProperties({ params: "limit=50" }));
  }, []);

  // useEffect(() => {
  //   if (modalData) {
  //     setShowModal(true);
  //   }
  //   console.log("modaldata", modalData);
  // }, [modalData]);

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
