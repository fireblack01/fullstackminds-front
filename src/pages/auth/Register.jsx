import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTRO } from 'graphql/auth/mutations';
import { Enum_Rol } from 'utils/enums';

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  const roles = Object.keys(Enum_Rol);

  const [registro, { data, loading, error }] = useMutation(REGISTRO);
  if (error) return `Submission error! ${error.message}`;
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
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    // console.log(name, lastName, id, email, password, rol);
  };

  return (
    <div>
      <form onSubmit={register}>
        <label>Nombres:</label>
        <input type='text' onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Apellidos:</label>
        <input type='text' onChange={(e) => setLastName(e.target.value)} />
        <br />
        <label>Identificación: </label>
        <input type='number' onChange={(e) => setId(e.target.value)} />
        <br />
        <label>Email: </label>
        <input type='email' onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Contraseña: </label>
        <input type='password' onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label>Rol Deseado: </label>
        <select onChange={(e) => setRol(e.target.value)}>
          <option value=''></option>
          {roles.map((rol) => (
            <option value={rol} key={rol}>
              {rol}
            </option>
          ))}
        </select>
        <br />
        <input type='submit' value='Registrarse' />
      </form>
    </div>
  );
};

export default Register;
