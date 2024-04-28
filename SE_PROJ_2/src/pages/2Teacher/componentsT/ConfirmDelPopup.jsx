import React from "react";
import styled from "styled-components";
import { IoMdWarning } from "react-icons/io";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Popup = styled.div`
  width: 250px;
  height: 200px;
  background: #2e3138;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 1);
`;

const WarningIcon = styled(IoMdWarning)`
  font-size: 60px;
  color: #ffeb3b;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 20px;
  width: 150px;
  height: 50px;
`;

const ConfirmButton = styled(Button)`
  background-color: #2ce8a7;
  color: black;
  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled(Button)`
  background-color: #71bafd;
  color: black;
  &:hover {
    background-color: #2094ff;
  }
`;

function ConfirmDelPopup({ onConfirm, onCancel }) {
  return (
    <Overlay>
      <Popup>
        <WarningIcon />
        <ConfirmButton onClick={onConfirm}>ยืนยัน</ConfirmButton>
        <CancelButton onClick={onCancel}>ยกเลิก</CancelButton> 
      </Popup>
    </Overlay>
  );
}

export default ConfirmDelPopup;
