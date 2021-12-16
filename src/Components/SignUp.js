/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {useState,useContext} from 'react'
import {AuthContext} from '../Context/AuthContext'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import {Button,cardActionArea,cardActions} from '@mui/material'
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import './SignUp.css';
import insta from '../Assets/instagram.png';
import { Alert } from '@mui/material'
import { TextField } from '@mui/material'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {Link, useHistory } from 'react-router-dom'
import { database, storage } from '../firebase';

export default function SignUp() {
   const useStyles = makeStyles({
      text1:{
         color:'grey',
         textAlign:'center'
      },
      card2:{
         height:'7vh',
         marginTop:'2%'
      }
      
   })
   const classes = useStyles();
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const [name,setName] = useState('');
   const [file,setFile] = useState(null);
   const [loading,setLoading] = useState(false);
   const history = useHistory();
   const [error,setError] = useState('');
   const {signup} = useContext(AuthContext);

   const handleClick =  async()=>{
      if(file == null){
         setError('Please upload profile image first');
         setTimeout(()=>{
            setError('')
         },2000)
         return;
      }
      try{
         setError('')
         setLoading(true)
         let userObj = await signup(email,password);
         let uid = userObj.user.uid;
         const uploadTask = storage.ref(`./users/${uid}/ProfileImage`).put(file);
         uploadTask.on('state_changes',fn1,fn2,fn3);
         function fn1(snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            console.log(`upload is ${progress}% done`);
         }
         function fn2(error) {
            setError(error);
            setTimeout(()=>{
               setError('')
            },2000)
            setLoading(false)
            return;
         }
         function fn3(){
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
               console.log(url);
               database.users.doc(uid).set({
                  email:email,
                  userId:uid,
                  fullName:name,
                  profileUrl:url,
                  createdAt: database.getTimestamp()
               })

            })
            setLoading(false)
            history.push('/')
         }
      }catch(err){
         setError(err);
         setTimeout(()=>{
            setError('')
         },2000)

      }
   }

   
  return (
     <div className="signup-wrapper">
        <div className="signup-card">
            <Card variant="outlined">
               <div className="insta-logo">
                  <img src={insta} alt=''/>
               </div>
               <CardContent>
                  <Typography className={classes.text1} variant="subtitle1"  >
                     Signup to see photos and videos of your friends.
                  </Typography>
                  {error !== '' && <Alert severity="error">{error}</Alert>}
                  {<TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' value={email} onChange={(e)=> setEmail(e.target.value)}/>}
                  {<TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' value={password} onChange={(e)=> setPassword(e.target.value)}/>}
                  {<TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense' value={name} onChange={(e)=>setName(e.target.value)} />}
                  <CardActions>
                  <Button fullWidth={true} color = 'secondary' margin='dense' variant='outlined' startIcon={<CloudUploadIcon/>} component='label'>
                  Upload Profile Image
                  <input type='file' accept='image/*' hidden onChange={(e)=>setFile(e.target.files[0])}/>
                  </Button>
                  </CardActions>
                  <Button variant="contained" fullWidth={true} disabled={loading} onClick={handleClick}>Sign Up</Button>
                  <CardContent>
                     <Typography className={classes.text1}>
                        By signing up, you agree to our terms, conditions and Cookies Policy.
                     </Typography>
                  </CardContent>
               </CardContent>
            </Card>
            <Card variant="outlined" className={classes.card2} >
               <CardContent >
                  <Typography className={classes.text1} variant="subtitle1">
                     Having an account ? <Link to='/Login'style={{textDecoration:'none'}}>Login</Link>
                  </Typography>
               </CardContent>
            </Card>
        </div>
     </div>
  );
}
