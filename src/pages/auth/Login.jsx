import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useUser } from 'context/userContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const jwt = require('jsonwebtoken');

const Login = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUser();
  const loggedUser = [userData?.data?.Login];
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const [loginQuery, { data, loading, error }] = useMutation(LOGIN);

  const handleLogin = (user) => {
    if (user.data.Login !== null) {
      setUserData(user);
      const token = jwt.sign(user, 'this-is-our-misiontic-2022-secret-key', { expiresIn: '24h' });
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      toast('Credenciales incorrectas. Intente nuevamente.', {
        icon: '❌',
      });
      setCorreo('');
      setPassword('');
    }
  };

  const login = async (e) => {
    e.preventDefault();
    loginQuery({
      variables: {
        correo: correo,
        password: password,
      },
    }).then((user) => handleLogin(user));
  };

  return (
    <>
      <div className='flex justify-center'>
        <h1 className='text-4xl font-bold text-blue-500'>Login</h1>
      </div>
      <form onSubmit={login} className='flex flex-col justify-center items-center'>
        <label className='my-3 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
          Email:{' '}
        </label>
        <input
          type='text'
          value={correo}
          className='shadow appearance-none border border-gray-500 rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={(e) => setCorreo(e.target.value)}
        />
        <br />
        <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
          Password:{' '}
        </label>
        <input
          type='password'
          value={password}
          className='shadow appearance-none border border-gray-500 rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type='submit'
          value='Login'
          className='bg-blue-500 text-white font-bold text-lg py-3 px-3  rounded-xl hover:bg-blue-400 shadow-md disabled:opacity-50 disabled:bg-gray-700'
        />
        <br />
        <Link to='/register'>
          <button className='text-lg font-semibold border-b-2 border-gray-500 text-gray-500 hover:border-blue-500 hover:text-blue-500'>
            Registrarse
          </button>
        </Link>
      </form>
    </>
  );
};

export default Login;
