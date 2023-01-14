import './assets/styles/main.scss';
import Layout from 'layouts';
import { RouterProvider } from "react-router-dom";
import router from 'routes/routes';


function App() {
  return (
    <>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </>
  );
}

export default App;
