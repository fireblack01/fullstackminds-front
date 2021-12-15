import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import { useUser } from 'context/userContext';

const IndexUsuarios = () => {

    const { userData } = useUser();
    var isAdmin = null;
    const { data, error, loading } = useQuery(GET_USUARIOS, {
        pollInterval: 500,
    });
    useEffect(() => {
        if (error) {
            toast.error('Error al consultar los usuarios.');
        }
    }, [error]);

    if (loading) return <div>Cargando....</div>;

    if (userData.data.Login.rol === 'ADMINISTRADOR') {
        isAdmin = true;
    } else {
        isAdmin = false;
    }

    return (
        <PrivateRoute roles={['ADMINISTRADOR', 'LIDER']}>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-left'>Usuarios registrados</h1>
            <div className="bg-white shadow-xl p-2">
                <div className="container h-auto">
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
                                                    <Link to={isAdmin || info.rol === "ESTUDIANTE" ? `/usuarios/editar/${info._id}` : ""}>
                                                        <i className={(isAdmin || info.rol === "ESTUDIANTE" ?
                                                            "fas fa-pencil-alt text-green-400" : "far fa-eye-slash text-red-400") +
                                                            " hover:text-gray-500 cursor-pointer"}
                                                            disabled={true} />
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
