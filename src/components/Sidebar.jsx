import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SidebarLinks = () => {
  return (
    <ul className='mt-12'>
      <SidebarRoute to='' title='Inicio' icon='fas fa-home' />
      <SidebarRoute to='/page2' title='Pagina2' icon='fas fa-smile-wink' />
      <SidebarRoute to='/category1' title='Catego 1' icon='fab fa-amazon' />
      <SidebarRoute to='/category1/page1' title='Test' icon='fas fa-car' />
      <SidebarRoute to='/usuarios' title='Usuarios' icon="fas fa-users" />
    </ul>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src='mind-full.png' alt='Logo' className='h-16' />
      <span className='my-2 text-xl font-bold text-center'>Full Stack Minds Admin</span>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <i className={`fas fa-${open ? 'times' : 'bars'}`} onClick={() => setOpen(!open)} />
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar bg-white h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route shadow-lg text-white bg-blue-500 '
            : 'transition sidebar-route text-gray-900 hover:text-white hover:bg-blue-400 hover:bg-opacity-80'
        }
      >
        <div className='flex items-center'>
          <i className={`${icon} mr-1`} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
