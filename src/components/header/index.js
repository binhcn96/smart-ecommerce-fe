import React, { useState } from "react"
import SelectLang from "components/selectLang"
import { useSelector, useDispatch } from "react-redux"
import { changeShowMenu } from "redux/slice"
import cn from 'classnames'
import { listSetting } from "constants/constant"
import { t } from "i18next"
import { Link } from "react-router-dom"

const Header = () => {
  const [showSetting, setShowSetting] = useState(false)

  const dispatch = useDispatch()
  const showMenu = useSelector(state => state.app.showMenu)
  const handleToggleMenu = () => {
    dispatch(changeShowMenu(!showMenu))
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
        <div className="c-header-setting-icon" id='tooltip-c-header-logout'>
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
                    <li className="c-header-setting-item-setting" key={el.id}>
                      <Link to={'/security-setting'}>
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
    </div>
  )
}

export default Header