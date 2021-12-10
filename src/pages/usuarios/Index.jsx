import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';

const IndexUsuarios = () => {

    const { data, error, loading } = useQuery(GET_USUARIOS);
    useEffect(() => {
        if (error) {
            toast.error('Error al consultar los usuarios.');
        }
    }, [error]);

    if (loading) return <div>Cargando....</div>;

    return (
        <PrivateRoute roles={['ADMINISTRADOR', 'LIDER']}>
            <div className="bg-white shadow-xl p-2">
                <div className="container h-auto">
                    <div className="row ">Usuarios registrados</div>

                    <div className="row h-100">
                        <table className="tabla">
                            <thead>
                                <tr>
                                    <th>Nombre completo</th>
                                    <th>Correo</th>
                                    <th>Identificación</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {data.Usuarios.map((info) => {
                                        return (
                                            <tr key={info._id}>
                                                <td>{info.nombre + " " + info.apellido}</td>
                                                <td>{info.correo}</td>
                                                <td>{info.identificacion}</td>
                                                <td>{info.rol}</td>
                                                <td>{info.estado}</td>
                                                <td className="d-flex justify-content-center">
                                                    <Link to={`/usuarios/editar/${info._id}`}>
                                                        <i className="fas fa-pencil-alt text-green-400 hover:text-green-600 cursor-pointer" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PrivateRoute >
    );
};

export default IndexUsuarios;
