import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useUser } from 'context/userContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUser();
  const loggedUser = [userData?.data?.Login];
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const [loginQuery, { data, loading, error }] = useMutation(LOGIN);

  const login = async (e) => {
    e.preventDefault();
    loginQuery({
      variables: {
        correo: correo,
        password: password,
      },
    }).then((user) => setUserData(user));

    navigate('/');
  };

  return (
    <div>
      <form onSubmit={login}>
        <label>Email: </label>
        <input type='text' onChange={(e) => setCorreo(e.target.value)} />
        <br />
        <label>Password: </label>
        <input type='password' onChange={(e) => setPassword(e.target.value)} />
        <br />
        <input type='submit' value='Login' />
        <br />
        <br />
        <Link to='/register'>
          <button>Register</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
