import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import * as actions from './store/actions'
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from './components';
import {
  Public, Offer, Deal, PageContent, User, CategoryAdd,
  Dashboard, Store, New, Widget, Menu, ContentConfig,
  GlobalConfig, AuthorConfig, SocialConfig, SeoConfig,
  CategoryEdit, StoreAdd, StoreEdit, OfferAdd, OfferEdit,
  DealAdd, DealEdit, NewAdd, NewEdit, PageContentAdd, PageContentEdit,
  WidgetAdd, WidgetEdit,UserAdd,UserEdit,MenuAdd,MenuEdit, File, Login

} from './page';

function App() {
  const dispatch = useDispatch();
  const {message} = useSelector(state => state.app);
  const { initialized } = useSelector(state => state.user);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(actions.resetMessage());
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (!initialized) {
      dispatch(actions.getCurrentUser());
    }
  }, [initialized, dispatch]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Public />
            </ProtectedRoute>
          }
        >
            <Route index element={<Dashboard />} />
            <Route path='/category/:id' element={<CategoryEdit />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/add" element={<StoreAdd />} />
            <Route path="/store/:id" element={<StoreEdit />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/offer/add" element={<OfferAdd />} />
            <Route path="/offer/:id" element={<OfferEdit />} />
            <Route path="/deal" element={<Deal />} />
            <Route path="/deal/add" element={<DealAdd />} />
            <Route path="/deal/:id" element={<DealEdit />} />
            <Route path="/new" element={<New />} />
            <Route path="/new/add" element={<NewAdd />} />
            <Route path="/new/:id" element={<NewEdit />} />
            <Route path="/page-content" element={<PageContent />} />
            <Route path="/page-content/add" element={<PageContentAdd />} />
            <Route path="/page-content/:id" element={<PageContentEdit />} />
            <Route path="/widget/add" element={<WidgetAdd />} />
            <Route path="/widget/:id" element={<WidgetEdit />} />
            <Route path="/widget" element={<Widget />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/add" element={<MenuAdd />} />
            <Route path="/menu/:id" element={<MenuEdit />} />
            <Route path="/file" element={<File />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/add" element={<UserAdd />} />
            <Route path="/user/:id" element={<UserEdit />} />
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
