import Header from "components/header"
import Loading from "components/loading"
import TooltipComponent from "components/tooltip"
import { useSelector } from 'react-redux'
import cn from 'classnames'
import SideBar from "components/sidebar"

const Layout = ({ children }) => {
  const user = useSelector(state => state.app.user)
  const loading = useSelector(state => state.app.loading)
  const showMenu = useSelector(state => state.app.showMenu)
  return (
    <div className="l-layout">
      {loading && (
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
            <div className={cn({ "l-layout-sidebar": true, 'l-layout-hidenMenu': !showMenu, 'l-layout-showMenu': showMenu })}>
              <div className="l-layout-sidebar-container">
                <div className="l-layout-sidebar-container-box">
                  <div>
                    <SideBar></SideBar>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Layout