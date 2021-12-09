import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';
import useFormData from 'hooks/useFormData';
import { Enum_EstadoUsuario } from 'utils/enums';

const EditarUsuario = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();

    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_USUARIO, {
        variables: { _id },
    });


    const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_USUARIO);

    const submitForm = (e) => {
        e.preventDefault();
        delete formData.rol;
        editarUsuario({
            variables: { _id, ...formData },
        });
    };

    useEffect(() => {
        if (mutationData) {
            console.log('El usuario ha sido modificado correctamente.');
        }
    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            console.log('¡Error! El usuario no ha sido modificado.');
        }

        if (queryError) {
            console.log('¡Error! en la consulta.');
        }
    }, [queryError, mutationError]);

    if (queryLoading) return <div>Espere.... Cargando....</div>;

    if (!queryData)  return <div>¡Error! en la consulta.</div>;
    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/usuarios'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-left'>Editar Usuario</h1>
            <div className='bg-white shadow-xl h-auto'>
                <form
                    onSubmit={submitForm}
                    onChange={updateFormData}
                    ref={form}
                    className='flex flex-col items-center justify-center'
                >
                    <Input
                        label='Nombre'
                        type='text'
                        name='nombre'
                        defaultValue={queryData.Usuario.nombre.charAt(0).toUpperCase() + queryData.Usuario.nombre.slice(1)}
                        required={true}
                    />
                    <Input
                        label='Apellido'
                        type='text'
                        name='apellido'
                        defaultValue={queryData.Usuario.apellido.charAt(0).toUpperCase() + queryData.Usuario.apellido.slice(1)}
                        required={true}
                    />
                    <Input
                        label='Correo Electrónico'
                        type='email'
                        name='correo'
                        defaultValue={queryData.Usuario.correo.charAt(0).toUpperCase() + queryData.Usuario.correo.slice(1)}
                        required={true}
                    />
                    <Input
                        label='Identificación'
                        type='text'
                        name='identificacion'
                        defaultValue={queryData.Usuario.identificacion.charAt(0).toUpperCase() + queryData.Usuario.identificacion.slice(1)}
                        required={true}
                    />
                    <DropDown
                        label='Estado'
                        name='estado'
                        defaultValue={queryData.Usuario.estado}
                        required={true}
                        options={Enum_EstadoUsuario}
                    />
                    <label className='my-3  block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>Rol: {queryData.Usuario.rol}</label>
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