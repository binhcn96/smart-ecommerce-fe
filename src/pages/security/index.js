import TwoFaItem from "components/twoStepItem";
import { twoStep } from "constants/constant";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changePath } from "redux/slice";

const Security = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changePath('security'))
  }, [dispatch])

  return (
    <div className="p-security">
      <div className="p-security-title">{t('p.security.twofa')}</div>
      <div className="p-security-description">{t('p.security.description')}</div>
      <div className="p-security-group">
        {
          twoStep.map(el => (
            <div className="p-security-twofa">
              <TwoFaItem
                img={el.urlImg}
                title={el.title}
                description={el.description}
                tooltip={el.tooltip}
              ></TwoFaItem>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Security