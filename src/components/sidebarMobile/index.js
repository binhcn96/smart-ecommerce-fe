import { listMenu } from "constants/constant";
import { useTranslation } from 'react-i18next';
import React from "react";
import cn from 'classnames'

const SideBarMobile = () => {
  const { t } = useTranslation()
  return (
    <div className="c-sidebar-mobile">
      <div className={cn({ "c-sidebar-mobile-info": true, })}>
        <div className={cn({ "c-sidebar-mobile-info-username": true })}>Chu Ngoc Binh</div>
        <div className={cn({ "c-sidebar-mobile-info-avatar": true })}>
          <span>C</span>
          <img src="/images/icon_camera.svg" className="c-sidebar-mobile-info-avatar-camera" alt='camera'></img>
        </div>
      </div>
      <div className="c-sidebar-mobile-menu">
        {
          listMenu.map(el => (
            <div key={el.id} className='c-sidebar-mobile-menu-item'>
              <img src={el.urlImg} id={el.tooltip} className={cn({ 'c-sidebar-mobile-menu-img': true })} alt='sidebar-mobile-menu'></img>
              <div className={''}>{t(el.title)}</div>
            </div>
          ))
        }
      </div>
      <div className={cn({ "c-sidebar-mobile-footer": true })}>
        <div className="c-sidebar-mobile-footer-privacy">{t('c.loginwelcome.footer.privacy')}</div>
        <div className="c-sidebar-mobile-footer-term">{t('c.loginwelcome.footer.term')}</div>
        <div className="c-sidebar-mobile-footer-year">{t('c.sidebar.year')}</div>
        <div className="c-sidebar-mobile-footer-comp">{t('c.sidebar.comp')}</div>
      </div>

    </div>
  )
}

export default SideBarMobile