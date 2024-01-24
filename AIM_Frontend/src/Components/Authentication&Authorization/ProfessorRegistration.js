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
import React, {useState} from "react";
import axios from "axios";
import { useFormik } from 'formik';
import {Autocomplete} from "@mui/material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Paper from "@mui/material/Paper";
import {useAppContext} from "../../AppContext";

const ProfessorRegistration = (props) => {
    const{handleOpenError,handleOpenSnackBar}=useAppContext();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            university: '',
            subject: '',
            password: '',
        },
        onSubmit: values => {
            console.log(values);
            axios({
                method: "POST",
                url: "http://127.0.0.1:5000/registration",
                data: {userType: 'professor', ...values}
            }).then((response) => {
                handleOpenSnackBar();
                const res = response.data;
                props.registerSuccess();
            }).catch((error) => {
                handleOpenError();
            })
        },
    });

    const hideRegistration = () => {
        props.hideRegistration();
    }

    return(
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url('/Images/LoginRegister.jpg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: '80%',
                    backgroundPosition: 'center',
                    height: "100%"
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AssignmentTurnedInIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    AIM
                    <br />
                    Assignment Information Management

                    <br />
                    <br />
                    Professor Registration
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ mt: 3, ml: 3, mr:3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                    // onChange={setlastNameHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    // onChange={setEmailHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="university"
                                    label="University"
                                    name="university"
                                    autoComplete="university"
                                    onChange={formik.handleChange}
                                    value={formik.values.university}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="subject"
                                    label="Subject"
                                    name="subject"
                                    autoComplete="subject"
                                    onChange={formik.handleChange}
                                    value={formik.values.subject}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                    // onChange={setPhoneHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type='password'
                                    id="password"
                                    label="Password"
                                    name="password"
                                    autoComplete="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor:"black" }}
                            // onClick = {handleRegistration}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-start">
                            <Grid item>
                                <Link onClick={hideRegistration} style={{cursor: 'pointer'}} variant="body2">
                                    Already have an account? Sign in!
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Box>
            </Grid>
        </Grid>
    );
}

export default ProfessorRegistration;