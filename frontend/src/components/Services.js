import axios from 'axios';


const apiEndpoint = 'http://localhost:5000/'

const post =(payload) =>{
    return axios.post(apiEndpoint, payload)
    .then((response)=>{
        return response;
    }).catch((err)=>{
        console.log(err);
    })
}

export  const Services = {
    post
}