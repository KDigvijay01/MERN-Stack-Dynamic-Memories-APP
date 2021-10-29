import * as api from '../api/index';

// Action Creators


export const getPosts=() => async (dispatch) => {
    try {
        const {data}= await api.fetchPosts();

        dispatch({type:'FETCH_ALL', payload: data})
        // console.log("the data from getPost", data)
    } 
    catch (error) {
        console.log("error in getpost...",error);   
    }
}


export const createPost=(post)=>async (dispatch)=>{
    try {
        const { data } =await api.createPost(post);
        dispatch({type: 'CREATE_POST', payload: data})
    }
    catch (err) {
        console.log("error in createPost...",err)
    }
}


export const updatePost=(id, post)=>async(dispatch)=>{
    console.log("here in action udtate post")
    try {
        const { data }=  await api.updatePost(id, post);
        // console.log("this is the updated post in actions..",data);
        dispatch({type:' UPDATE', payload: data})
        

    } catch (error) {
        console.log(error.message)
    }
}


export const deletePost = (id) => async(dispatch)=> {
    try {
        await api.deletePost(id);
        dispatch({type:'DELETE', payload:id});
    } catch (error) {
        // console.log("err in deletePost",error)
    }
}

export const likePost=(id)=> async (dispatch)=> {
    try {
        const { data }= await api.likePost(id);
        // console.log("likepost me aaye")
        dispatch({type:'LIKE', payload:data})
    } catch (error) {
        console.log("err in likePost",error)
    }
}