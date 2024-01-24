import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import {useEffect, useState} from "react";
import Alert from "@mui/material/Alert";

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const AssignmentDetailPostSubmission = (props) => {
    let title = props.title;
    let course = props.course;
    let professor = props.professor;
    let description = props.description;
    let comments = props.comments;
    let grades = props.grades;


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        console.log("Comments and Grades");
        console.log(comments, ", ", grades);
        if((comments != null && comments.length > 0) || (comments != null && comments.length > 0)) {

        } else {
            // Assignment not Graded
            setShowAlert(true);
        }
    }, []);

    return(
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Comments and Grades
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {comments}
                    </Typography>
                    <br/>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {grades}
                    </Typography>
                </Box>
            </Modal>

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {professor} - {course}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{whiteSpace: "pre-line"}}>
                        {description}
                    </Typography>
                    <br/>

                    {!showAlert && (

                        <Button component="label" variant="outlined" color="success" onClick={handleOpen}> Check Grades
                        </Button>
                    )}

                    {showAlert && (
                        <Alert severity="warning">This assignment is not graded yet!</Alert>
                    )}
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
        </>
    );
}

export default AssignmentDetailPostSubmission;