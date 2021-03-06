import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { getPosts, createPost, updatePost} from '../../actions/post'

 
//Get The Current ID


const Form=( {currentId, setCurrentId})=>{
    const [postData, setPostData]=useState({ creator:'', title:'', message:'', tags:'', selectedFile:'',});
    const post=useSelector((state)=> currentId ? state.posts.find((p)=>p._id=== currentId) :null);
    const classes=useStyles();
    useEffect(()=>{
        if(post){ 
            setPostData(post);
            console.log("This i sthe automatic post from useeffect of Form",post);
        }
    },[post])



    const dispatch=useDispatch();

   
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(currentId){
            console.log("handle submit form",currentId);
            dispatch(updatePost(currentId, postData));
        }else{
            dispatch(createPost(postData));
        }
        clear();
        // console.log(postData)
        
        // console.log("this is selected file", postData.selectedFile)
        dispatch(getPosts)

    }

    const clear=()=>{
        setCurrentId(null);
        setPostData({ creator:'', title:'', message:'', tags:'', selectedFile:'',});

    }


    return (
        <Paper className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={ handleSubmit }>
                <Typography varient="h6">{currentId ? "Editing" :"Creating" } A Memory</Typography>
                <TextField name="creator" label="Creator" variant="outlined"  fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData, creator:e.target.value})}  />
                <TextField name="title" label="Title" variant="outlined"  fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title:e.target.value})}  />
                <TextField name="message" label="Message" variant="outlined"  fullWidth value={postData.message} onChange={(e)=>setPostData({...postData, message:e.target.value})}  />
                <TextField name="tags" label="Tags" variant="outlined" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData, tags:e.target.value.split(',')})}  />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 })=> setPostData({...postData, selectedFile:base64})} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={ clear } fullWidth >Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;
