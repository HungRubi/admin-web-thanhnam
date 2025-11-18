import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import * as actions from './store/actions'
import "react-toastify/dist/ReactToastify.css";
import {
  Public, Offer, Deal, PageContent, User, CategoryAdd,
  Dashboard, Store, New, Widget, Menu, ContentConfig,
  GlobalConfig, AuthorConfig, SocialConfig, SeoConfig,
  CategoryEdit, StoreAdd, StoreEdit, OfferAdd
} from './page';

function App() {
  const dispatch = useDispatch();
  const {message} = useSelector(state => state.app);
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    dispatch(actions.resetMessage());
  }, [message, dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Public />}>
            <Route index element={<Dashboard />} />
            <Route path='/category/:id' element={<CategoryEdit />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/add" element={<StoreAdd />} />
            <Route path="/store/:id" element={<StoreEdit />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/offer/add" element={<OfferAdd />} />
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
        position="bottom-right"
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
