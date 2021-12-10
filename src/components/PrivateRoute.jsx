import { useUser } from 'context/userContext';
import React from 'react';

const PrivateRoute = ({ roles, children }) => {
    const { userData } = useUser();
    if (roles.includes(userData.data.Login.rol)) {
        return children;
    }

    return <div>No tienes los permisos necesarios para acceder a este sitio.</div>;
};

export default PrivateRoute;