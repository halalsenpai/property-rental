import React, { useState } from "react";
import { Modal, Button } from "antd";

export const PropertyModal = (props) => {
  const { showModal, setShowModal, setModalData, children } = props;

  const handleOk = () => {
    setShowModal(false);
    setModalData(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setModalData(null);
  };
  return (
    <Modal width={1000} title="Property Details" visible={showModal} onOk={handleOk} onCancel={handleCancel}>
      {children}
    </Modal>
  );
};
