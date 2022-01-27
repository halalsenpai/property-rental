import React, { useEffect } from "react";

import { Card, Badge, Carousel, Skeleton, Tooltip, Divider } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import "./_propertyCard.scss";

const { Meta } = Card;

export const PropertyCard = (props) => {
  const { propertyData } = props;
  const { category, extra, bedrooms } = propertyData;
  const { title, images, price_history, prop_address } = extra;

  return (
    <div className="property-card">
      <Badge.Ribbon text={"reduced"} color={"green"}>
        <Card
          title={<span title={title}>{title}</span>}
          headStyle={{ minHeight: "0px", position: "relative" }}
          extra={<div style={{ zIndex: "22" }}></div>}
          cover={
            <Carousel>
              {images &&
                images.split(";").map((img, i) => (
                  <div>
                    <div key={i} style={{ width: "100%", height: "180px" }}>
                      <img
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = "https://via.placeholder.com/150";
                        }}
                        src={img}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                ))}
            </Carousel>
          }
          actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}>
          <div>
            <ul>
              <li>
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
              </li>
            </ul>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};
