/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Modal as AntdModal, Button } from 'antd';

const Modal = ({
  open,
  onOk,
  onCancel,
  title,
  children,
  ...rest
}) => {
  const handleOk = () => {
    onOk();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <AntdModal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="post" type="primary" onClick={handleOk}>
          Post
        </Button>,
      ]}
      {...rest}
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
