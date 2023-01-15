import React from "react"
import SelectLang from "components/selectLang"
import { useSelector, useDispatch } from "react-redux"
import { changeShowMenu } from "redux/slice"
import cn from 'classnames'

const Header = () => {
  const dispatch = useDispatch()
  const showMenu = useSelector(state => state.app.showMenu)
  const handleToggleMenu = () => {
    dispatch(changeShowMenu(!showMenu))
  }
  console.log(showMenu)
  return (
    <div className="c-header">
      <div className="c-header-brand">
        <div className="c-header-brand-logo">
          <img src='/images/logo.png' alt="logo"></img>
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
        <div className="c-header-setting-icon" id='tooltip-c-header-setting'>
          <img src="/images/setting-icon.svg" alt="setting-icon"></img>
        </div>
      </div>
    </div>
  )
}

export default Header