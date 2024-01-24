import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useEffect, useState} from "react";
import axios from "axios";
import SubmittedAssignmentDetailsItem from "./SubmittedAssignmentDetailsItem";
import {useAppContext} from "../../AppContext";

const ViewReviewAssignmentItem = (props) => {
    const{handleOpenError,handleOpenSnackBar}=useAppContext();

    const [assignmentsFound, setAssignmentsFound] = useState([]);
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = () => {
        setExpanded(!expanded);
    }

    useEffect(() => {
        console.log("In API for Searching Submissions for this Particular Assignment")
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/getAssignmentSubmissionsProfessor",
            data: {token: props.token, userType: "professor"}
        }).then((response) => {
            handleOpenSnackBar();
            console.log("Result: ", response.data);
            setAssignmentsFound(response.data);

        }).catch((error) => {
            handleOpenError();
        })
    }, []);

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
                <Typography sx={{ color: 'text.secondary' }}>Course: {props.course} <br/>Deadline Date: {props.deadlineDate}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {assignmentsFound.map((item) => (
                        <>
                        <SubmittedAssignmentDetailsItem email={item.email} filePath={item.file} token={props.token}
                                                        grades={item.grades} comments={item.comments} uploadedDate={item.uploadedDate}
                                                        deadlineDate={props.deadlineDate} isLateSubmit={item.isLateSubmit}/>
                            <br/>
                        </>
                    ))}
                </Typography>
            </AccordionDetails>
        </Accordion>
    </>
  );
}

export default ViewReviewAssignmentItem;