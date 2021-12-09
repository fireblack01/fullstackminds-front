import React from "react";
import { Link } from "react-router-dom";

const IndexUsuarios = () => {
    const data = [
        {
            _id: "648herbw47575b7bydry34",
            correo: "mcr@test.com",
            identificacion: "1094951174",
            nombre: "Mateo",
            apellido: "CR",
            rol: "ADMINISTRADOR",
            estado: "AUTORIZADO",
        },
        {
            _id: "648herbw47575b7bydry35",
            correo: "mateo.cardona.rincon@gmail.com",
            identificacion: "1094951174",
            nombre: "Mateo",
            apellido: "Cardona Rincón",
            rol: "ADMINISTRADOR",
            estado: "AUTORIZADO",
        },
    ];
    return (
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
                                {data.map((info) => {
                                    return (
                                        <tr key={info._id}>
                                            <td>{info.nombre + " " + info.apellido}</td>
                                            <td>{info.correo}</td>
                                            <td>{info.identificacion}</td>
                                            <td>{info.rol}</td>
                                            <td>{info.estado}</td>
                                            <td className="d-flex justify-content-center">
                                                <Link to={`/usuarios/gestion/${info._id}`}>
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
    );
};

export default IndexUsuarios;
