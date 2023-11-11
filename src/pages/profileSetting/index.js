import Modal from "components/modal";
import ProfileSettingItem from "components/profileSettingItem";
import { headTableProfile } from "constants/constant";
import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeLoading, changePath, changeUserInfo } from "redux/slice";
import { checkFiledExist, updateUser } from "services/user";
import { statusResponse } from "util/common";
import ChangeProfile from "components/changeProfile";

const ProfileSetting = () => {
  const { t } = useTranslation()
  const user = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [currentInfo, setCurrentInfo] = useState()
  const [errorInput, setErrorInput] = useState(false)
  const [newText, setNewText] = useState()
  const [newPassword, setNewPassword] = useState()
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
      let data
      switch (currentInfo) {
        case 'email':
        case 'user_name':
        case 'phone_number':
        case 'address':
          data = {
            fieldName: currentInfo,
            fieldData: {
              [currentInfo]: newText,
            }
          }
          const res = await checkFiledExist(data)
          if (res.status === statusResponse.FAIL) {
            throw new Error('Field exist')
          }
          break;
        case 'password':
          data = {
            fieldName: currentInfo,
            fieldData: {
              old_password: newText,
              new_password: newPassword
            }
          }
          break;

        default:
          break;
      }
      await updateUser(data)
      dispatch(changeUserInfo({ [currentInfo]: newText }))
      dispatch(changeLoading(false))
      setShowModal(false)
      setShowSuccess(true)
    } catch (error) {
      setErrorInput(true)
      dispatch(changeLoading(false))
    }
  }

  const renderTitleModal = () => {
    let titleInfo = {}
    switch (currentInfo) {
      case 'email':
        titleInfo.title = 'p.profile.setting.modal.email'
        titleInfo.titleSuccess = 'p.profile.setting.modal.email.success'
        break;
      case 'user_name':
        titleInfo.title = 'p.profile.setting.modal.username'
        titleInfo.titleSuccess = 'p.profile.setting.modal.username.success'
        break;
      case 'phone_number':
        titleInfo.title = 'p.profile.setting.modal.phone_number'
        titleInfo.titleSuccess = 'p.profile.setting.modal.phone_number.success'
        break;
      case 'address':
        titleInfo.title = 'p.profile.setting.modal.address'
        titleInfo.titleSuccess = 'p.profile.setting.modal.address.success'
        break;
      case 'password':
        titleInfo.title = 'p.profile.setting.modal.password'
        titleInfo.titleSuccess = 'p.profile.setting.modal.password.success'
        break;

      default:
        titleInfo.title = 'p.profile.setting.modal.username'
        titleInfo.titleSuccess = 'p.profile.setting.modal.username.success'
        break;
    }
    return titleInfo
  }

  const handleChangeInput = (e, mode) => {
    switch (mode) {
      case 'email':
      case 'user_name':
      case 'old_password':
      case 'phone_number':
      case 'address':
        setNewText(e.target.value)
        break;
      case 'new_password':
        setNewPassword(e.target.value)
        break;

      default:
        break;
    }
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
            onCancel={() => { setShowModal(false); setErrorInput(false) }}
            title={t(renderTitleModal().title)}
            onConfirm={handleConfirm}
          >
            {
              currentInfo === 'email' &&
              <ChangeProfile
                title={{
                  title: 'p.profile.setting.modal.email.des',
                }}
                inputBlock={[
                  {
                    label: 'p.profile.setting.modal.email.title',
                    errorText: 'p.profile.setting.modal.email.exist',
                    mode: 'email',
                    onChange: handleChangeInput,
                    isError: errorInput
                  }
                ]}
              />
            }
            {
              currentInfo === 'user_name' &&
              <ChangeProfile
                title={{
                  title: 'p.profile.setting.modal.username.title',
                }}
                inputBlock={[
                  {
                    label: 'p.profile.setting.modal.username.label',
                    errorText: 'p.profile.setting.modal.username.exist',
                    mode: 'user_name',
                    onChange: handleChangeInput,
                    isError: errorInput
                  }
                ]}
              />
            }
            {
              currentInfo === 'password' &&
              <ChangeProfile
                title={{
                  title: 'p.profile.setting.modal.password.title',
                }}
                inputBlock={[
                  {
                    label: 'p.profile.setting.modal.password.label.old',
                    mode: 'old_password',
                    onChange: handleChangeInput,
                  },
                  {
                    label: 'p.profile.setting.modal.password.label.new',
                    errorText: 'p.profile.setting.modal.password.exist',
                    mode: 'new_password',
                    onChange: handleChangeInput,
                    isError: errorInput
                  }
                ]}
              />
            }
            {
              currentInfo === 'phone_number' &&
              <ChangeProfile
                title={{
                  title: 'p.profile.setting.modal.phone_number.title',
                }}
                inputBlock={[
                  {
                    label: 'p.profile.setting.modal.phone_number.label',
                    errorText: 'p.profile.setting.modal.phone_number.exist',
                    mode: 'phone_number',
                    onChange: handleChangeInput,
                    isError: errorInput
                  }
                ]}
              />
            }
            {
              currentInfo === 'address' &&
              <ChangeProfile
                title={{
                  title: 'p.profile.setting.modal.address.title',
                }}
                inputBlock={[
                  {
                    label: 'p.profile.setting.modal.address.label',
                    errorText: 'p.profile.setting.modal.address.exist',
                    mode: 'address',
                    onChange: handleChangeInput,
                    isError: errorInput
                  }
                ]}
              />
            }
          </Modal>
        )
      }
      {
        showSuccess && (
          <Modal
            title={t(renderTitleModal().title)}
            onCancel={() => { setShowSuccess(false) }}
            isShowConfirm={false}
          >
            <div className="p-profile-setting-success">
                <div className="c-success-img">
                  <img src="/images/icon_circle.svg" className="c-success-img-circle" alt="logo-circle"></img>
                  <img src="/images/icon_success.svg" className="c-success-img-success" alt="logo-success"></img>
                </div>
              <div>
                {t(renderTitleModal().titleSuccess)}
              </div>
            </div>
          </Modal>
        )
      }
    </div>
  )
}

export default ProfileSetting