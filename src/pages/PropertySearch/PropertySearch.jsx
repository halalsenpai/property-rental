import { InfoBox, InfoWindow, Marker, MarkerClusterer, StreetViewPanorama, StreetViewService } from "@react-google-maps/api";
import { Col, Divider, Layout, Row, Select, Slider, Collapse, Popover, Tooltip, Spin } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useRef } from "react";
import { Filter } from "../../appComponents/Filter.jsx/Filter";
import MapComponent from "../../appComponents/MapComponent/MapComponent";
import { PropertyCards } from "../../appComponents/PropertyCards/PropertyCards";
import { MarkerPopover } from "../../uiComponents/MarkerPopover/MarkerPopover";
import { PropertyCard } from "../../uiComponents/PropertyCard/PropertyCard";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { openStreetView, selectProperties, selectPropertyListMeta, selectPropertyLoading, selectStatus, selectStreetViewCords, sortBy } from "./slice";
import { getKeywordsRulesList, getProperties, getPropertyTypes } from "./thunk";
import * as queryString from "query-string";
import "./_propertySearch.scss";

const { Panel } = Collapse;
const { Option } = Select;

export const PropertySearch = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [propetyCardData, setPropetyCardData] = useState(null);
  const [propertyList, setPropertyList] = useState([]);
  const [payloadPropSearch, setPayloadPropSearch] = useState(null);

  const properties = useAppSelector(selectProperties);
  const streetViewCords = useAppSelector(selectStreetViewCords);
  const isLoading = useAppSelector(selectPropertyLoading);
  const propertyListMeta = useAppSelector(selectPropertyListMeta);

  const dispatch = useAppDispatch();

  const streetViewRef = useRef();

  useEffect(() => {
    dispatch(getPropertyTypes());
    dispatch(getKeywordsRulesList());
  }, []);

  useEffect(() => {
    console.log(properties);
    if (properties.length > 1) {
      setPropertyList([...propertyList, ...properties]);
    }
  }, [properties]);

  useEffect(() => {
    console.log("list data", propertyList);
  }, [propertyList]);

  const onload = (marker) => {
    // console.log("marker", marker);
  };

  const handleEmptyStreetViewCords = () => {
    dispatch(openStreetView(null));
  };

  const handleLoadMoreProperties = () => {
    const offset = propertyListMeta.offset + 20;
    console.log(offset);
    const payload = { ...payloadPropSearch, limit: propertyListMeta.limit, offset: offset };
    const _payload = queryString.stringify(payload);
    dispatch(getProperties({ params: _payload }));
  };

  const handleSort = (v) => {
    setPropertyList([]);
    dispatch(sortBy(v));
  };

  return (
    <div className="app-container">
      <Row className="">
        <Col className="left-container" span={12}>
          <Collapse
            activeKey={activePanel}
            onChange={(v) => {
              setActivePanel(v);
            }}>
            <Panel header={<i className="bi bi-funnel-fill text-light"></i>} key="1">
              <Filter setPropertyList={setPropertyList} setPayloadPropSearch={setPayloadPropSearch} setActivePanel={setActivePanel} />
            </Panel>
          </Collapse>
          <div className="menu-bar d-flex justify-content-end align-items-center" style={{ marginTop: "24px", paddingInline: "24px" }}>
            <div className="me-2">showing {propertyList.length} properties</div>
            <Select style={{ width: "200px" }} placeholder={"Sort by"} allowClear onChange={handleSort}>
              <Option value="price">Price</Option>
              <Option label="Price Descending" value="price_desc">
                Price Descending
              </Option>
              <Option label="Negative Equity" value="negative_equity">
                Negative Equity
              </Option>
              <Option label="Negative Equity Descending" value="negative_equity_desc">
                Negative Equity Descending
              </Option>
              <Option label="Time On Market" value="time_on_market">
                Time On Market
              </Option>
              <Option label="Time On Market Descending" value="time_on_market_desc">
                Time On Market Descending
              </Option>
              <Option label="Bedrooms" value="bedrooms">
                Bedrooms
              </Option>
              <Option label="Bedrooms Descending" value="bedrooms_desc">
                Bedrooms Descending
              </Option>
              <Option label="Reduced" value="reduced">
                Reduced
              </Option>
              <Option label="Reduced Descending" value="reduced_desc">
                Reduced Descending
              </Option>
            </Select>
          </div>
          <Divider />
          <Spin wrapperClassName={"property-card-spinner"} spinning={isLoading}>
            {" "}
            <PropertyCards listData={propertyList} setActivePanel={setActivePanel} />
            <div className="d-flex justify-content-center">
              {propertyList.length > 0 && (
                <button onClick={handleLoadMoreProperties} className="btn">
                  Load more
                </button>
              )}
            </div>
          </Spin>
        </Col>
        <Col span={12}>
          <MapComponent>
            <MarkerClusterer options={{ maxZoom: 12 }}>
              {(clusterer) =>
                propertyList.map((prop) => (
                  <MarkerPopover setPropetyCardData={setPropetyCardData} onClick={() => console.log("i was click")} clusterer={clusterer} propertyData={prop} />
                ))
              }
            </MarkerClusterer>
            {propetyCardData && (
              <InfoWindow
                onCloseClick={() => setPropetyCardData(null)}
                options={{ closeBoxURL: "", enableEventPropagation: true, disableAutoPan: false }}
                position={{ lat: propetyCardData.latitude, lng: propetyCardData.longitude }}>
                <div className="propertyData-card" style={{ width: "300px" }}>
                  <PropertyCard propertyData={propetyCardData} />
                </div>
              </InfoWindow>
            )}

            {streetViewCords && <StreetViewPanorama visible={true} onCloseClick={handleEmptyStreetViewCords} options={{ position: streetViewCords, enableCloseButton: true }} />}
          </MapComponent>
        </Col>
      </Row>
    </div>
  );
};
