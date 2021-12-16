import { auth } from '../firebase'
import React,{useState,useEffect} from 'react'
export const AuthContext = React.createContext();

export function AuthProvider({children}){
   
   const[user,setUser] = useState();
   const[loading,setLoading] = useState();

   function signup(email,password) {
      return auth.createUserWithEmailAndPassword(email,password);
   }
   function login(email,password){
      return auth.signInWithEmailAndPassword(email,password)
   }
   function logout(){
      return auth.logout();
   }
   useEffect(()=>{
      const unsub = auth.onAuthStateChanged((user)=>{
         setUser(user);
         setLoading(false);
      })
      return ()=>{
         unsub();
      }

   },[])//component did mount vadi lifecycle method use karvani

   const store = {
      user,
      signup,
      login,
      logout
   }
   return (
      <AuthContext.Provider value={store}>
         {!loading && children}
      </AuthContext.Provider>
   )
}


