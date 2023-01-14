import React, { useState } from "react"
import cn from "classnames"
import useLocale from "hooks/useLocate"
import LoginWelcome from "components/loginWelcome"
import SmsInput from "components/sms"
import { verifyCodeSms } from "services/sms"
import { useNavigate } from "react-router-dom"

const SmsRegister = () => {
  const [value, setValue] = useState('')
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async () => {
    const phoneNumber = sessionStorage.getItem('signup/sms/phone')
    console.log(phoneNumber)
    try {
      const result = await verifyCodeSms({
        phoneNumber,
        code: value
      })
      if (result.status) {
        navigate('/signup/info')
      }
    } catch (error) {
      console.log(error.response.data.error)
      if (error.response.data.error === 'Wrong phonenumber') {
        setErrorPhoneNumber(true)
      }
    }
  }

  const handleCancel = () => {
    navigate('/signup')
  }
  return (
    <LoginWelcome>
      <div className="p-sms-register--container">
        <div className="p-sms-register--title">{useLocale('p.register.title')}</div>
        <SmsInput value={value} setValue={setValue} error={errorPhoneNumber} />
        <div className="p-sms-register--note">{useLocale('p.sms.register.note')}</div>
        <div className="p-sms-register--btn">
          <button className="g-btn-cancel" onClick={handleCancel}> {"< "}{useLocale('p.sms.register.btn.back')}</button>
          <button
            className={cn({ "g-btn": true, 'g-btn-disable': value.length < 6 })}
            onClick={handleSubmit}
          > {useLocale('p.register.btn.enter')}</button>
        </div>
      </div>
    </LoginWelcome>
  )
}

export default SmsRegister