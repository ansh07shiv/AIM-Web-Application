import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import {useEffect, useState} from "react";
import {Chip} from "@mui/material";
import {CompareWithTodayIsLate} from "../Utilities/CompareWithTodayIsLate";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const AssignmentDetail = (props) => {

    const [submissionAgain, setSubmissionAgain] = useState(false);
    const [showChipLate, setShowChipLate] = useState(false);

    useEffect(() => {
        console.log("value: ", props.submissionExisting);
        if(props.submissionExisting === "Y") {
            setSubmissionAgain(true);
        } else {
            setSubmissionAgain(false);
        }
    }, [props.submissionExisting]);

    let title = props.title;
    let course = props.course;
    let professor = props.professor;
    let description = props.description;
    return(
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14, whiteSpace: "pre-line" }} color="text.secondary" gutterBottom>
                        Professor: {professor} and Course: {course}
                        <br/>
                        <b>Deadline Date:</b> {props.deadlineDate} {props.lateSubmit && (<Chip label="LATE" color="error" variant="outlined" />)}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{whiteSpace: "pre-line"}}>
                        Description: {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container spacing={3}>
                        <Grid item xs>
                        </Grid>
                        <Grid item xs={12}>
                            <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                                Upload file
                                <VisuallyHiddenInput type="file" onChange={props.uploadHandler} accept=".zip"/>
                            </Button>
                            <br/><br/>

                            <Typography variant="body2">The assignment <b>ZIP</b>  file should be present in "Downloads" folder of the local system</Typography>
                            {/*<Alert variant="outlined" severity="info">The assignment <b>ZIP</b> file should be present in "Downloads" folder of the local system!</Alert>*/}
                            {submissionAgain && (
                                <>
                                    <br/>
                                <Alert severity="warning">Submission for this assignment is already present. Please upload again to replace the existing submission!</Alert>
                                </>
                            )}
                        </Grid>
                        <Grid item xs>
                        </Grid>

                    </Grid>
                </CardActions>
            </Card>
        </>
    );
}

export default AssignmentDetail;