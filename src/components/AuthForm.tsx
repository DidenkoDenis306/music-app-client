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

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();



export default function SignUp() {
    const [isRegister, setIsRegister] = useState(true);
    const authSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required(),
        password: Yup.string().required().min(8, 'Password must be at least 8 characters'),
        passwordRepeat:  isRegister
            ? Yup.string().notRequired()
            : Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required')

    });
    const {register,
        handleSubmit,
        formState: {errors}
            } = useForm<ISignUp>({resolver: yupResolver(authSchema)})
    const onSubmit = (data : ISignUp) => {
        console.log({
            email: data.email,
            password: data.password
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
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
                        {isRegister ? 'Sign in' : 'Sign up'}
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
                            {isRegister? '' : <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    {...register("passwordRepeat")}
                                    label="Repeat password"
                                    type="password"
                                    id="passwordRepeat"
                                    autoComplete="new-password"
                                    error={!!errors.passwordRepeat}
                                    helperText={errors.passwordRepeat?.message}
                                />
                            </Grid>}

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 ,
                                    backgroundColor: '#d15534'}}
                        >
                            {isRegister? 'Sign In' : 'Sign Up'}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" onClick={()=>setIsRegister(prevState => !prevState)}>
                                    {isRegister? 'Don\'t have an account? Register' : 'Already have an account? Sign in'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}