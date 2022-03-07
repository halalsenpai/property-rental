import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";

import { Modal, Button, Divider, Descriptions, PageHeader, Empty, Tooltip, Space } from "antd";
import { findIcon, getTagText } from "../../helpers/helpers";
import DescriptionsItem from "antd/lib/descriptions/Item";

export const PropertyModal = (props) => {
  const { showModal, setShowModal, propertyData } = props;
  const { category, extra, bedrooms, source, calc_posted, reduced, region, keywords, full_address } = propertyData || {};
  const { title, images, price_history, prop_address, agent, agent_phone, agent_address, sold_history } = extra || {};

  const [address, setAddress] = useState(null);
  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (full_address) {
      let address = JSON.parse(full_address);
      setAddress(address);
    }
  }, [full_address]);

  return (
    <Modal width={1000} title="Property Details" visible={showModal} footer={null} onOk={handleOk} onCancel={handleCancel}>
      <div className="d-flex justify-content-between all-text-muted">
        <span>Listed Date</span>
        <span>{calc_posted.split("-").reverse().join("-")}</span>
      </div>
      <Divider dashed />
      <Descriptions title={"Property Info"} bordered>
        <Descriptions.Item span={3} label="Title">
          {title}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Bedrooms">
          {bedrooms}
        </Descriptions.Item>

        <Descriptions.Item span={2} label="Address">
          {prop_address}
        </Descriptions.Item>

        <Descriptions.Item span={2} label="Region">
          {region}
        </Descriptions.Item>

        <DescriptionsItem span={3} label="Full Address">
          <div>
            <pre>{JSON.stringify(address, null, 3)}</pre>
          </div>
        </DescriptionsItem>
      </Descriptions>

      <Space className="mt-2">
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
        <Descriptions.Item span={3} label="Agent">
          {agent}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Telephone">
          {agent_phone}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Address">
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
                    <CurrencyFormat value={item?.price} displayType={"text"} thousandSeparator={true} prefix={"£"} />
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
