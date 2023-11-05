import React from "react";
import { useTranslation } from "react-i18next";
import cn from "classnames";

const ChangeProfile = (props) => {
  const { title, inputBlock } = props
  const { t } = useTranslation()
  return (
    <div>
      <p className="c-changeProfile-title">{t(title.title)}</p>
      {title.sub_title && <p className="c-changeProfile-subTitle">{t(title.sub_title)}</p>}
      <div className="">
        {
          inputBlock.map(el => (
            <div key={el.label} className="c-changeProfile-box">
              <div className="c-changeProfile-box-label">
                {t(el.label)}
              </div>
              <input className={'g-input c-changeProfile-box-input'}
                onChange={(e) => el.onChange(e, el.mode)}
              ></input>
              {
                el.errorText && (
                  <div className={el.isError ? 'c-changeProfile-show-error' : 'c-changeProfile-hidden-error'}>
                    {t(el.errorText)}
                  </div>
                )
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ChangeProfile