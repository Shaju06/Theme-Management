import React from 'react'
import { useAppContext } from '../ContextStore'
import {  Navigate } from 'react-router-dom'


function PrivateRoute({children}) {

    const {isLoggedIn  } = useAppContext()
 
    return isLoggedIn ? children : <Navigate to='/login' />
}

export default PrivateRoute