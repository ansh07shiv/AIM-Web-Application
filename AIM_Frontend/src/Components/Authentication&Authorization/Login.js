import React, {useState} from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import {useAppContext} from "../../AppContext";

const Login = (props) => {
    const{handleOpenError,handleOpenSnackBar}=useAppContext();
    const [profileData, setProfileData] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const setEmailHandler = (event) => {
        setEmail(event.target.value);
    }
    const setPasswordHandler = (event) => {
        setPassword(event.target.value);
    }


    const getData = () => {
        console.log("In Login");
        console.log(email);
        console.log(password);
        if(email == "admin@aim.com" && password == "admin") {
            localStorage.setItem("user", "admin");
            props.loginSuccess();
        } else {

            axios({
                method: "POST",
                url: "http://127.0.0.1:5000/login",
                data: {
                    email,
                    password,
                }
            }).then((response) => {
                console.log("Login Result: ", response);
                localStorage.setItem("email", email.toString());

                if(response.data.toString().includes("Failed")) {
                    console.log("In If");
                    handleOpenError();
                    props.loginFail();
                } else {
                    handleOpenSnackBar();
                    localStorage.setItem("user", response.data.userType);
                    props.loginSuccess();
                }
            }).catch((error) => {
                handleOpenError();
            })
        }
    }

    const showStudentRegistration = () => {
        props.showStudentRegistration();
    }

    const showProfessorRegistration = () => {
      props.showProfessorRegistration();
    }
    return (
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
                <Avatar sx={{ m: 1, bgcolor: '#ff4f5a' }}>
                    <AssignmentTurnedInIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    AIM
                    <br />
                    Assignment Information Management

                    <br />
                    <br />
                    Sign in
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={setEmailHandler}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={setPasswordHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor:"black" }}
                        onClick={getData}
                    >
                        Sign In
                    </Button>
                    <Grid container spacing={2}>
                        {/*<Link variant="body2" onClick={showRegistration} style={{cursor: 'pointer'}}>*/}
                        {/*    {"Don't have an account? Register!"}*/}
                        {/*</Link>*/}
                        <Grid item xs={12}>
                        <Typography  sx={{ ml: 2, mt:2}}>Don't have an account? Register</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" sx={{width: "100%"}} color="error" onClick={showStudentRegistration}>Student</Button>

                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" sx={{width: "100%"}} color="error" onClick={showProfessorRegistration}>Professor</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            </Grid>
        </Grid>
    );
}

export default Login;