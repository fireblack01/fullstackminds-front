import { useUser } from 'context/userContext';
import React from 'react';

const PrivateComponent = ({ roleList, children }) => {
    const { userData } = useUser();

    if (roleList.includes(userData.data.Login.rol)) {
        return children;
    }

    return <></>;
};

export default PrivateComponent;