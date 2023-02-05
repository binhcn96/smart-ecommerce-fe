import Header from "components/header"
import TooltipComponent from "components/tooltip"
import { useSelector } from 'react-redux'
import cn from 'classnames'
import SideBar from "components/sidebar"
import { useTranslation } from 'react-i18next';
import SideBarMobile from "components/sidebarMobile"
import Loading from "components/loading"
import { title_body } from "constants/constant"

const Layout = ({ children }) => {
  const user = useSelector(state => state.app.user)
  const showMenu = useSelector(state => state.app.showMenu)
  const loading = useSelector(state => state.app.loading)
  const path = useSelector(state => state.app.path)
  const { t } = useTranslation()

  return (
    <div className="l-layout">
      {loading === 'loading' && (
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
                      <SideBar></SideBar>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cn({ "l-layout-sidebar-mobile": true, "l-layout-sidebar-mobile-hide": !showMenu })}>
                <SideBarMobile></SideBarMobile>
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
            <div className="l-layout-content-title">
              <img src={title_body[path]?.imgUrl} alt="title" className="l-layout-content-title-icon"></img>
              <div className="l-layout-content-title-text">{t(title_body[path]?.title)}</div>
            </div>
            <div className={cn({ "l-layout-content-body": user })}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout