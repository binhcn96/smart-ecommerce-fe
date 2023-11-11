import React from "react";
import { useTranslation } from "react-i18next";

const Modal = ({ className, disabled, title, onCancel, onConfirm, children, isShowConfirm = true }) => {
  const { t } = useTranslation()
  return (
    <div className="c-modal">
      <div className="c-modal-box">
        <div className="c-modal-header">
          <div className="c-modal-header-title">{title}</div>
          <div className="c-modal-header-close" onClick={onCancel}>
            <img src="/images/close-modal.svg" alt="close"></img>
          </div>
        </div>
        <div className={`c-modal-body ${className}`}>{children}</div>
        <div className="c-modal-footer">
          <button onClick={onCancel}>{t('c.modal.cancel')}</button>
          {isShowConfirm && <button onClick={onConfirm} disabled={disabled}>{t('c.modal.confirm')}</button>}
        </div>
      </div>
    </div>
  )
}

export default Modal