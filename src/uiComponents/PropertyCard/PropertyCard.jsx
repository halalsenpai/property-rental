import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";

import { Card, Badge, Carousel, Tooltip, Divider, Space } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import "./_propertyCard.scss";
import { findIcon, getTagText, getTimeOnMarket, priceType, titleCase } from "../../helpers/helpers";
import { PropertyModal } from "../../appComponents/PropertyModal/PropertyModal";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { openStreetView, removeFavoriteProperties, selectFavoriteProps, setFavoriteProperties } from "../../pages/PropertySearch/slice";
import { useGoogleMap } from "@react-google-maps/api";

export const PropertyCard = (props) => {
  const { propertyData, type, setSelectedProperty, selectedProperty, setPropetyCardData } = props;
  const {
    price_period,
    uid,
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
  const [isFavorite, setIsFavorite] = useState(null);

  const dispatch = useAppDispatch();
  const favProps = useAppSelector(selectFavoriteProps);

  const handleOpenPropertyModal = () => {
    setShowModal(true);
  };
  const handleOpenStreetView = () => {
    dispatch(openStreetView({ lat: latitude, lng: longitude }));
  };
  const handleExternalLink = () => {
    window.open(url, "_blank");
  };

  const setFavorite = () => {
    if (favProps.length < 1 || favProps.find((v) => v.uid !== uid)) {
      dispatch(setFavoriteProperties(propertyData));
    } else if (favProps.find((v) => v.uid === uid)) {
      console.log("object");
      dispatch(removeFavoriteProperties(propertyData));
    }
  };
  console.log("dee", getTimeOnMarket(calc_posted));
  return (
    <div className={`property-card ${selectedProperty && selectedProperty?.uid === uid ? "highlighted" : ""}`}>
      {/* If the client has future plans to have featured cards */}
      {/* <Badge.Ribbon text={"reduced"} color={"green"}> */}
      <Card
        onClick={() => {
          setSelectedProperty(propertyData);
          // setPropetyCardData(propertyData);
        }}
        title={
          <div className="d-flex justify-content-between">
            <a target="_blank" className="text-black" href={url} title={title}>
              {title}
            </a>
            <div onClick={() => setFavorite()}>
              <i className={`${isFavorite ? `fas` : `far`} fa-heart`}></i>
            </div>
          </div>
        }
        extra={<div style={{ zIndex: "22" }}></div>}
        cover={
          <>
            <div className="tag-div">
              <span>{reduced > 1 && <Badge style={{ backgroundColor: "#2BABE3" }} count={`Reduced: ${reduced.toFixed(0)}%`} />}</span>
              <span>{multi_agents?.length && <Badge style={{ backgroundColor: "#52c41a" }} count={`Multi Agents`} />}</span>
              <span>{resale === true && <Badge style={{ backgroundColor: "#ED208A" }} count={`Resale`} />}</span>
              <span>{under_offer === true && <Badge style={{ backgroundColor: "#75C2A8" }} count={`Under Offer`} />}</span>
              <span>{sold === true && <Badge style={{ backgroundColor: "#52c41a" }} count={`Sold`} />}</span>
              <span>{let_agreed === true && <Badge style={{ backgroundColor: "#BDBCBC" }} count={`Let Agreed`} />}</span>
              <span>{cross_similar !== null && <Badge style={{ backgroundColor: "#E84633" }} count={`Sale/Rent`} />}</span>
              <span>{negative_equity < 0 && <Badge style={{ backgroundColor: "#231E46" }} count={`Negative Price ${negative_equity.toFixed(1)}%`} />}</span>
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
          <span>
            <CurrencyFormat value={price_history[0]?.price} displayType={"text"} thousandSeparator={true} prefix={"£"} />{priceType(price_period)}
          </span>
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
