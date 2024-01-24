import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import axios from "axios";
import {useEffect, useState} from "react";
import Alert from "@mui/material/Alert";
import {Chip, CircularProgress} from "@mui/material";
import {useAppContext} from "../../AppContext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SubmittedAssignmentDetailsItem = (props) => {
    const{handleOpenError,handleOpenSnackBar}=useAppContext();

    let comments = props.comments;
    let grades = props.grades;
    const [open, setOpen] = React.useState(false);

    const [showLoader, setShowLoader] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formik = useFormik({
        initialValues: {
            comments: '',
            grades: '',
        },
        onSubmit: values => {
            console.log(values);
            axios({
                method: "POST",
                url: "http://127.0.0.1:5000/addGradesAndComments",
                data: {token: props.token, email: props.email, userType: "professor", ...values}
            }).then((response) => {
                handleOpenSnackBar();
                console.log("Response after Submitting Grades");
                console.log(response);
                handleClose();
                // Assignment Graded
                setShowAlert(true);
            }).catch((error) => {
                handleOpenError();
            })
        },
    });

    const downloadFileHandler = () => {
        console.log("Download File Handler");
        setShowLoader(true)
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/downloadFile",
            data: {filePath: props.filePath, userType: "professor"}
        }).then((response) => {
            console.log("Response after Download API");
            console.log(response);

            if(response.status === 200) {
                handleOpenSnackBar();
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', props.filePath.split('\\').pop());
                link.click();
                // document.body.removeChild(link);
            } else {
                console.log("In Else");
                handleOpenError();
            }
            setShowLoader(false);
        }).catch((error) => {
            console.log("Error Encountered!", error);
            setShowLoader(false);
            handleOpenError();
        });
    }

    const [showAlert, setShowAlert] = useState(false);


    useEffect(() => {
        if((comments != null && comments.length > 0) || (comments != null && comments.length > 0)) {
            // Assignment Graded
            setShowAlert(true);
        } else {
            // Assignment not Graded
            setShowAlert(false);
        }
    }, [comments, grades]);

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
                        <form onSubmit={formik.handleSubmit}>
                            <Box sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="comments"
                                            required
                                            fullWidth
                                            id="comments"
                                            label="Comments"
                                            onChange={formik.handleChange}
                                            value={formik.values.comments}
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="grades"
                                            label="Grades"
                                            name="grades"
                                            onChange={formik.handleChange}
                                            value={formik.values.grades}
                                            helperText="Grade value is out of 100!"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"

                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, backgroundColor:"black"}}
                                    // onClick = {handleRegistration}
                                >
                                    Submit Grades
                                </Button>
                            </Box>
                        </form>
                    </Typography>
                </Box>
            </Modal>

            <Card sx={{ minWidth: 275, backgroundColor: "#E7EBEF" }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Submitted By: {props.email}
                        <br/>
                        Submitted On: {props.uploadedDate} {props.isLateSubmit === "Y" && (<Chip label="LATE" color="error" variant="outlined" /> )}
                    </Typography>
                    <Typography variant="h5" component="div">
                        File Path: {props.filePath}
                    </Typography>
                    <br/>
                    <Button component="label" variant="outlined" sx={{color: "black", borderColor: "black"}} onClick={downloadFileHandler}> Download the Submission
                    </Button>
                    <Button sx={{ml: "8px", color: "black", borderColor: "black"}} component="label" variant="outlined" onClick={handleOpen}> Grade this Submission
                    </Button>
                    <br/>
                    <br/>
                    {showAlert && (
                        <Alert severity="warning">This assignment is already graded. To update the grades please grade again.</Alert>
                    )}
                    {showLoader && (
                        <>
                        <br/>
                        <CircularProgress />
                        </>
                    )}
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
        </>
    );
}

export default SubmittedAssignmentDetailsItem;