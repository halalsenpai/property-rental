import React, { useEffect, useState } from "react";

import { Card, Badge, Carousel, Tooltip, Divider, Space } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import "./_propertyCard.scss";
import { findIcon, getTagText } from "../../helpers/helpers";
import { PropertyModal } from "../../appComponents/PropertyModal/PropertyModal";

export const PropertyCard = (props) => {
  const { propertyData, type } = props;
  const { category, extra, bedrooms, source, calc_posted, reduced, keywords } = propertyData;
  const { title, images, price_history, prop_address } = extra;

  const [showModal, setShowModal] = useState(false);

  const handleOpenPropertyModal = () => {
    setShowModal(true);
  };

  return (
    <div className="property-card">
      {/* If the client has future plans to have featured cards */}
      {/* <Badge.Ribbon text={"reduced"} color={"green"}> */}
      <Card
        title={<span title={title}>{title}</span>}
        extra={<div style={{ zIndex: "22" }}></div>}
        cover={
          <>
            <div className="tag-div">{reduced && <Badge style={{ backgroundColor: "#52c41a" }} count={`Reduced: ${reduced.toFixed(0)}%`} />}</div>
            <Carousel>
              {images &&
                images.split(";").map((img, i) => (
                  <div key={i}>
                    <div style={{ width: "100%", height: "180px" }}>
                      <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </div>
                ))}
            </Carousel>
          </>
        }
        actions={
          type !== "modal" && [
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <Tooltip title="View more details">
              <span onClick={() => handleOpenPropertyModal()}>
                <i className="fas fa-expand-arrows-alt"></i>
              </span>
            </Tooltip>,
          ]
        }>
        {" "}
        <div className="d-flex justify-content-between all-text-muted">
          <span>category</span>
          <span>{category}</span>
        </div>
        <Divider dashed />
        <div className="d-flex justify-content-between all-text-muted">
          <span>bedrooms</span>
          <span>{bedrooms}</span>
        </div>
        <Divider dashed />
        <div className="d-flex justify-content-between all-text-muted">
          <span>price</span>
          <span>{price_history[0]?.price}</span>
        </div>
        <Divider dashed />
        <div className="justify-content-between all-text-muted">
          <span>
            <strong>Address</strong>
          </span>{" "}
          <br />
          <span>{prop_address}</span>
        </div>
        <Divider dashed />
        <div className="d-flex justify-content-between all-text-muted">
          <span>source</span>
          <span>{source}</span>
        </div>
        <Divider dashed />
        <div className="d-flex justify-content-between all-text-muted">
          <span>posted date</span>
          <span>{calc_posted}</span>
        </div>
        <Divider dashed />
        <Space>
          {keywords?.length > 0 &&
            keywords.map((word, i) => (
              <Tooltip title={getTagText(word)}>
                <span className={`custom-icon ${findIcon(word)}`}>
                  <i className={`fas fa-${findIcon(word)} fa-2x`}></i>
                </span>
              </Tooltip>
            ))}
        </Space>
        <button className="btn btn-primary street-view-btn">
          <span className="me-1">Open in Street view</span>
          <span>
            <i className="fas fa-street-view "></i>
          </span>
        </button>
      </Card>
      {/* </Badge.Ribbon> */}
      {showModal && <PropertyModal propertyData={propertyData} showModal={showModal} setShowModal={setShowModal} />}
    </div>
  );
};
