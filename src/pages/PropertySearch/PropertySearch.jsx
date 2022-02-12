import { InfoBox, Marker, MarkerClusterer, StreetViewPanorama, StreetViewService } from "@react-google-maps/api";
import { Col, Divider, Layout, Row, Select, Slider, Collapse, Popover, Tooltip } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useRef } from "react";
import { Filter } from "../../appComponents/Filter.jsx/Filter";
import MapComponent from "../../appComponents/MapComponent/MapComponent";
import { PropertyCards } from "../../appComponents/PropertyCards/PropertyCards";
import { Card } from "../../uiComponents/Card/Card";
import { MarkerPopover } from "../../uiComponents/MarkerPopover/MarkerPopover";
import { PropertyCard } from "../../uiComponents/PropertyCard/PropertyCard";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { openStreetView, selectProperties, selectStreetViewCords, sortBy } from "./slice";
import { getKeywordsRulesList, getProperties, getPropertyTypes } from "./thunk";
import "./_propertySearch.scss";

const { Panel } = Collapse;
const { Option } = Select;

export const PropertySearch = () => {
  const [activePanel, setActivePanel] = useState(null);

  const properties = useAppSelector(selectProperties);
  const streetViewCords = useAppSelector(selectStreetViewCords);

  const dispatch = useAppDispatch();

  const streetViewRef = useRef();

  useEffect(() => {
    dispatch(getPropertyTypes());
    dispatch(getKeywordsRulesList());
  }, []);

  const onload = (marker) => {
    // console.log("marker", marker);
  };

  const handleEmptyStreetViewCords = () => {
    // console.log("hello");
    dispatch(openStreetView(null));
  };

  function createKey(location) {
    return location.lat + location.lng;
  }

  const locations = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.75, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.7737, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438 },
    { lat: -43.999792, lng: 170.463352 },
  ];
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
              <Filter setActivePanel={setActivePanel} />
            </Panel>
          </Collapse>
          <div className="menu-bar d-flex justify-content-end align-items-center" style={{ marginTop: "24px", paddingInline: "24px" }}>
            <Select style={{ width: "200px" }} placeholder={"Sort by"} allowClear onSelect={(v) => dispatch(sortBy(v))}>
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
          <PropertyCards />
        </Col>
        <Col span={12}>
          <MapComponent>
            {properties?.map((prop) => (
              <>
                {/* <MarkerPopover propertyData={prop} /> */}
                <MarkerClusterer>
                  {(clusterer) =>
                    properties.map((prop) => <Marker key={prop.longitude + prop.latitude} position={{ lng: prop.longitude, lat: prop.latitude }} clusterer={clusterer} />)
                  }
                </MarkerClusterer>
              </>
            ))}

            {streetViewCords && <StreetViewPanorama visible={true} onCloseClick={handleEmptyStreetViewCords} options={{ position: streetViewCords, enableCloseButton: true }} />}
          </MapComponent>
        </Col>
      </Row>
    </div>
  );
};
