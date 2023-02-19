import { listMenu } from "constants/constant";
import { useTranslation } from 'react-i18next';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import cn from 'classnames'
import { Link } from "react-router-dom";
import Modal from "components/modal";

const SideBar = ({ onShowModal }) => {
  const { t } = useTranslation()
  const showMenu = useSelector(state => state.app.showMenu)
  const user = useSelector(state => state.app.user)

  return (
    <div className="c-sidebar">
      <div className={cn({ "c-sidebar-info": true, "c-sidebar-bg": showMenu })}>
        <div className={cn({ "c-sidebar-info-username": true, "c-sidebar-hidenMenu": !showMenu })}>{user.user_name}</div>
        <div className={cn({ "c-sidebar-info-avatar": true, "c-sidebar-info-avatar-hidenMenu": !showMenu })}>
          {
            user.profile_picture ? (
              <img src={user.profile_picture} alt="avatar" className="c-sidebar-info-avatar-img"></img>
            ) : (
              <span>{user.user_name[0]}</span>
            )
          }
          <img src="/images/icon_camera.svg" className="c-sidebar-info-avatar-camera" alt='camera' onClick={onShowModal}></img>
        </div>
      </div>
      <div className="c-sidebar-menu">
        {
          listMenu.map(el => (
            <Link to={el.path}>
              <div key={el.id} className='c-sidebar-menu-item'>
                <img src={el.urlImg} id={el.tooltip} className={cn({ 'c-sidebar-menu-img': true, "c-sidebar-menu-hidenMenu": !showMenu })} alt='sidebar-menu'></img>
                <div className={cn({ "c-sidebar-hidenMenu": !showMenu })}>{t(el.title)}</div>
              </div>
            </Link>
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