import React, { useState } from "react";
import { lang } from "constants/constant"
import cn from 'classnames'

const SelectLang = () => {
  const [showLang, setShowLang] = useState(false)
  const [currenLang, setCurrenLang] = useState(1)

  const handleSetLang = (lang) => {
    setCurrenLang(lang.id)
    setShowLang(false)
  }
  return (
    <div className="c-selectlang">
      <div
        className="c-selectlang-cur"
        onClick={() => setShowLang(pre => !pre)}
      >
        <img className="c-selectlang-cur-en" src={lang[currenLang - 1].imgUrl} alt="lang"></img>
        <span className="c-selectlang-cur-text">{lang[currenLang - 1].fullName}</span>
        <img
          className={cn({ "c-selectlang-cur-arrowup": !showLang, 'c-selectlang-cur-arrowdown': showLang })}
          src="/images/arrow.svg"
          alt="arrow"></img>
      </div>
      {
        showLang && (
          <ul className="c-selectlang-list">
            {
              lang.map(el => (
                <li className="c-selectlang-list-item" key={el.id} onClick={() => { handleSetLang(el) }}>
                  <img className="c-selectlang-en" src={el.imgUrl} alt="lang"></img>
                  <span className="c-selectlang-text">{el.fullName}</span>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}

export default SelectLang