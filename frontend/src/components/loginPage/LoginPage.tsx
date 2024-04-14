import {Box, Button, FormControl, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import "./LoginPage.css";
import React from "react";
import {useForm} from "react-hook-form";
import {redirect, useNavigate} from "react-router-dom";
import car from "../../assets/loginPagePicture.jpg";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm()

    const navigate = useNavigate();
    const onSubmit = () => {
        console.log(watch("login"), watch("password"));
        navigate("/desktop");
    }
    return (
        <div className="loginContainer">
            <div className="loginWindow">
                <img src={car} height="700" width="515" alt="car"/>
                <p className="textOnThePhoto">WELCOME TO <span className="color">AUTO GARAGE</span> SYSTEM</p>
                <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <p className="userLoginText">USER LOGIN</p>
                    <Box className="loginInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <TextField id="login" label="Login"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("login")}/>
                    </Box>
                    <Box className="passwordInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <LockIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <TextField id="password" label="Password"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("password")}/>
                    </Box>
                    <Button className="loginSubmitButton" type="submit" variant="outlined">LOGIN</Button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;