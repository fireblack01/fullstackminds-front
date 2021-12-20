import React, { useState, useEffect } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { Auth0Provider } from '@auth0/auth0-react';
import { UserContext } from 'context/userContext';
import Index from 'pages/Index';
import Page2 from 'pages/Page2';
import IndexCategory1 from 'pages/category1/Index';
import Category1 from 'pages/category1/CategoryPage1';
import IndexUsuarios from 'pages/usuarios/Index';
import EditarUsuario from 'pages/usuarios/editar';
import Register from 'pages/auth/Register';
import Login from 'pages/auth/Login';
import 'styles/globals.css';
import 'styles/tabla.css';
import { toast } from 'react-toastify';
import IndexProyectos from 'pages/proyectos/Index';
import NuevoProyecto from 'pages/proyectos/NuevoProyecto';
import IndexInscripciones from 'pages/inscripciones/Index';
const jwt = require('jsonwebtoken');

// import PrivateRoute from 'components/PrivateRoute';
// const httpLink = createHttpLink({
//   uri: 'http://localhost:3001/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = JSON.parse(localStorage.getItem('token'));
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: authLink.concat(httpLink),
  uri: 'https://fullstackminds-back.herokuapp.com/graphql:3001',
});

function App() {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      jwt.verify(token, 'this-is-our-misiontic-2022-secret-key', (err, decoded) => {
        if (err) {
          toast('Su sesión ha expirado.', {
            icon: '❌',
          });
          localStorage.removeItem('token');
        }
        setUserData(decoded);
      });
    }
  }, [token]);

  return (
    <ApolloProvider client={client}>
      {/* <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}> */}
      {/* <Auth0Provider
       domain="auth-mintic-ingedevs.us.auth0.com"
       clientId="ijFepcC5ZzLyvSQMLYcIOziFHeRAnM1q"
       redirectUri={window.location.origin}
       //audience='api-autenticacion-concesionario-mintic'
     > */}
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            {userData?.data ? (
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='page2' element={<Page2 />} />
                <Route path='category1' element={<IndexCategory1 />} />
                <Route path='category1/page1' element={<Category1 />} />
                <Route path='usuarios' element={<IndexUsuarios />} />
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
                <Route path='/proyectos' element={<IndexProyectos />} />
                <Route path='/proyectos/nuevo' element={<NuevoProyecto />} />
                <Route path='/inscripciones' element={<IndexInscripciones />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
              </Route>
            ) : (
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
              </Route>
            )}
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      {/* </Auth0Provider> */}
      {/* </AuthContext.Provider> */}
    </ApolloProvider>
  );
}

export default App;
