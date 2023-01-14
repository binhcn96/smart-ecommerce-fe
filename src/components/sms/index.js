import React from "react"
import useLocale from "hooks/useLocate"
import cn from 'classnames'
import { getCodeSms } from "services/sms"

const SmsInput = ({ value, setValue, error }) => {
  console.log(error)
  const phone = sessionStorage.getItem('signup/sms/phone')
  const arrInput = [0, 1, 2, 3, 4, 5]
  const handleResend = async () => {
    await getCodeSms({
      phoneNumber: phone,
      lang: 'en'
    })
  }
  return (
    <div className="c-sms-input">
      <div className="c-sms-input--group">
        <div className="c-sms-input--group-input">
          {
            arrInput.map(el => (
              <input
                type='tel'
                key={el}
                maxLength={1}
                className={cn({ "g-input p-sms-register--input": true, "g-input-error": error })}
                onChange={(e) => { setValue(pre => pre + e.target.value) }}
              ></input>
            ))
          }
        </div>
        <div className="c-sms-input--group-resend">
          <div onClick={handleResend}>
            {useLocale('p.sms.register.resend')}
          </div>
        </div>
        <div className={cn({ "g-validate-text-error": true, 'c-sms-input--group-error': !error })}>{useLocale('validate.wrongcode')}</div>
      </div>
      <div className="c-sms-input--phone">
        <img src="/images/icon_mobile.svg" alt="icon-mobile"></img>
        <div>{useLocale('p.sms.register.endwith')} **{phone?.slice(-2)}</div>
      </div>
    </div >
  )
}

export default SmsInput