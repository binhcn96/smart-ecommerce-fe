import './assets/styles/main.scss';
import Layout from 'layouts';
import { Route, Routes } from "react-router-dom";
import { routerGuest, routerPrivate } from 'routes/routes';
import PrivateRouter from 'routes/privateRouter';
import GuestRouter from 'routes/guestRouter';
import NotFound from 'pages/notfound';
import { useSelector, useDispatch } from 'react-redux';
import Loading from 'components/loading';
import ErrorPage from 'pages/errorPage';
import { fetchUserInfo } from 'redux/action';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.app.loading)

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  if (loading === 'loading') return <Loading></Loading>

  if (loading === 'error') return <ErrorPage></ErrorPage>
  if (loading === 'done') {

    return (
      <>
        {
          <Layout>
            <Routes>
              <Route element={<PrivateRouter></PrivateRouter>}>
                {
                  routerPrivate.map(el => {
                    return (
                      <Route key={el.path} path={el.path} element={el.element} />
                    )
                  })
                }
              </Route>
              <Route element={<GuestRouter></GuestRouter>}>
                {
                  routerGuest.map(el => {
                    return (
                      <Route key={el.path} path={el.path} element={el.element} />
                    )
                  })
                }
              </Route>
              <Route path='*' element={<NotFound></NotFound>}></Route>
            </Routes>
          </Layout>
        }
      </>
    );
  }
}

export default App;
