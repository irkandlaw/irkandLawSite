import React from 'react';
import { Outlet } from 'react-router-dom';
import BurgerMenu from '../burger-menu';
import Footer from '../../components/footer';
// import NavBar from '../nav-bar';

const MainLayout: React.FC = () => {
  return (
    <div className='bg-custom-black font-sans'>
      {/* <NavBar /> */}
      <BurgerMenu />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

