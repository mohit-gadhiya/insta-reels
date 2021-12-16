import React,{useContext,useEffect,useState} from 'react'
import {AuthContext} from '../Context/AuthContext'
import UploadFile from './UploadFile';
import {database} from '../firebase'
import Posts from './Posts'

function Feed() {
   const {user,logout} = useContext(AuthContext);
   const [userData,setUserData] = useState('');
   useEffect(()=>{
      const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
         setUserData(snapshot.data());
      })
      return ()=> {unsub()}
   },[user])
   return (
      <div style={{display: 'flex',justifyContent: 'center',flexDirection: 'column',alignItems:'center'}}>
         <div style={{width:'50%'}} className='comp'>
            <h1>Welcome to Feed</h1>
            <button onClick={logout}>Logout</button>
         </div>
         <UploadFile user={userData}/>
         <Posts userData={userData}/>
      </div>
   )
}

export default Feed
