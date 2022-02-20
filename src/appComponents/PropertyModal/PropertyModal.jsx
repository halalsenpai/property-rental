import React, { useState } from "react";
import { Modal, Button, Divider, Descriptions, PageHeader, Empty, Tooltip, Space } from "antd";
import { findIcon, getTagText } from "../../helpers/helpers";

export const PropertyModal = (props) => {
  const { showModal, setShowModal, propertyData } = props;
  const { category, extra, bedrooms, source, calc_posted, reduced, region, keywords } = propertyData || {};
  const { title, images, price_history, prop_address, agent, agent_phone, agent_address, sold_history } = extra || {};

  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  console.log(propertyData);
  return (
    <Modal width={1000} title="Property Details" visible={showModal} onOk={handleOk} onCancel={handleCancel}>
      <div className="d-flex justify-content-between all-text-muted">
        <span>Listed Date</span>
        <span>{calc_posted.split("-").reverse().join("-")}</span>
      </div>
      <Divider dashed />
      <Descriptions title={"Property Info"} bordered>
        <Descriptions.Item span={3} label="Title">
          {title}
        </Descriptions.Item>
        <Descriptions.Item span={2} label="Region">
          {region}
        </Descriptions.Item>
        <Descriptions.Item span={2} label="Address">
          {prop_address}
        </Descriptions.Item>
        {bedrooms && (
          <Descriptions.Item span={2} label="Bedrooms">
            {bedrooms}
          </Descriptions.Item>
        )}
      </Descriptions>
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
      <Divider />

      <Descriptions title={"Agent Info"} bordered>
        <Descriptions.Item span={1} label="Agent">
          {agent}
        </Descriptions.Item>
        <Descriptions.Item span={1} label="Telephone">
          {agent_phone}
        </Descriptions.Item>
        <Descriptions.Item span={1} label="Address">
          {agent_address}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title={"Price History"} bordered>
        {price_history?.length ? (
          <>
            <Descriptions.Item span={2}>
              <div className="d-flex justify-content-between all-text-muted">
                <strong>Date</strong>
                <strong>Price</strong>
              </div>
              {price_history &&
                price_history.length > 0 &&
                price_history.map((item, i) => (
                  <div className="d-flex justify-content-between all-text-muted">
                    <span>{item.date}</span>
                    <span>{item.price}€</span>
                  </div>
                ))}
            </Descriptions.Item>
            <Descriptions.Item span={4}>
              <Empty />
            </Descriptions.Item>
          </>
        ) : (
          <Descriptions.Item>
            <Empty />
          </Descriptions.Item>
        )}
      </Descriptions>
      <Divider />
      <Descriptions title={"Sold History"} bordered>
        {sold_history?.length ? (
          <>
            <Descriptions.Item span={2}>
              <div className="d-flex justify-content-between all-text-muted">
                <strong>Date</strong>
                <strong>Price</strong>
              </div>
              {price_history &&
                price_history.length > 0 &&
                price_history.map((item, i) => (
                  <div className="d-flex justify-content-between all-text-muted">
                    <span>{item?.date}</span>
                    <span>{item?.price}</span>
                  </div>
                ))}
            </Descriptions.Item>
            <Descriptions.Item span={4}>
              <Empty />
            </Descriptions.Item>
          </>
        ) : (
          <Descriptions.Item>
            <Empty />
          </Descriptions.Item>
        )}
      </Descriptions>
    </Modal>
  );
};
