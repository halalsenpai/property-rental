import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";

import { Modal, Button, Divider, Descriptions, PageHeader, Empty, Tooltip, Space, Collapse, Carousel } from "antd";
import { findIcon, getTagText, priceType, titleCase } from "../../helpers/helpers";
import DescriptionsItem from "antd/lib/descriptions/Item";
import { Chart } from "react-charts";

const { Panel } = Collapse;

export const PropertyModal = (props) => {
  const { showModal, setShowModal, propertyData } = props;
  const { category, extra, bedrooms, source, calc_posted, reduced, region, keywords, full_address, price_period, prop_type, price } = propertyData || {};
  const { title, images, price_history, prop_address, agent, agent_phone, agent_address, sold_history, descr, floorplan, pdf } = extra || {};

  const [address, setAddress] = useState(null);
  const [viewFloorPlan, setViewFloorPlan] = useState(false);
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
          {titleCase(title)}
        </Descriptions.Item>
        <Descriptions.Item span={1} label="Property Type">
          {prop_type?.replaceAll("_", " ")}
        </Descriptions.Item>
        <Descriptions.Item span={1} label="Bedrooms">
          {bedrooms}
        </Descriptions.Item>
        <Descriptions.Item span={1} label="Price">
          <CurrencyFormat value={price} displayType={"text"} thousandSeparator={true} prefix={"£"} />
          {priceType(price_period)}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Description">
          {descr}
        </Descriptions.Item>

        {!address && (
          <Descriptions.Item span={3} label="Address">
            {prop_address}
          </Descriptions.Item>
        )}

        {/* {address && (
          <DescriptionsItem span={3} label="Full Address">
            <div>
              {console.log(address)}
              <pre>{JSON.stringify(address, null, 3)}</pre>
            </div>
          </DescriptionsItem>
        )} */}
      </Descriptions>

      <br />
      <Space>
        {floorplan && (
          <>
            <Button onClick={() => setViewFloorPlan(true)}>View Floor Plan</Button>
            <Modal width="700px" title="Floor Plan" visible={viewFloorPlan} footer={false} onCancel={() => setViewFloorPlan(false)}>
              <img style={{ width: "100%" }} src={floorplan} alt="floorplan" />
            </Modal>
          </>
        )}
        {floorplan && (
          <Button>
            <a href={pdf} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          </Button>
        )}
      </Space>
      <br />
      <br />
      {address && (
        <Descriptions title={"Address"} bordered>
          {Object.keys(address).map((keyName, i) => (
            <DescriptionsItem span={1} key={i} label={titleCase(keyName.replaceAll("_", " "))}>
              {address[keyName]}
            </DescriptionsItem>
          ))}
        </Descriptions>
      )}
      <br />

      <Carousel arrows={true}>
        {images &&
          images.split(";").map((img, i) => (
            <div key={i}>
              <div style={{ width: "100%", height: "380px" }}>
                <img
                  src={img}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) =>
                    (e.currentTarget.src = "https://schiffbauergasse.de/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png")
                  }
                />
              </div>
            </div>
          ))}
      </Carousel>

      <br />

      <Space className="mt-2 d-flex justify-content-center">
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
            <Descriptions.Item span={1}>
              <div className="d-flex justify-content-between all-text-muted">
                <strong>Date</strong>
                <strong>Price</strong>
              </div>
              {price_history &&
                price_history.length > 0 &&
                price_history.map((item, i) => (
                  <div className="d-flex justify-content-between all-text-muted">
                    <span>{item.date.split("-").reverse().join("-")}</span>
                    <span>
                      <CurrencyFormat value={item?.price} displayType={"text"} thousandSeparator={true} prefix={"£"} />
                      {priceType(price_period)}
                    </span>
                  </div>
                ))}
            </Descriptions.Item>
            <Descriptions.Item span={3}>
            {/* <Chart
       options={{
         data,
         primaryAxis,
         secondaryAxes,
       }}
     /> */}
            </Descriptions.Item>
          </>
        ) : (
          <Descriptions.Item span={3}>
            <Empty />
          </Descriptions.Item>
        )}
      </Descriptions>
      <Divider />
      <Descriptions title={"Sold History"} bordered>
        {sold_history?.length ? (
          <>
            <Descriptions.Item span={1}>
              <div className="d-flex justify-content-between all-text-muted">
                <strong>Date</strong>
                <strong>Price</strong>
              </div>
              {price_history &&
                sold_history.length > 0 &&
                sold_history.map((item, i) => (
                  <div className="d-flex justify-content-between all-text-muted">
                    <span>{item?.date}</span>
                    <span>{item?.price}</span>
                  </div>
                ))}
            </Descriptions.Item>
            <Descriptions.Item span={2}>
              <Empty />
            </Descriptions.Item>
          </>
        ) : (
          <Descriptions.Item span={2}>
            <Empty />
          </Descriptions.Item>
        )}
      </Descriptions>
    </Modal>
  );
};
