import React from "react";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import { useTranslation } from 'react-i18next';

const TooltipComponent = () => {
  const { t } = useTranslation()
  return (
    <>
      <Tooltip className='c-tooltip' anchorId="tooltip-c-header-logout" content={t('c.header.logout')} />
      <Tooltip className='c-tooltip' anchorId="tooltip-c-header-notifications" content={t('c.header.notifications')} />
      <Tooltip className='c-tooltip' anchorId="tooltip-c-header-setting" content={t('c.header.setting')} />
      <Tooltip className='c-tooltip' anchorId="tooltip-c-sidebar-dashboard" content={t('c.sidebar.dashboard')} />
      <Tooltip className='c-tooltip' anchorId="tooltip-l-layout-serch-btn" content={t('l.layout.search.btn')} />
    </>
  )
}

export default TooltipComponent