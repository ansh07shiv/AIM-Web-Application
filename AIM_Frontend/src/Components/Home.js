import * as React from 'react';
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import AssignmentDetail from "./Student/AssignmentDetail";
import StudentAssignmentHistory from "./HistoryAssignment/StudentAssignmentHistory";
import StudentProfile from "./Student/StudentProfile";
import AddAssignmentForm from "./Professor/AddAssignmentForm";
import ViewReviewAssignments from "./Professor/ViewReviewAssignments";
import Paper from "@mui/material/Paper";
import StudentReportProject from "./Admin/StudentReportProject";
import StudentReportProfessor from "./Admin/StudentReportProfessor";
import ProfessorProfile from "./Professor/ProfessorProfile";
import {useAppContext} from "../AppContext";
import SearchAssignment from "./Student/SearchAssignment";
import StudentReportLateProjects from "./Admin/StudentReportLateProjects";

const Home = (props) => {
    const{handleOpenError,handleOpenSnackBar}=useAppContext();


    const [showProfile, setShowProfile] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const [isStudentLogin, setIsStudentLogin] = useState(false);
    const [isProfessorLogin, setIsProfessorLogin] = useState(false);


    useEffect(() => {
        console.log("UseEffect Called!");
        if (localStorage.getItem("user").includes("professor")) {
            setIsProfessorLogin(true);
            setIsStudentLogin(false);
            setIsAdminLogin(false);
        } else if (localStorage.getItem("user").includes("student")) {
            setIsProfessorLogin(false);
            setIsStudentLogin(true);
            setIsAdminLogin(false);
        } else {
            setIsProfessorLogin(false);
            setIsStudentLogin(false);
            setIsAdminLogin(true);
        }

        // if(props.customerID === '10') {
        //     setIsAdminLogin(true);
        // }
    }, []);

    const logoutHandler = () => {
        props.logoutHandler();
    }

    const showProfileHandler = () => {
        setShowProfile(true);
        setShowHistory(false);
    }
    const showHistoryHandler = () => {
        setShowProfile(false);
        setShowHistory(true);
    }

    const showMenu = () => {
        setShowProfile(false);
        setShowHistory(false);
    }




    const [showProfileProfessor, setShowProfileProfessor] = useState(false);
    const [showHistoryProfessor, setShowHistoryProfessor] = useState(false);
    const [showavailableGrading, setShowavailableGrading] = useState(false);

    const showMenuProfessor = () => {
        setShowavailableGrading(false);
        setShowHistoryProfessor(false);
        setShowProfileProfessor(false);
    }

    const setShowavailableGradingHandler = () => {

        setShowavailableGrading(true);
        setShowHistoryProfessor(false);
        setShowProfileProfessor(false);
    }

    const showProfileProfessorHandler = () => {

        setShowavailableGrading(false);
        setShowHistoryProfessor(false);
        setShowProfileProfessor(true);
    }



    return (
        <>
            <CssBaseline/>

            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" sx={{bgcolor: 'black'}}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{display: 'flex', flexGrow: 1}}>
                            AIM (Assignment Information Management) System
                        </Typography>
                        {isStudentLogin && !isProfessorLogin && !isAdminLogin && (
                            <>
                                <Button color="inherit" onClick={showMenu}>Search Assignment</Button>
                                <Button color="inherit" onClick={showHistoryHandler}>View History</Button>
                                <Button color="inherit" onClick={showProfileHandler}>Profile</Button>
                            </>
                        )
                        }

                        {isProfessorLogin && !isStudentLogin && !isAdminLogin && (
                            <>
                                <Button color="inherit" onClick={showMenuProfessor}>Add Assignment</Button>
                                <Button color="inherit" onClick={setShowavailableGradingHandler}>View and Review
                                    Submissions</Button>
                                {/*<Button color="inherit" onClick={setShowHistoryProfessorHandler}>View History</Button>*/}
                                <Button color="inherit" onClick={showProfileProfessorHandler}>Profile</Button>
                            </>
                        )
                        }


                        <Button color="inherit" onClick={logoutHandler}>Logout</Button>
                    </Toolbar>

                </AppBar>
            </Box>

            {/* Admin Login */}

            {isAdminLogin && (
                <>
                    <main>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Container maxWidth="sm">
                                <Typography
                                    component="h4"
                                    variant="h4"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    <strong>Admin</strong>
                                    <br/>
                                    <strong>AIM System Reports</strong>

                                </Typography>
                            </Container>
                        </Box>
                        <Divider/>
                        <Grid container component="main" sx={{height: '80vh'}}>
                            <CssBaseline/>
                            <Grid
                                item
                                xs={false}
                                sm={4}
                                md={7}
                                sx={{
                                    backgroundImage: `url('/Images/Admin.jpg')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: '80%',
                                    backgroundPosition: 'center',
                                    height: "100%"
                                }}
                            />
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <div style={{padding: '60px', backgroundColor: '#E7EBEF', height: '100%'}}>
                            <Grid>
                                <StudentReportProject title="Top Performing Students for an Assignment"
                                                      details="List of Students who scores the highest in a particular project."/>
                                <br/>
                                <StudentReportProfessor title="Top Performing Students for each Assignment by Professor"
                                                        details="List of Students who scores the highest in each project a particular Professor has submitted."/>
                                <br/>
                                <StudentReportLateProjects title="Late Submissions for an Assignment"
                                                        details="List of Students who submitted the Assignment after the deadline."/>
                            </Grid>
                        </div>
                            </Grid>
                        </Grid>
                    </main>
                </>
            )}

            {/* Student Login */}

            {isStudentLogin && !showProfile && !showHistory && (
                <>
                    <main>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Container maxWidth="sm">
                                <Typography
                                    component="h4"
                                    variant="h4"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    <strong>Search Assignment</strong>
                                </Typography>
                                <Typography
                                    component="h8"
                                    variant="h8"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Note: Search using the token provided by your Professor.
                                </Typography>
                            </Container>
                        </Box>
                        <Divider/>

                        <Grid container component="main" sx={{height: '80vh'}}>
                            <CssBaseline/>
                            <Grid
                                item
                                xs={false}
                                sm={4}
                                md={7}
                                sx={{
                                    backgroundImage: `url('/Images/StudentHome.jpg')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: '80%',
                                    backgroundPosition: 'center',
                                    height: "100%"
                                }}
                            />
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <div style={{padding: '60px', backgroundColor: '#E7EBEF', height: '100%'}}>
                                    <SearchAssignment  showHistoryHandler={showHistoryHandler}/>
                                </div>
                            </Grid>
                        </Grid>

                    </main>
                </>
            )}

            {isStudentLogin && showProfile && !showHistory && (
                <>
                    <main>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Container maxWidth="sm">
                                <Typography
                                    component="h4"
                                    variant="h4"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    <strong>Profile</strong>
                                </Typography>
                                <Typography
                                    component="h8"
                                    variant="h8"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Note: Please contact the administrator for any updates.
                                </Typography>
                            </Container>
                        </Box>
                        <Divider/>

                        <Grid container component="main" sx={{height: '80vh'}}>
                            <CssBaseline/>
                            <Grid
                                item
                                xs={false}
                                sm={4}
                                md={7}
                                sx={{
                                    backgroundImage: `url('/Images/Profile.jpg')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: '80%',
                                    backgroundPosition: 'center',
                                    height: "100%"
                                }}
                            />
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <div style={{padding: '60px', backgroundColor: '#E7EBEF', height: '100%'}}>
                                    <StudentProfile/>
                                </div>
                            </Grid>
                        </Grid>
                    </main>
                </>
            )}

            {isStudentLogin && showHistory && !showProfile && (
                <>
                    <main>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Container maxWidth="sm">
                                <Typography
                                    component="h4"
                                    variant="h4"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    <strong>History of Submissions</strong>
                                </Typography>
                                <Typography
                                    component="h8"
                                    variant="h8"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Note: Comments and Grades will be empty for Non-Graded Assignments.
                                </Typography>
                            </Container>
                        </Box>
                        <Divider/>
                        <Grid container component="main" sx={{height: '80vh'}}>
                            <CssBaseline/>
                            <Grid
                                item
                                xs={false}
                                sm={4}
                                md={7}
                                sx={{
                                    backgroundImage: `url('/Images/StudentHistory.jpg')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: '80%',
                                    backgroundPosition: 'center',
                                    height: "100%"
                                }}
                            />
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <div style={{padding: '60px', backgroundColor: '#E7EBEF', height: '100%'}}>
                                    <StudentAssignmentHistory/>
                                </div>
                            </Grid>
                        </Grid>
                    </main>
                </>
            )}

            {/* Professor Login*/}

            {isProfessorLogin && !showavailableGrading && !showHistoryProfessor && !showProfileProfessor && (
                <>
                    <main>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Container maxWidth="sm">
                                <Typography
                                    component="h4"
                                    variant="h4"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    <strong>Add Assignment</strong>
                                </Typography>
                                <Typography
                                    component="h8"
                                    variant="h8"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Note: Please safely keep the token value generated.
                                </Typography>
                            </Container>
                        </Box>
                        <Divider/>
                        <Grid container component="main" sx={{height: '80vh'}}>
                            <CssBaseline/>
                            <Grid
                                item
                                xs={false}
                                sm={4}
                                md={7}
                                sx={{
                                    backgroundImage: `url('/Images/ProfessorHome.jpg')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: '80%',
                                    backgroundPosition: 'center',
                                    height: "100%"
                                }}
                            />
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <div style={{padding: '60px', backgroundColor: '#E7EBEF', height: "100%"}}>
                                    <AddAssignmentForm setShowavailableGradingHandler={setShowavailableGradingHandler}/>
                                </div>
                            </Grid>
                        </Grid>
                    </main>
                </>
            )}

            {isProfessorLogin && showavailableGrading && !showHistoryProfessor && !showProfileProfessor && (
                <>
                    <main>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Container maxWidth="sm">
                                <Typography
                                    component="h4"
                                    variant="h4"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    <strong>View and Review Assignments</strong>
                                </Typography>
                                <Typography
                                    component="h8"
                                    variant="h8"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Note: Grading same assigment again will replace the existing Grades.
                                </Typography>

                            </Container>
                        </Box>
                        <Divider/>
                        <Grid container component="main" sx={{height: '80vh'}}>
                            <CssBaseline/>
                            <Grid
                                item
                                xs={false}
                                sm={4}
                                md={7}
                                sx={{
                                    backgroundImage: `url('/Images/ProfessorViewAssignments.jpg')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: '80%',
                                    backgroundPosition: 'center',
                                    height: "100%"
                                }}
                            />
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <div style={{padding: '60px', backgroundColor: '#E7EBEF', height: "100%"}}>
                                    <ViewReviewAssignments/>
                                </div>
                            </Grid>
                        </Grid>
                    </main>
                </>
            )}

            {isProfessorLogin && !showavailableGrading && !showHistoryProfessor && showProfileProfessor && (
                <>
                    <main>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Container maxWidth="sm">
                                <Typography
                                    component="h4"
                                    variant="h4"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    <strong>Professor Profile</strong>
                                </Typography>
                                <Typography
                                    component="h8"
                                    variant="h8"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Note: Please contact the administrator for any updates.
                                </Typography>
                            </Container>
                        </Box>
                        <Divider/> <Grid container component="main" sx={{height: '80vh'}}>
                        <CssBaseline/>
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage: `url('/Images/Profile.jpg')`,
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: '80%',
                                backgroundPosition: 'center',
                                height: "100%"
                            }}
                        />
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                            <div style={{padding: '60px', backgroundColor: '#E7EBEF', height: "100%"}}>
                                <ProfessorProfile/>
                            </div>
                        </Grid>
                    </Grid>
                    </main>
                </>
            )}


        </>
    );
}

export default Home;