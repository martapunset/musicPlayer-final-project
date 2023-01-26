import {useAuth0} from '@auth0/auth0-react'
import { ButtonShort } from '../../ui';
import { AuthContext } from '../../auth/authContext/AuthContext';
import { useContext } from 'react';
import React from 'react'


export const LogoutButton = () => {
 const {logout}=useAuth0()
  const { logoutReducer } = useContext(AuthContext)
  
  function logoutWrapper(){
  
    logoutReducer();
  
    logout({returnTo: window.location.origin +"/auth"})
  }


  return (
    <ButtonShort onClick={()=>logoutWrapper()}>Logout</ButtonShort>
  )
}

