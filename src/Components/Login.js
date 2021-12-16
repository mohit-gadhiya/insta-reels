/* eslint-disable no-unused-vars */
import * as React from 'react';
import {useContext,useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import {Button,cardActionArea,cardActions} from '@mui/material'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import './Login.css';
import insta from '../Assets/instagram.png';
import { Alert } from '@mui/material'
import { TextField } from '@mui/material'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {Link } from 'react-router-dom'
import bg from '../Assets/insta.png'
import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
import img5 from '../Assets/img5.jpg'
import {AuthContext} from '../Context/AuthContext'

export default function Login() {
   const store = useContext(AuthContext);
   // console.log(store);
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
   const [loading,setLoading] = useState(false);
   const history = useHistory();
   const [error,setError] = useState('');
   const {login} = useContext(AuthContext);

   const handleCLick = async (event) => {
      try{
         setError('')
         setLoading(true);
         let res = await login(email,password);
         setLoading(false);
         history.push('/')
      }catch(error){
         setError(error)
         setTimeout(() =>{
            setError('')
         },2000)
         setLoading(false)
      }
   }

  return (
     <div className="login-wrapper">
        <div className="imgcar" style={{backgroundImage:'url(' + bg + ')',backgroundSize:'cover'}}>
           <div className="car">
               <CarouselProvider
                  visibleSlides={1}
                  naturalSlideWidth={238}
                  naturalSlideHeight={423}
                  totalSlides={5}
                  hasMasterSpinner
                  isPlaying={true}
                  infinite={true}
                  dragEnabled={false}
                  touchEnabled={false}
                  >
                  <Slider>
                     <Slide index={0}><Image src={img1} /></Slide>
                     <Slide index={1}><Image src={img2} /></Slide>
                     <Slide index={2}><Image src={img3} /></Slide>
                     <Slide index={3}><Image src={img4} /></Slide>
                     <Slide index={4}><Image src={img5} /></Slide>
                  </Slider>
               </CarouselProvider>
           </div>
        </div>
        <div className="login-card">
            <Card variant="outlined">
               <div className="insta-logo">
                  <img src={insta} alt=''/>
               </div>
               <CardContent>
                  {error !== '' && <Alert severity="error">This is an error alert — check it out!</Alert>}
                  {<TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' value={email} onChange={(e) =>setEmail(e.target.value)} />}
                  {<TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' value={password} onChange={(e) =>setPassword(e.target.value)} />}
                  <CardContent>
                     <Typography className={classes.text1} variant="subtitle1" color="primary">
                        Forgot Password ?
                     </Typography>
                  </CardContent>
                  <Button variant="contained" fullWidth={true} disabled={loading} onClick={handleCLick}>Login</Button>
               </CardContent>
            </Card>
            <Card variant="outlined" className={classes.card2} >
               <CardContent >
                  <Typography className={classes.text1} variant="subtitle1">
                     Don't have an account ? <Link to='/SignUp'style={{textDecoration:'none'}}>SignUp</Link>
                  </Typography>
               </CardContent>
            </Card>
        </div>
     </div>
  );
}
