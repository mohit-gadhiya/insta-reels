import React,{useState} from 'react'
import Button from '@mui/material/Button';
import MovieIcon from '@material-ui/icons/Movie';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid'
import {storage,database} from '../firebase'

function UploadFile(props) {
   console.log(props.user);
   const [error,setError] = useState('');
   const [loading,setLoading] = useState(false);

   const handleChange = async(file) => {
      if(file == null){
         setError('Please select a file first');
         setTimeout(() =>{
            setError('');
         },2000);
         return;
      }
      if(file.size / (1024*1024) > 100){
         setError('Video is too big')
         setTimeout(() =>{
            setError('')
         },2000);
         return;
      }
      const uid = uuidv4();
      setLoading(true);
      const uploadTask = storage.ref(`./posts/${uid}/${file.name}`).put(file);
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
            let obj = {
               likes:[],
               comments:[],
               pid:uid,
               pUrl:url,
               uName:props.user.fullName,
               uProfile:props.user.profileUrl,
               userId: props.user.userId,
               createdAt: database.getTimestamp()
            }
            database.posts.add(obj).then(async(ref)=>{
               let res = await database.users.doc(props.user.userId).update({
                  postIds: props.user.postIds!=null ? [...props.user.postIds, ref.id] : [ref.id]
               })
            }).then(()=>{
               setLoading(false);
            }).catch((err)=>{
               setError(err);
               setTimeout(()=>{
                  setError('')
               },2000)
               setLoading(false);
            })

         })
         // setLoading(false)
      }
      
   }

   return (
      <div>
         {
            error !== '' ? <Alert severity="error">{error}</Alert> : 
            <>
               <input type='file' accept='video/*' onChange={(e)=>handleChange(e.target.files[0])} style={{display:'none'}} id='upload-input' />
               <label htmlFor='upload-input'>
                  <Button variant="outlined" color="secondary" disabled={loading} component='span'><MovieIcon/>&nbsp;Upload Video</Button>
               </label> 
               {loading && <LinearProgress color="secondary" style={{marginTop:"3%"}}/>}
            </>
         }
      </div>
   
   )
}

export default UploadFile
