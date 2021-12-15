import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useUser } from 'context/userContext';
import PrivateComponent from './PrivateComponent'

const SidebarLinks = () => {
  const { userData } = useUser();
  const data = [userData?.data?.Login];
  if (data[0]?.correo) {
    return (
      <ul className='mt-12'>
        <SidebarRoute to='' title='Inicio' icon='fas fa-home' />
        <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
          <SidebarRoute to='/usuarios' title='Usuarios' icon='fas fa-users' />
        </PrivateComponent>
        <SidebarRoute to='/proyectos' title='Proyectos' icon='fas fa-smile-wink' />
        <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
          <SidebarRoute
            to='/inscripciones'
            title='Aprobacion Inscripciones'
            icon='fas fa-users'
          />
        </PrivateComponent>
        <SidebarRoute
          to={'/usuarios/editar/' + data[0]?._id}
          title='Mi Perfil'
          icon='fas fa-user'
        />
      </ul>
    );
  } else {
    return <div></div>;
  }
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src='mind-full.png' alt='Logo' className='h-16' />
      <span className='my-2 text-xl font-bold text-center'>Full Stack Minds Admin</span>
    </div>
  );
};

const LoggedUser = () => {
  const { userData, setUserData } = useUser();
  const data = [userData?.data?.Login];

  const handleLogout = () => {
    setUserData();
    localStorage.removeItem('token');
    navigate('/');
  };
  const navigate = useNavigate();
  return (
    <div class='relative h-32 w-48 ...'>
      <div class='absolute inset-x-0 bottom-0 h-0 ...'>
        {data[0]?.correo &&
          data?.map((user) => (
            <>
              <i className='fas fa-user-circle mr-1' />
              {user?.nombre} {user?.apellido}
              <br />
              <span>
                <button
                  onClick={handleLogout}
                  className='mt-2 px-2 py-1 text-white bg-blue-500 hover:bg-blue-400 rounded-md'
                >
                  Logout
                </button>
              </span>
            </>
          ))}
      </div>
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
          <LoggedUser />
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
