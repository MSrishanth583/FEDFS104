import React from "react";

function ModalPopup({ visible, title, message, onConfirm, onCancel }) {
  if (!visible) return null;
  return (
    <div className="modal-popup" id="modalPopup" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="modal-title" id="modalTitle">{title}</div>
        <div className="modal-message" id="modalMessage">{message}</div>
        <div className="modal-btns">
          <button className="modal-btn confirm" id="modalConfirmBtn" onClick={onConfirm}>Confirm</button>
          <button className="modal-btn cancel" id="modalCancelBtn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ModalPopup;
