import React, { useState } from "react"
import SelectLang from "components/selectLang"
import { useSelector, useDispatch } from "react-redux"
import { changeShowMenu, logOut } from "redux/slice"
import cn from 'classnames'
import { listSetting } from "constants/constant"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Modal from "components/modal"
import { deleteLocalStorage } from "util/utility"

const Header = () => {
  const { t } = useTranslation()
  const [showSetting, setShowSetting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const showMenu = useSelector(state => state.app.showMenu)
  const handleToggleMenu = () => {
    dispatch(changeShowMenu(!showMenu))
  }

  const handleLogout = () => {
    deleteLocalStorage()
    dispatch(logOut())
    navigate('/login')
  }

  return (
    <div className="c-header">
      <div className="c-header-brand">
        <div className="c-header-brand-logo">
          {/* <Link to='/'> */}
          <img src='/images/logo.png' alt="logo"></img>
          {/* </Link> */}
        </div>
        <div className="c-header-brand-menu" onClick={handleToggleMenu}>
          <div className={cn({ "c-header-brand-menu-item": true, "c-header-brand-menu-close": !showMenu })}></div>
        </div>
      </div>
      <div className="c-header-setting">
        <div className="c-header-setting-icon c-header-setting-selectlang">
          <SelectLang />
        </div>
        <div className="c-header-setting-icon" id='tooltip-c-header-logout' onClick={() => setShowModal(true)}>
          <img src="/images/logout-icon.svg" alt="setting-icon"></img>
        </div>
        <div className="c-header-setting-icon" id='tooltip-c-header-notifications'>
          <img src="/images/notifications-icon.svg" alt="setting-icon"></img>
        </div>
        <div className="c-header-setting-icon">
          <img src="/images/setting-icon.svg" id='tooltip-c-header-setting' alt="setting-icon" onClick={() => setShowSetting(!showSetting)}></img>
          {
            showSetting && (
              <ul className="c-header-setting-list">
                {
                  listSetting.map(el => (
                    <li className="c-header-setting-item-setting" key={el.id} onClick={() => setShowSetting(false)}>
                      <Link to={el.path}>
                        <img className="c-header-setting-item-setting-img" src={el.urlImg} alt="setting-icon"></img>
                        <span className="c-header-setting-item-setting-text">{t(el.title)}</span>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            )
          }
        </div>
      </div>
      {
        showModal && (
          <Modal
            title={t('c.header.logout')}
            onCancel={() => setShowModal(false)}
            onConfirm={() => handleLogout()}
            className={'c-header-modal-logout-body'}
          >
            <div className="c-header-modal-logout">
              <div className="c-header-modal-logout-content">
                {t('c.header.logout.content')}
              </div>
              <div>
                {t('c.header.logout.confirm')}
              </div>
            </div>
          </Modal>
        )
      }
    </div>
  )
}

export default Header