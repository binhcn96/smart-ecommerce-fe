import React from "react";
import { useTranslation } from "react-i18next";

const ProfileSettingItem = ({ head, body, onClick }) => {
  const { t } = useTranslation()
  return (
    <div className="c-security-item-table-row">
      <div className="c-security-item-table-head">{head}</div>
      <div className="c-security-item-table-body">
        <div className="c-security-item-table-body-content">
          {head === 'Password' ? '********' : body}
        </div>
        <div className="c-security-item-table-body-button">
          <button onClick={onClick}>{t('c.security.item.change')}</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettingItem