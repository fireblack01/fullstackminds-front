import { gql } from '@apollo/client';

const REGISTRO = gql`
  mutation CrearUsuario(
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $rol: Enum_Rol!
    $password: String!
  ) {
    crearUsuario(
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      rol: $rol
      password: $password
    ) {
      _id
      nombre
      apellido
      correo
      identificacion
      rol
      password
      estado
    }
  }
`;

const LOGIN = gql`
  mutation Login($correo: String!, $password: String!) {
    Login(correo: $correo, password: $password) {
      _id
      nombre
      apellido
      correo
      identificacion
      rol
      estado
    }
  }
`;

export { REGISTRO, LOGIN };
