import { gql } from "@apollo/client";

const GET_USUARIOS = gql`
  query Query {
    Usuarios {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

// Para Editar Usuario
const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };
