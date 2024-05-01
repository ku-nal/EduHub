import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import Header from '../../Components/Header/Header';

const SignOut: React.FC = () => {
     const [open, setOpen] = useState(false);
     const [confirmLoading, setConfirmLoading] = useState(false);
     const [modalText, setModalText] = useState('Are you sure you want sign out?');
   
     const showModal = () => {
       setOpen(true);
     };
   
     const handleOk = () => {
       setModalText('You will be logged out soon');
       setConfirmLoading(true);
       setTimeout(() => {
         setOpen(false);
         setConfirmLoading(false);
       }, 2000);
     };
   
     const handleCancel = () => {
       console.log('Clicked cancel button');
       setOpen(false);
     };

     useEffect(() => {
          showModal();
        }, []);

  return (
    <>
      <Header />
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default SignOut;