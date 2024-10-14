// App.tsx
import React from 'react';
import './App.css';
import Home from '../pages/home';

import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './auth/AuthContext';
import EditBurgerMenu from '../pages/admin/edit-burger-menu';
import EditAppConfigPage from '../pages/admin/edit-app-config';
import AddYandexMetrica from '../pages/admin/add-yandex-metrica';
import EditRobotsTxt from '../pages/admin/edit-robots-txt';
import EditQuiz from '../pages/admin/edit-quiz';
import EditFaq from '../pages/admin/edit-faq';
import FileUploadMainImage from '../pages/admin/edit-main-image';
import CallToActionPage from '../pages/call-to-action-page';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainLayout from './main-layout';
import LoginPage from './auth/LoginPage';
import ErrorPage404 from '../pages/error-page-404';
import ContactUs from '../pages/contact-us';
import OfferAgreement from '../pages/offer-agreement';
import UserAgreement from '../pages/user-agreement';
import PrivacyPolicy from '../pages/privacy-policy';
import { FcAbout } from 'react-icons/fc';

const App: React.FC = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} errorElement={<ErrorPage404 />}>
       
        <Route index element={<Home />} />
        
        <Route path="/login" element={<LoginPage />} />

        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/offers" element={<OfferAgreement />} />
        <Route path="/user-agreement" element={<UserAgreement />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<FcAbout />} />
        <Route path="/call-to-action" element={<CallToActionPage />} />
         {/* Защищённые маршруты через PrivateRoute */}
         <Route element={<PrivateRoute />}>
        
                <Route path="/admin/edit-burger-menu" element={<EditBurgerMenu />} />
                <Route path="/admin/site-settings" element={<EditAppConfigPage />} />
                <Route path="/admin/add-yandex-metrica" element={<AddYandexMetrica />} />
                <Route path="/admin/edit-robots-txt" element={<EditRobotsTxt />} />
                <Route path="/admin/edit-quiz" element={<EditQuiz />} />
                <Route path="/admin/edit-faq" element={<EditFaq />} />
                <Route path="/admin/edit-main-image" element={<FileUploadMainImage />} />
             

           
          
            
        </Route>
        <Route path="*" element={<ErrorPage404 />} />
      </Route>
    )
  );


  return <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>;
}

export default App;
