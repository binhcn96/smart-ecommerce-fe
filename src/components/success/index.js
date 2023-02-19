import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Success = ({ children }) => {
  const { t } = useTranslation()
  return (
    <div className="c-success">
      <div className="c-success-brand">
        <img src="/images/logo.png" alt="logo-loading"></img>
      </div>
      <div className="c-success-title">
        <span className="c-success-title-request">{t('c.success.request')}</span>
        <span className="c-success-title-sucsess">{t('c.success.title')}</span>
      </div>
      <div className="c-success-img">
        <img src="/images/icon_circle.svg" className="c-success-img-circle" alt="logo-circle"></img>
        <img src="/images/icon_success.svg" className="c-success-img-success" alt="logo-success"></img>
      </div>
      <div className="c-success-children">{children}</div>
      <Link to='/'>
        <button className="g-btn">{t('c.success.button.backhome')}</button>
      </Link>
    </div>
  )
}

export default Success