import Modal from "components/modal";
import ProfileSettingItem from "components/profileSettingItem";
import { headTableProfile } from "constants/constant";
import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeLoading, changePath } from "redux/slice";
import { changeEmailProfile, checkFiledExist, updateUser } from "services/user";
import { statusResponse } from "util/common";
import Success from "components/success";
import ChangeProfile from "components/changeProfile";

const ProfileSetting = () => {
  const { t } = useTranslation()
  const user = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [currentInfor, setCurrentInfo] = useState()
  const [errorInput, setErrorInput] = useState(false)
  const [newText, setNewText] = useState()
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
      switch (currentInfor) {
        case 'email':
        case 'user_name':
          data = {
            fieldName: currentInfor,
            fieldValue: newText
          }
          const res = await checkFiledExist(data)
          if (res.status === statusResponse.FAIL) {
            throw new Error('Field exist')
          }
          break;

        default:
          break;
      }
      await updateUser(data)
      dispatch(changeLoading(false))
      setShowSuccess(true)
    } catch (error) {
      setErrorInput(true)
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

  const handleChangeInput = (e, mode) => {
    switch (mode) {
      case 'email':
      case 'user_name':
        setNewText(e.target.value)
        break;

      default:
        break;
    }
    console.log(e.target.value, mode)
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
              currentInfor === 'email' &&
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
              currentInfor === 'user_name' &&
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
              currentInfor === 'password' &&
              <ChangeProfile
                title={{
                  title: 'p.profile.setting.modal.password.title',
                }}
                inputBlock={[
                  {
                    label: 'p.profile.setting.modal.password.label.old',
                    mode: 'password',
                    onChange: handleChangeInput,
                  },
                  {
                    label: 'p.profile.setting.modal.password.label.new',
                    errorText: 'p.profile.setting.modal.password.exist',
                    mode: 'cfpassword',
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
          <Success>
            <div>{t('p.profile.setting.modal.email.success')}</div>
          </Success>
        )
      }
    </div>
  )
}

export default ProfileSetting