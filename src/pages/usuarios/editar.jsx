import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';
import useFormData from 'hooks/useFormData';
import { Enum_EstadoUsuario, Enum_EstadoUsuarioLider } from 'utils/enums';
import { Enum_Rol } from 'utils/enums';
import { useUser } from 'context/userContext';
import { toast } from 'react-toastify';

const EditarUsuario = () => {
    const { userData } = useUser();
    const data = [userData?.data?.Login];
    var disabled_byRol = null;
    var disabled_byProfile = null;
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();

    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_USUARIO, {
        variables: { _id },
        pollInterval: 500,
    });
    const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_USUARIO);
    const submitForm = (e) => {
        e.preventDefault();
        // delete formData.rol;
        editarUsuario({
            variables: { _id, ...formData },
        });
    };
    useEffect(() => {
        if (mutationData) {
            toast('El usuario ha sido modificado correctamente.', {
                icon: '👏',
            });
        }
    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            toast('¡Error! El usuario no ha sido modificado.', {
                icon: '😱',
            });
        }

        if (queryError) {
            toast('¡Error! en la consulta.', {
                icon: '😱',
            });
        }
    }, [queryError, mutationError]);

    if (queryLoading) return <div>Espere.... Cargando....</div>;

    if (!queryData) return <div>¡Error! en la consulta.</div>;

    if (data[0]?.rol === "ADMINISTRADOR") {
        disabled_byRol = false;
    } else {
        disabled_byRol = true;
    }

    // Habilitar la edición de perfil (Nombre, correo y identificación) solo al usuario loggeado
    if (data[0]?._id == _id) {
        disabled_byProfile = false;
    } else {
        disabled_byProfile = true;
    }

    return (
        <div className='p-10 flex flex-col items-center'>
            <Link to={data[0]?.rol == "ESTUDIANTE" ? "" : '/usuarios'}>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-left'>Editar Usuario</h1>
            <div className='bg-white shadow-xl h-auto'>
                <form
                    onSubmit={submitForm}
                    onChange={updateFormData}
                    ref={form}
                    className='flex flex-col items-center justify-center items-center'
                >
                    <Input
                        label='Nombre'
                        type='text'
                        name='nombre'
                        defaultValue={queryData.Usuario.nombre.charAt(0).toUpperCase() + queryData.Usuario.nombre.slice(1)}
                        required={true}
                        readOnly={disabled_byProfile}
                    />
                    <Input
                        label='Apellido'
                        type='text'
                        name='apellido'
                        defaultValue={queryData.Usuario.apellido.charAt(0).toUpperCase() + queryData.Usuario.apellido.slice(1)}
                        required={true}
                        readOnly={disabled_byProfile}

                    />
                    <Input
                        label='Correo Electrónico'
                        type='email'
                        name='correo'
                        defaultValue={queryData.Usuario.correo}
                        required={true}
                        readOnly={disabled_byProfile}
                    />
                    <Input
                        label='Identificación'
                        type='text'
                        name='identificacion'
                        defaultValue={queryData.Usuario.identificacion.charAt(0).toUpperCase() + queryData.Usuario.identificacion.slice(1)}
                        required={true}
                        readOnly={disabled_byProfile}
                    />
                    <DropDown
                        label='Estado'
                        name='estado'
                        defaultValue={queryData.Usuario.estado}
                        required={true}
                        options={!disabled_byRol ? Enum_EstadoUsuario : Enum_EstadoUsuarioLider}
                        disabled={disabled_byRol && !disabled_byProfile}

                    />
                    <DropDown
                        label='Rol'
                        name='rol'
                        defaultValue={queryData.Usuario.rol}
                        required={true}
                        options={Enum_Rol}
                        disabled={true}
                    />
                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={mutationLoading}
                        text='Guardar'
                    />
                </form>
            </div>
        </div>
    );
};

export default EditarUsuario;