import React from 'react'
import chatImage from "../assets/images/chat.svg";
import {
    Grid,
    Box,
    Typography,
    Button,
    FormControl,
    TextField,
  } from '@material-ui/core';

 const Wrapper = ({children})=>{
return(
    <div className="auth-wrapper">
        < div className="auth-wrapper__left" >
            <img src={chatImage} alt="chat icon"/>
            <Typography variant="h5" component="h1">
            Converse with anyone
with any language
</Typography>
        </div>
        < div className="auth-wrapper__right" >
            {children}
        </div>
    </div>
)
}

export default Wrapper