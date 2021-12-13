import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTRO } from 'graphql/auth/mutations';
import { Enum_Rol } from 'utils/enums';
import { useUser } from 'context/userContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const jwt = require('jsonwebtoken');

const Register = () => {
  const { userData, setUserData } = useUser();

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  const roles = Object.keys(Enum_Rol);

  const [registro, { data, loading, error }] = useMutation(REGISTRO);
  if (error) return `Submission error! ${error.message}`;

  const handleRegister = (user) => {
    setUserData(user);
    const token = jwt.sign(user, 'this-is-our-misiontic-2022-secret-key', { expiresIn: '24h' });
    localStorage.setItem('token', token);
    navigate('/');
    toast('Usuario creado correctamente.', {
      icon: '✔',
    });
  };

  const register = (e) => {
    e.preventDefault();
    registro({
      variables: {
        nombre: name,
        apellido: lastName,
        identificacion: id,
        correo: email,
        rol: rol,
        password: password,
      },
    })
      .then((user) => handleRegister(user))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className='flex justify-center'>
        <h1 className='text-4xl font-bold text-blue-500'>Registro</h1>
      </div>
      <form onSubmit={register} className='flex flex-col justify-center items-center'>
        <label className='my-3 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
          Nombres:
        </label>
        <input
          type='text'
          className='shadow appearance-none border border-gray-500 rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
          Apellidos:
        </label>
        <input
          type='text'
          className='shadow appearance-none border border-gray-500 rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
          Identificación:{' '}
        </label>
        <input
          type='number'
          className='shadow appearance-none border border-gray-500 rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={(e) => setId(e.target.value)}
        />
        <br />
        <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
          Email:{' '}
        </label>
        <input
          type='email'
          className='shadow appearance-none border border-gray-500 rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
          Contraseña:{' '}
        </label>
        <input
          type='password'
          className='shadow appearance-none border border-gray-500 rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
          Rol Deseado:{' '}
        </label>
        <select
          className='shadow appearance-none border border-gray-500 rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={(e) => setRol(e.target.value)}
        >
          <option value=''></option>
          {roles.map((rol) => (
            <option value={rol} key={rol}>
              {rol}
            </option>
          ))}
        </select>
        <br />
        <input
          type='submit'
          value='Registrarse'
          className='bg-blue-500 text-white font-bold text-lg py-3 px-3  rounded-xl hover:bg-blue-400 shadow-md disabled:opacity-50 disabled:bg-gray-700'
        />
        <Link to='/'>
          <button className='mt-6 text-lg font-semibold border-b-2 border-gray-500 text-gray-500 hover:border-blue-500 hover:text-blue-400'>
            Login
          </button>
        </Link>
      </form>
    </>
  );
};

export default Register;
