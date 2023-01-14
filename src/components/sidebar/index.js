import { listMenu } from "constants/constant";
import { useTranslation } from 'react-i18next';
import React from "react";
import { useSelector } from "react-redux";
import cn from 'classnames'

const SideBar = () => {
  const { t } = useTranslation()
  const showMenu = useSelector(state => state.app.showMenu)
  return (
    <div className="c-sidebar">
      <div className="c-sidebar-info">
        <div className={cn({ "c-sidebar-info-username": true, "c-sidebar-hidenMenu": !showMenu })}>Chu Ngoc Binh</div>
        <div className={cn({ "c-sidebar-info-avatar": true, "c-sidebar-info-avatar-hidenMenu": !showMenu })}>
          <span>C</span>
          <img src="/images/icon_camera.svg" className="c-sidebar-info-avatar-camera" alt='camera'></img>
        </div>
      </div>
      <div className="c-sidebar-menu">
        {
          listMenu.map(el => (
            <div key={el.id} className='c-sidebar-menu-item'>
              <img src={el.urlImg} id={el.tooltip} className={cn({ 'c-sidebar-menu-img': true, "c-sidebar-menu-hidenMenu": !showMenu })} alt='sidebar-menu'></img>
              <div className={cn({ "c-sidebar-hidenMenu": !showMenu })}>{t(el.title)}</div>
            </div>
          ))
        }
      </div>
      <div className={cn({ "c-sidebar-footer": true, "c-sidebar-hidenMenu": !showMenu })}>
        <div className="c-sidebar-footer-privacy">{t('c.loginwelcome.footer.privacy')}</div>
        <div className="c-sidebar-footer-term">{t('c.loginwelcome.footer.term')}</div>
        <div className="c-sidebar-footer-year">{t('c.sidebar.year')}</div>
        <div className="c-sidebar-footer-comp">{t('c.sidebar.comp')}</div>
      </div>

    </div>
  )
}

export default SideBar