import React from 'react';
import { useUser } from 'context/userContext';

const Index = () => {
  const { userData } = useUser();
  const data = [userData?.data?.Login];

  return (
    <div className='bg-white shadow-xl h-auto'>
      <p>
        Logged User:
        <br />
        {data &&
          data?.map((user) => (
            <>
              <span>{user?.nombre}</span>
              <br />
              <span>{user?.apellido}</span>
            </>
          ))}
      </p>
      <p className='p-5'>
        <span className='font-bold'>Nombre:</span> Juan Diego Valencia Rojas <br />
        <span className='font-bold'>Email:</span> diego.valencr@gmail.com <br />
        <span className='font-bold'>CC:</span> 1037586396
      </p>
      <p className='p-5'>
        <span className='font-bold'>Nombre:</span> Mateo Cardona Rincón <br />
        <span className='font-bold'>Email:</span> mcardonari@unal.edu.co <br />
        <span className='font-bold'>CC:</span> 1094951174
      </p>
      <p className='p-5'>
        <span className='font-bold'>Nombre:</span> Einer de Jesús Medina Fernández <br />
        <span className='font-bold'>Email:</span> einermedina15@gmail.com <br />
        <span className='font-bold'>CC:</span> 1045748822
      </p>
      <p className='p-5'>
        <span className='font-bold'>Nombre:</span> Laura Johanna Vera Quintero <br />
        <span className='font-bold'>Email:</span> lauraveraq@gmail.com <br />
        <span className='font-bold'>CC:</span> 1018488778
      </p>
      <p className='p-5'>
        <span className='font-bold'>Nombre:</span> Anderson Miguel Landazuri Cocinero <br />
        <span className='font-bold'>Email:</span> amlandazuric@gmail.com <br />
        <span className='font-bold'>CC:</span> 1015425982
      </p>
    </div>
  );
};

export default Index;
