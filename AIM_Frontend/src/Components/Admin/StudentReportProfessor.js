import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import {List} from "@mui/material";
import StudentProjectItem from "./StudentProjectItem";
import {useAppContext} from "../../AppContext";

const StudentReportProfessor = (props) => {

    const {handleOpenError, handleOpenSnackBar} = useAppContext();
    const [expanded, setExpanded] = React.useState(false);
    const [email, setEmail] = useState("");

    const [studentData, setStudentData] = useState([]);

    const handleChange = () => {
        setExpanded(!expanded);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const getResultsHandler = () => {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/reportStudentProfessor",
            data: {
                email,
                userType: "admin",
            }
        }).then((response) => {
            handleOpenSnackBar();
            console.log("Student Report Professor");
            console.log(response);
            setStudentData(response.data);
            console.log("Student Data: ", studentData);
        }).catch((error) => {
            handleOpenError();
        })
    }

    return (
        <>
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>
                        {props.title}
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>Description: {props.details}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid cotainer>
                        <Grid item xs={12}>
                            <Typography>
                                <TextField
                                    required
                                    fullWidth
                                    type='email'
                                    id="email"
                                    label="Enter Professor Email"
                                    onChange={handleEmailChange}
                                    sx={{width: "50%"}}
                                />
                            </Typography>
                        </Grid>
                        <br/>
                        <Grid item xs={12}>
                            <Typography>
                                <Button variant="contained" sx={{backgroundColor: "black", color: "white"}}
                                        onClick={getResultsHandler}>Get Results</Button>
                            </Typography>
                        </Grid>
                        <br/>
                        <Grid container spacing={3}>
                            <Grid item xs>
                            </Grid>
                            <Grid item xs={6}>
                                <List sx={{bgcolor: 'background.paper'}}>

                                    {studentData.length > 0 && studentData.map((item) => (
                                        <>
                                            <br/>
                                            <StudentProjectItem firstName={item.firstName} lastName={item.lastName}
                                                                degree={item.degree} major={item.major}
                                                                grades={item.grades} title={item.title}
                                                                isLateSubmit={item.isLateSubmit}
                                                                uploadedDate={item.uploadedDate}
                                            />
                                        </>
                                    ))}

                                </List>
                            </Grid>
                            <Grid item xs>
                            </Grid>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default StudentReportProfessor;