import React, { useState } from "react"
import useLocale from "hooks/useLocate"
import cn from "classnames"
import { lang } from "constants/constant"

const LoginWelcome = ({ children }) => {
  const [curLang, setCurLang] = useState(1)
  const [visibleLang, setVisibleLang] = useState(false)

  const handleSelectLang = (id) => {
    setCurLang(id)
    setVisibleLang(!visibleLang)
  }
  return (
    <div className="c-login-welcome">
      <div className="c-login-welcome__container">
        <div className="c-login-welcome__info">
          <div className="c-login-welcome__info--logo">
            <img src="/images/logo.png" alt="p-logo"></img>
          </div>
          <div className="c-login-welcome__info--children">
            {children}
          </div>
          <div className="c-login-welcome__info--footer">
            <div className="c-login-welcome__info--footer-privacy">{useLocale('c.loginwelcome.footer.privacy')}</div>
            <div className="c-login-welcome__info--footer-term">{useLocale('c.loginwelcome.footer.term')}</div>
            <div className={cn({ "c-login-welcome__info--footer-lang": true, 'isOpen': visibleLang })}>
              <div className={"c-login-welcome__info--footer-lang-cur"} onClick={() => setVisibleLang(!visibleLang)}>
                <img src={lang[curLang - 1].imgUrl} alt="lang"></img>
                <span>{lang[curLang - 1].name}</span>
              </div>
              {
                visibleLang && (
                  <div className={"c-login-welcome__info--footer-lang-list"}>
                    <ul>
                      {
                        lang.map(el => (
                          <li key={el.id} onClick={() => handleSelectLang(el.id)}>
                            <img src={el.imgUrl} alt="lang"></img>
                            <span>{el.name}</span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="c-login-welcome__picture">
          <img src="/images/p-login.jpg" alt="login-img" className="c-login-welcome__picture--image"></img>
        </div>
      </div>
    </div>
  )
}

export default LoginWelcome