import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import axios from "axios";
import EmailIcon from '@mui/icons-material/Email';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import {useAppContext} from "../../AppContext";

const ProfessorProfile = () => {
    const{handleOpenError,handleOpenSnackBar}=useAppContext();
    const [professorData, setProfessorData] = useState({});

    useEffect(() => {
        console.log("Use Effect Called!");
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/professorProfile",
            data: {
                email: localStorage.getItem("email"),
                userType: 'professor',
            }
        }).then((response) => {
            console.log(response);
            if(response.data.toString().includes("Failed!")) {
                handleOpenError();
                console.log("No Data Found!");
            } else {
                handleOpenSnackBar();
                console.log(response.data);
                setProfessorData(response.data);
            }
        }).catch((error) => {
            handleOpenError();
        })
    }, []);

    return (
        <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 4, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item>
                        {/*<Avatar alt={name} src={profileImage} sx={{ width: 80, height: 80 }} />*/}
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>

                                <Typography gutterBottom variant="h5" component="div">
                                    {professorData.firstName} {professorData.lastName}
                                </Typography>
                                <br/>
                                <Typography variant="body2" color="text.secondary">
                                    <EmailIcon fontSize="small" sx={{ marginRight: 1 }} />
                                    Email: {professorData.email}
                                </Typography>
                                <br/>
                                <Typography variant="body2" color="text.secondary">
                                    <SchoolIcon fontSize="small" sx={{ marginRight: 1 }} />
                                    Subject: {professorData.subject}
                                </Typography>
                                <br/>
                                <Typography variant="body2" color="text.secondary">
                                    <PhoneIcon fontSize="small" sx={{ marginRight: 1 }} />
                                    Contact: {professorData.phone}
                                </Typography>
                                <br/>
                                <Typography variant="body2" color="text.secondary">
                                    <StickyNote2Icon fontSize="small" sx={{ marginRight: 1 }} />
                                    University: {professorData.university}
                                </Typography>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default ProfessorProfile;