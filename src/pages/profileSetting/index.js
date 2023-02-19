import Modal from "components/modal";
import ProfileSettingItem from "components/profileSettingItem";
import { headTableProfile } from "constants/constant";
import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeLoading, changePath } from "redux/slice";
import { changeEmailProfile, checkFiledExist } from "services/user";
import cn from 'classnames'
import { statusResponse } from "util/common";
import Success from "components/success";

const ProfileSetting = () => {
  const { t } = useTranslation()
  const user = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [currentInfor, setCurrentInfo] = useState()
  const [errorEmail, setErrorEmail] = useState()
  const [newEmail, setNewEmail] = useState()
  const [showSuccess, setShowSuccess] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changePath('profileSetting'))
  }, [dispatch])
  const handleClickChange = (data) => {
    setShowModal(true)
    setCurrentInfo(data.info)
  }

  const handleConfirm = async () => {
    try {
      dispatch(changeLoading(true))
      if (currentInfor === 'email') {
        const data = {
          fieldName: 'email',
          fieldValue: newEmail
        }
        const res = await checkFiledExist(data)
        if (res.status === statusResponse.SUCCESS) {
          await changeEmailProfile(data)
        }
      }
      dispatch(changeLoading(false))
      setShowSuccess(true)
    } catch (error) {
      setErrorEmail(true)
      dispatch(changeLoading(false))
    }
  }

  const renderTitleModal = () => {
    const title = currentInfor === 'email' ? 'p.profile.setting.modal.email' :
      currentInfor === 'user_name' ? 'p.profile.setting.modal.username' :
        currentInfor === 'password' ? 'p.profile.setting.modal.password' :
          currentInfor === 'phone_number' ? 'p.profile.setting.modal.phone_number' :
            'p.profile.setting.modal.address'
    return title
  }

  return (
    <div className="p-profile-setting">
      <div className="p-profile-setting-title">{t('p.profile.setting.title')}</div>
      <div className="p-profile-setting-description">{t('p.profile.setting.description')}</div>
      <div className="p-profile-setting-table">
        {
          headTableProfile.map(el => (
            <div className="p-profile-setting-table-row" key={el.title}>
              <ProfileSettingItem
                head={el.title}
                body={user[el.info]}
                onClick={() => handleClickChange(el)}
              />
            </div>
          ))
        }
      </div>
      {
        showModal && (
          <Modal
            onCancel={() => setShowModal(false)}
            title={t(renderTitleModal())}
            onConfirm={handleConfirm}
          >
            {
              currentInfor === 'email' && (
                <div className="p-profile-setting-modal">
                  <p className="p-profile-setting-modal-title">{t('p.profile.setting.modal.email.des')}</p>
                  <div className="p-profile-setting-modal-group">
                    <div className="p-profile-setting-modal-brand">
                      {t('p.profile.setting.modal.email.title')}
                    </div>
                    <input className={`g-input p-profile-setting-modal-input ${errorEmail && 'p-profile-setting-modal-input-error'}`} onChange={(e) => { setNewEmail(e.target.value); setErrorEmail(false) }}></input>
                    <div className={cn({ 'p-profile-setting-modal-error': errorEmail, 'p-profile-setting-modal-message': true })}>{t('p.profile.setting.modal.email.exist')}</div>
                  </div>
                </div>
              )
            }
          </Modal>
        )
      }
      {
        showSuccess && (
          <Success>
            <div>{t('p.profile.setting.modal.email.success')}</div>
          </Success>
        )
      }
    </div>
  )
}

export default ProfileSetting