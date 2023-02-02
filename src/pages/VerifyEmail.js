import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function VerifyEmail(props) {
    const {url} = useParams();
    const navigate = useNavigate();
    axios.get(url, ).then((res)=>{
        if(res.data.status == 200){
            Swal.fire({
                title: 'Password Verification Successful',
                icon: 'success',
                text: res.data.message
            }).then(()=>{
                navigate("/dashboard")
            })

        }   
        else {
            Swal.fire({
                title: 'Password Verification Failed',
                icon: 'error',
                text: res.data.message
            }).then(()=>{
                navigate("/dashboard")
            })
        }
    })
    return (
        <div>
            
        </div>
    );
}

export default VerifyEmail;