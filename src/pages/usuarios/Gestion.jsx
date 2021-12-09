import React from 'react'
import { Link } from 'react-router-dom'

const GestionUsuarios = () => {
    return (
        <div>
            <Link to='/usuarios'>
                <i className='fas fa-arrow-left text-gray-600 text-xl hover:text-blue-600' />
            </Link>
        </div>
    )
}

export default GestionUsuarios
