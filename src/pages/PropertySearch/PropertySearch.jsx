import { Autocomplete, InfoBox, InfoWindow, Marker, MarkerClusterer, StreetViewPanorama, StreetViewService, useGoogleMap } from "@react-google-maps/api";
import { Col, Divider, Layout, Row, Select, Slider, Collapse, Popover, Tooltip, Spin, Drawer, Empty, Button } from "antd";
import React, { memo, useEffect, useState } from "react";
import { MAP } from "react-google-maps/lib/constants";
import { useRef } from "react";
import { Filter } from "../../appComponents/Filter.jsx/Filter";
import MapComponent from "../../appComponents/MapComponent/MapComponent";
import { PropertyCards } from "../../appComponents/PropertyCards/PropertyCards";
import { MarkerPopover } from "../../uiComponents/MarkerPopover/MarkerPopover";
import { PropertyCard } from "../../uiComponents/PropertyCard/PropertyCard";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { openStreetView, selectMapInstance, selectProperties, selectPropertyListMeta, selectPropertyLoading, selectStatus, selectStreetViewCords, sortBy } from "./slice";
import { getKeywordsRulesList, getProperties, getPropertyTypes } from "./thunk";
import * as queryString from "query-string";
import "./_propertySearch.scss";
import { AutoComplete } from "../../appComponents/AutoComplete/AutoComplete";

const { Panel } = Collapse;
const { Option } = Select;

export const PropertySearch = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [visible, setVisible] = useState(false);
  const [propetyCardData, setPropetyCardData] = useState(null);
  const [propertyList, setPropertyList] = useState([]);
  const [payloadPropSearch, setPayloadPropSearch] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [cardRef, setCardRef] = useState(null);

  const propCardRef = useRef(null);

  const properties = useAppSelector(selectProperties);
  const streetViewCords = useAppSelector(selectStreetViewCords);
  const isLoading = useAppSelector(selectPropertyLoading);
  const propertyListMeta = useAppSelector(selectPropertyListMeta);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPropertyTypes());
    dispatch(getKeywordsRulesList());
  }, []);

  useEffect(() => {
    console.log(properties);
    if (properties.length > 1) {
      setPropertyList([...propertyList, ...properties]);
      setVisible(false);
    }
  }, [properties]);

  useEffect(() => {
    console.log("selected", selectedProperty);
  }, [selectedProperty]);

  useEffect(() => {
    console.log(propCardRef);
  }, [propCardRef.current]);

  useEffect(() => {
    setSelectedProperty(propetyCardData);
    if (propCardRef.current) {
      propCardRef.current.scrollIntoView();
    }
  }, [propetyCardData]);

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
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="app-container">
      <Drawer placement={"left"} width={800} onClose={onClose} visible={visible}>
        <Filter setPropertyList={setPropertyList} setPayloadPropSearch={setPayloadPropSearch} setActivePanel={setActivePanel} />
      </Drawer>
      <Row className="">
        {!fullScreen && (
          <Col className="left-container" span={12}>
            <div className="menu-bar d-flex justify-content-between mx-2 align-items-center" style={{ marginTop: "24px" }}>
              <button className="btn btn-primary me-1" onClick={() => setVisible(true)}>
                <i className="bi bi-funnel-fill text-light"></i>
              </button>

              <span className="d-flex align-items-center">
                {propertyList.length > 1 && <div className="me-2">showing {propertyList.length} properties</div>}
                <Select style={{ width: "200px" }} className="me-4" placeholder={"Sort by"} allowClear onChange={handleSort}>
                  <Option value="price">Lowest Price</Option>
                  <Option label="Price Descending" value="price_desc">
                    Highest Price
                  </Option>
                  <Option label="Negative Equity" value="negative_equity">
                    Lowest Negative Equity
                  </Option>
                  <Option label="Negative Equity Descending" value="negative_equity_desc">
                    Highest Negative Equity
                  </Option>
                  <Option label="Time On Market" value="time_on_market">
                    Oldest
                  </Option>
                  <Option label="Time On Market Descending" value="time_on_market_desc">
                    Newest
                  </Option>
                  <Option label="Bedrooms" value="bedrooms">
                    Least Bedrooms
                  </Option>
                  <Option label="Bedrooms Descending" value="bedrooms_desc">
                    Most Bedrooms
                  </Option>
                  <Option label="Reduced" value="reduced">
                    Least Reduced
                  </Option>
                  <Option label="Reduced Descending" value="reduced_desc">
                    Most Reduced
                  </Option>
                </Select>
              </span>
              <Button style={{ position: "absolute", right: "2px", top: "2px", border: "none", boxShadow: "none" }} shape="circle" onClick={() => setFullScreen(true)}>
                <i className="fas fa-times"></i>
              </Button>
            </div>
            <Divider />
            <Spin wrapperClassName={"property-card-spinner"} spinning={isLoading}>
              {propertyList.length < 1 && <Empty description="Use the filters to search for properties" />}{" "}
              <PropertyCards
                selectedProperty={selectedProperty}
                setPropetyCardData={setPropetyCardData}
                setSelectedProperty={setSelectedProperty}
                listData={propertyList}
                setActivePanel={setActivePanel}
              />
              <div className="d-flex justify-content-center">
                {propertyList.length > 0 && (
                  <button onClick={handleLoadMoreProperties} className="btn btn-primary my-2 mb-4">
                    Load more
                  </button>
                )}
              </div>
            </Spin>
          </Col>
        )}
        <Col className="right-container" span={fullScreen ? 24 : 12}>
          <MapComponent zoom={selectedProperty ? 16 : 1} center={selectedProperty ? { lat: selectedProperty.latitude, lng: selectedProperty.longitude } : null}>
            {fullScreen && (
              <>
                <button style={{ zIndex: 99, position: "absolute", top: "3px", left: "10px" }} onClick={() => setVisible(true)} className="btn btn-primary">
                  <i className="bi bi-funnel-fill text-light"></i>
                </button>
                <button style={{ zIndex: 99, position: "absolute", top: "3px", right: "10px" }} onClick={() => setFullScreen(false)} className="btn btn-primary">
                  <i className="fas fa-compress-arrows-alt"></i>
                </button>
              </>
            )}

            <AutoComplete />
            <MarkerClusterer options={{ maxZoom: 12 }}>
              {(clusterer) =>
                propertyList.map((prop) => <MarkerPopover selectedProperty={selectedProperty} setPropetyCardData={setPropetyCardData} clusterer={clusterer} propertyData={prop} />)
              }
            </MarkerClusterer>
            {/* {propetyCardData && (
              <InfoWindow
                onCloseClick={() => {
                  setPropetyCardData(null);
                  selectedProperty(null);
                }}
                options={{ closeBoxURL: "", enableEventPropagation: true, disableAutoPan: false }}
                position={{ lat: propetyCardData.latitude, lng: propetyCardData.longitude }}>
                <div className="propertyData-card" style={{ width: "300px" }}>
                  <PropertyCard propertyData={propetyCardData} />
                </div>
              </InfoWindow>
            )} */}

            {streetViewCords && <StreetViewPanorama visible={true} onCloseClick={handleEmptyStreetViewCords} options={{ position: streetViewCords, enableCloseButton: true }} />}
          </MapComponent>
        </Col>
      </Row>
    </div>
  );
};
