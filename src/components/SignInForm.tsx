'use client'
import * as React from 'react';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {useForm} from "react-hook-form";
import {ISignUp} from "@repo/types/signUp";
import {string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {signUpService} from "@repo/services/axios";
import {pages} from "@repo/constants/PAGES";



export default function SignInForm() {
    const [isRegister, setIsRegister] = useState(true);
    const [accessToken, setAccessToken] = useState()
    const authSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required(),
        password: Yup.string().required().min(8, 'Password must be at least 8 characters'),
    });
    const {register,
        handleSubmit,
        formState: {errors}
    } = useForm<ISignUp>({resolver: yupResolver(authSchema)})
    const onSubmit = async (data : ISignUp) => {

        const response = await signUpService.signUp(data);
        console.log(response);
    };

    return (
        <Container component="main"
    maxWidth="xs"
    pb={40}
    sx={{border: '2px solid #d15534',
        borderRadius: '15px',
        padding: '30px'}}>
    <CssBaseline />
    <Box
        sx={{
        marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
    }}
>
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
             Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
    <Grid container spacing={2}>

        <Grid item xs={12}>
        <TextField
            required
    fullWidth
    id="email"
    label="Email Address"
    autoComplete="email"
    {...register('email')}
    error={!!errors.email}
    helperText={errors.email?.message}
    />
    </Grid>
    <Grid item xs={12}>
        <TextField
            required
    fullWidth
    label="Password"
    type="password"
    id="password"
    autoComplete="new-password"
    {...register('password')}
    error={!!errors.password}
    helperText={errors.password?.message}
    />
    </Grid>

        </Grid>
        <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 ,
        backgroundColor: '#d15534'}}
        >
            Sign In
        </Button>
        <Grid container justifyContent="flex-end">
    <Grid item>
    <Link href={pages.signUp} variant="body2" onClick={()=>setIsRegister(prevState => !prevState)}>
       Don't have an account? Register
        </Link>
        </Grid>
        </Grid>
        </Box>
        </Box>
    </Container>
    );
    }