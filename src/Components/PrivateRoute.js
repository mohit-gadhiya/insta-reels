import React,{Component, useContext} from 'react'
import {Route} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext'
import {Redirect} from 'react-router'  




function PrivateRoute({component:Component,...rest}) {
   const {user} = useContext(AuthContext);
   return (
      <Route  {...rest} render={props=>{
         return user ? <Component {...props} /> : <Redirect to='/login' />
      }}/>
   )
}

export default PrivateRoute
