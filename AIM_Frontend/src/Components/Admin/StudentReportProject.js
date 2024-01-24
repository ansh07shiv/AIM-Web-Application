import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import SubmittedAssignmentDetailsItem from "../Professor/SubmittedAssignmentDetailsItem";
import Accordion from "@mui/material/Accordion";
import * as React from "react";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import StudentItem from "./StudentItem";
import {List} from "@mui/material";
import {useAppContext} from "../../AppContext";

const StudentReportProject = (props) => {
    const{handleOpenError,handleOpenSnackBar}=useAppContext();

    const [expanded, setExpanded] = React.useState(false);
    const [token, setToken] = useState("");
    const [studentData, setStudentData] = useState([]);
    const handleChange = () => {
        setExpanded(!expanded);
    }

    const handleProjectChange = (event) => {
        setToken(event.target.value);
    }

    const getResultsHandler = () => {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/reportStudentAssignment",
            data: {
                token,
                userType: "admin",
            }
        }).then((response) => {
            handleOpenSnackBar();
            console.log(response);
            setStudentData(response.data);

        }).catch((error) => {
            handleOpenError();
        })
    }

  return (
    <>
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {props.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Description: {props.details}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid item xs={12} >
                        <Typography>
                            <TextField
                                required
                                fullWidth
                                type='text'
                                id="password"
                                label="Enter Assignment Token"
                                onChange={handleProjectChange}
                                sx={{width: "50%"}}
                            />
                        </Typography>
                    </Grid>

                    <br/>
                    <br/>
                    <Grid item xs={12} sx={{mt: "8px"}}>
                        <Typography>
                            <Button variant="contained" sx={{backgroundColor: "black", color: "white"}} onClick={getResultsHandler}>Get Results</Button>
                        </Typography>
                    </Grid>
                    <br/>
                    <Grid container spacing={3}>
                        <Grid item xs>
                        </Grid>
                        <Grid item xs={6}>
                            <List sx={{ bgcolor: 'background.paper' }}>
                                {studentData.map((item) => (
                                    <>
                                        <StudentItem firstName={item.firstName} lastName={item.lastName} degree={item.degree} major={item.major} grades={item.grades}
                                                     uploadedDate={item.uploadedDate} isLateSubmit={item.isLateSubmit} />
                                        <br/>
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

export default StudentReportProject;