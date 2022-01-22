import React from "react";
import { Card as AntCard, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, HeartOutlined } from "@ant-design/icons";

import "./Card.scss";

const { Meta } = AntCard;

export const Card = (props) => {
  const { title, description } = props;
  return (
    <div className="custom-card">
      <div className="card-left"></div>
      <div className="card-right">
        <AntCard
          style={{ width: "100%" }}
          //   cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          actions={[<HeartOutlined />, <button className="btn btn-success">Reveal</button>]}>
          <Meta title={title} />
          Profit Margin: 55% <br />
          Estimated Profit $74,000 Location:
        </AntCard>
      </div>
    </div>
  );
};
