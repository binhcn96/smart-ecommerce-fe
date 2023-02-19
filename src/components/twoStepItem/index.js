import React from "react";
import { useTranslation } from "react-i18next";

const TwoFaItem = ({ img, title, description, tooltip, onchange }) => {
  const { t } = useTranslation()
  return (
    <div className="c-twoFaItem" id={tooltip}>
      <input className="g-checkbox c-twoFaItem-check" type='checkbox'></input>
      <img src={img} alt={img} className='c-twoFaItem-image'></img>
      <div className="c-twoFaItem-content">
        <div className="c-twoFaItem-content-title">{t(title)}</div>
        <div className="c-twoFaItem-content-description">{t(description)}</div>
      </div>
    </div>
  )
}

export default TwoFaItem