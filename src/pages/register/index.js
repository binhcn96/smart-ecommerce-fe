/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react"
import useLocale from "hooks/useLocate"
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js'
import cn from 'classnames'
import LoginWelcome from "components/loginWelcome"
import DropDown from "components/dropdown"
import { Link, useNavigate } from "react-router-dom"
import { getCodeSms } from "services/sms"

const lang = { imgUrl: '/images/vn.png', name: 'VIET NAM' }
const countryCode = { imgUrl: '/images/vn.png', name: '+84' }

const Register = () => {
  const [phoneInvalid, setPhoneInvalid] = useState(false)
  const [visibleBtn, setVisibleBtn] = useState(true)
  const [phonenumber, setPhonenumber] = useState()
  const navigate = useNavigate()
  const handleCheckPhone = (e) => {
    const phoneNumberValid = isValidPhoneNumber(e.target.value, 'VN')
    if (!phoneNumberValid) {
      setPhoneInvalid(true)
      setVisibleBtn(true)
    } else {
      setPhoneInvalid(false)
      setVisibleBtn(false)
      setPhonenumber(e.target.value)
    }
  }

  const handleSubmit = async () => {
    sessionStorage.setItem('signup/sms/phone', parsePhoneNumber(phonenumber, 'VN').number)
    const res = await getCodeSms({
      phoneNumber: parsePhoneNumber(phonenumber, 'VN').number,
      lang: 'en'
    })
    console.log(res)
    navigate('/signup/sms')
  }

  return (
    <LoginWelcome>
      <div className="p-register--container">
        <div className="p-register--title">{useLocale('p.register.title')}</div>
        <div className="p-register--sub">{useLocale('p.register.title.sub')}</div>
        <div className="p-register--country">
          <DropDown content={lang} />
        </div>
        <div className="p-register--phone">
          <div className="p-register--phone-code">
            <DropDown content={countryCode} />
          </div>
          <div className="p-register--phone-number">
            <input
              className={cn({ "g-input": true, "g-input-error": phoneInvalid })}
              placeholder={useLocale('input.placeholder.phone')}
              onBlur={handleCheckPhone}
              onKeyDown={() => setPhoneInvalid(false)}
            >
            </input>
            <div className={cn({ "g-validate-text-error": true, "g-visible": !phoneInvalid })}>
              {useLocale('validate.phonenumber')}
            </div>
          </div>
        </div>
        <div className="p-register--btn">
          <button
            className={cn({ "g-btn": true, "g-btn-disable": visibleBtn })}
            onClick={handleSubmit}
          >{useLocale('p.register.btn.enter')}</button>
        </div>
        <div className="p-register--link">
          <div className="p-register--link-title">{useLocale('p.register.link.title')}</div>
          <Link to='/login' className="p-register--link-login">{useLocale('p.register.link.login')}</Link>
        </div>
      </div>
    </LoginWelcome>
  )
}

export default Register