import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
  Public, Offer, Deal, PageContent, User, CategoryAdd,
  Dashboard, Store, New, Widget, Menu, ContentConfig,
  GlobalConfig, AuthorConfig, SocialConfig, SeoConfig,
} from './page';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Public />}>
            <Route index element={<Dashboard />} />
            <Route path="/store" element={<Store />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/deal" element={<Deal />} />
            <Route path="/new" element={<New />} />
            <Route path="/page-content" element={<PageContent />} />
            <Route path="/widget" element={<Widget />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/user" element={<User />} />
            <Route path="/global-config" element={<GlobalConfig />} />
            <Route path="/author-config" element={<AuthorConfig />} />
            <Route path="/social-config" element={<SocialConfig />} />
            <Route path="/seo-config" element={<SeoConfig />} />
            <Route path="/content-config" element={<ContentConfig />} />
            <Route path="/category-add" element={<CategoryAdd />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"/>
    </>
  )
}

export default App
