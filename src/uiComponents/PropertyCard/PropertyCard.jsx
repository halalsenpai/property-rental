import React, { useEffect, useState } from "react";

import { Card, Badge, Carousel, Tooltip, Divider, Space } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import "./_propertyCard.scss";
import { findIcon, getTagText, titleCase } from "../../helpers/helpers";
import { PropertyModal } from "../../appComponents/PropertyModal/PropertyModal";
import { useAppDispatch } from "../../utils/hooks";
import { openStreetView } from "../../pages/PropertySearch/slice";

export const PropertyCard = (props) => {
  const { propertyData, type } = props;
  const {
    category,
    extra,
    bedrooms,
    source,
    calc_posted,
    sold,
    let_agreed,
    cross_similar,
    under_offer,
    resale,
    reduced,
    multi_agents,
    negative_price,
    keywords,
    latitude,
    longitude,
    negative_equity,
  } = propertyData;
  const { title, images, price_history, prop_address, url } = extra;

  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();

  const handleOpenPropertyModal = () => {
    setShowModal(true);
  };
  const handleOpenStreetView = () => {
    dispatch(openStreetView({ lat: latitude, lng: longitude }));
  };
  const handleExternalLink = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="property-card">
      {/* If the client has future plans to have featured cards */}
      {/* <Badge.Ribbon text={"reduced"} color={"green"}> */}
      <Card
        title={
          <a target="_blank" className="text-black" href={url} title={title}>
            {title}
          </a>
        }
        extra={<div style={{ zIndex: "22" }}></div>}
        cover={
          <>
            <div className="tag-div">
              <span>{reduced !== null && <Badge style={{ backgroundColor: "#52c41a" }} count={`Reduced: ${reduced.toFixed(0)}%`} />}</span>
              <span>{multi_agents?.length && <Badge style={{ backgroundColor: "#52c41a" }} count={`Multi Agents`} />}</span>
              <span>{resale !== false && <Badge style={{ backgroundColor: "#52c41a" }} count={`Resale`} />}</span>
              <span>{under_offer !== false && <Badge style={{ backgroundColor: "#52c41a" }} count={`Under Offer`} />}</span>
              <span>{sold !== false && <Badge style={{ backgroundColor: "#52c41a" }} count={`Sold`} />}</span>
              <span>{let_agreed !== false && <Badge style={{ backgroundColor: "#52c41a" }} count={`Let Agreed`} />}</span>
              <span>{cross_similar !== false && <Badge style={{ backgroundColor: "#52c41a" }} count={`Cross Similar`} />}</span>
              <span>{negative_equity !== null && <Badge style={{ backgroundColor: "#52c41a" }} count={`Negative Price`} />}</span>
            </div>
            <Carousel arrows={true}>
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
        actions={[
          <span onClick={handleOpenStreetView}>
            <i className="fas fa-street-view" key={"street-view"}></i>
          </span>,
          <Tooltip title="View more details">
            <span onClick={() => handleOpenPropertyModal()}>
              <i className="fas fa-expand-arrows-alt"></i>
            </span>
          </Tooltip>,
          <span onClick={handleExternalLink}>
            <i className="fas fa-external-link-alt"></i>
          </span>,
        ]}>
        {" "}
        <div className="d-flex justify-content-between all-text-muted">
          <span>Category</span>
          <span>{titleCase(category.replaceAll("-", " "))}</span>
        </div>
        <Divider dashed />
        <div className="d-flex justify-content-between all-text-muted">
          <span>Bedrooms</span>
          <span>{bedrooms}</span>
        </div>
        <Divider dashed />
        <div className="d-flex justify-content-between all-text-muted">
          <span>Price</span>
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
          <span>Source</span>
          <span>{source}</span>
        </div>
        <Divider dashed />
        <div className="d-flex justify-content-between all-text-muted">
          <span>Posted date</span>
          <span>{calc_posted.split("-").reverse().join("-")}</span>
        </div>
        <Divider dashed />
        <Space>
          {keywords?.length > 0 &&
            keywords.map((word, i) => (
              <Tooltip key={i} title={getTagText(word)}>
                <span className={`custom-icon ${findIcon(word)}`}>
                  <i className={`fas fa-${findIcon(word)} fa-2x`}></i>
                </span>
              </Tooltip>
            ))}
        </Space>
      </Card>
      {/* </Badge.Ribbon> */}
      {showModal && <PropertyModal propertyData={propertyData} showModal={showModal} setShowModal={setShowModal} />}
    </div>
  );
};
