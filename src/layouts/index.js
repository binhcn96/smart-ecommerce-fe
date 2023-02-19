import Header from "components/header"
import TooltipComponent from "components/tooltip"
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'
import SideBar from "components/sidebar"
import { useTranslation } from 'react-i18next';
import SideBarMobile from "components/sidebarMobile"
import Loading from "components/loading"
import { title_body } from "constants/constant"
import { useState } from "react"
import Modal from "components/modal"
import Dropzone from "react-dropzone"
import AvatarEditor from "react-avatar-editor"
import { async } from "@firebase/util"
import { upLoadAvatar } from "redux/action"
import { statusResponse } from "util/common"

const Layout = ({ children }) => {
  const user = useSelector(state => state.app.user)
  const showMenu = useSelector(state => state.app.showMenu)
  const loadingPage = useSelector(state => state.app.loadingPage)
  const path = useSelector(state => state.app.path)
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [avatar, setAvatar] = useState()
  const [scale, setScale] = useState(1.2)
  const [rotate, setRotate] = useState(0)
  const [isAvatar, setIsAvatar] = useState(false)

  const dispatch = useDispatch()
  const handleDrop = (dropped) => {
    setAvatar(dropped[0])
  }

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1)
      n -= 1 // to make eslint happy
    }
    return new File([u8arr], filename, { type: mime })
  }
  let fileAvatar
  const handleResultAvatar = (editor) => {
    if (editor) {
      const base64 = editor.getImageScaledToCanvas().toDataURL()
      fileAvatar = dataURLtoFile(base64, 'avatar.png')
      setIsAvatar(true)
    }
  }

  const hanldeUploadAvata = async () => {
    const res = await dispatch(upLoadAvatar(fileAvatar))
    if (res.status === 200) {
      setShowModal(false)
    }
  }

  return (
    <div className="l-layout">
      {loadingPage && (
        <div className="l-layout-loading">
          <Loading />
        </div>
      )}
      <div>
        <TooltipComponent />
      </div>
      {
        user && (
          <div className="l-layout-header">
            <Header></Header>
          </div>
        )
      }
      <div className={cn({ "l-layout-container": !!user })}>
        {
          user && (
            <>
              <div className={cn({ "l-layout-sidebar": true, 'l-layout-hidenMenu': !showMenu, 'l-layout-showMenu': showMenu })}>
                <div className="l-layout-sidebar-container">
                  <div className="l-layout-sidebar-container-box">
                    <div>
                      <SideBar onShowModal={() => setShowModal(true)}></SideBar>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cn({ "l-layout-sidebar-mobile": true, "l-layout-sidebar-mobile-hide": !showMenu })}>
                <SideBarMobile onShowModal={() => setShowModal(true)}></SideBarMobile>
              </div>
            </>
          )
        }
        <div className="l-layout-body">
          {
            user && (
              <div className="l-layout-search">
                <form className="l-layout-search-form">
                  <input className="l-layout-search-form-input" placeholder={t('l.layout.search')}></input>
                  <button className="l-layout-search-form-btn" id='tooltip-l-layout-serch-btn'>
                    <img src="/images/icon-search.svg" alt='search'></img>
                  </button>
                </form>
              </div>
            )
          }
          <div className="l-layout-content">
            {
              user && (
                <div className="l-layout-content-title">
                  <img src={title_body[path]?.imgUrl} alt="title" className="l-layout-content-title-icon"></img>
                  <div className="l-layout-content-title-text">{t(title_body[path]?.title)}</div>
                </div>
              )
            }
            <div className={cn({ "l-layout-content-body": user })}>
              {children}
            </div>
          </div>
        </div>
      </div>
      {
        showModal && (
          <Modal
            onCancel={() => setShowModal(false)}
            title={t('l.layout.avatar.title')}
            disabled={!isAvatar ? true : false}
            onConfirm={hanldeUploadAvata}
          >
            <div className="l-layout-modal">
              <div className="l-layout-modal-content">{t('l.layout.avatar.content')}</div>
              <div className="l-layout-modal-avatar">
                <div className="l-layout-modal-avatar-dropzone">
                  <Dropzone
                    onDrop={handleDrop}
                    noClick
                    noKeyboard
                    style={{ width: '200px', height: '200px' }}
                  >

                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        {
                          avatar && (
                            <AvatarEditor
                              width={200}
                              height={200}
                              image={avatar}
                              border={20}
                              borderRadius={100}
                              scale={scale}
                              rotate={rotate}
                              ref={handleResultAvatar}
                            />
                          )
                        }
                        <input {...getInputProps()} id='l-layout-drop-avatar' onChange={(e) => { setAvatar(e.target.files[0]) }} />

                        {
                          !avatar && (
                            <>
                              <img src='/images/icon_drop_avatar.svg' alt="srop-avatar" className="l-layout-modal-avatar-drop"></img>
                              <p className="l-layout-modal-avatar-description">{t('l.layout.avatar.drop')}</p>
                              <label htmlFor="l-layout-drop-avatar" className="l-layout-modal-avatar-select">
                                <div>{t('l.layout.avatar.select')}</div>
                              </label>
                            </>
                          )
                        }
                      </div>
                    )}
                  </Dropzone>
                </div>
                {
                  avatar && (
                    <>
                      <div className="l-layout-modal-avatar-range">
                        <div className="l-layout-modal-avatar-range-group">
                          <div>{t('l.layout.avatar.scale')}</div>
                          <input type='range' min={0.5} max={1.5} step={0.01} defaultValue={1} onChange={(e) => setScale(e.target.value)}></input>
                        </div>
                        <div className="l-layout-modal-avatar-range-group">
                          <div>{t('l.layout.avatar.rotate')}</div>
                          <input type='range' min={0} max={360} defaultValue={0} onChange={(e) => setRotate(e.target.value)}></input>
                        </div>
                      </div>
                      <div className="l-layout-modal-avatar-delete" onClick={() => setAvatar(null)}>{t('l.layout.avatar.delete')}</div>
                    </>
                  )
                }
              </div>
            </div>
          </Modal>
        )
      }
    </div >
  )
}

export default Layout