import { gql } from '@apollo/client';

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
export { GET_USUARIO };
