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
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useFormik} from 'formik';
import {Autocomplete} from "@mui/material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Modal from "@mui/material/Modal";
import {useAppContext} from "../../AppContext";

import DatePicker from 'react-date-picker';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddAssignmentForm = (props) => {
    const {handleOpenError, handleOpenSnackBar} = useAppContext();
    const [token, setToken] = useState("");
    const [professorDetails, setProfessorDetails] = useState({});

    const formik = useFormik({
        initialValues: {
            // fullName: professorDetails.firstName + " " + professorDetails.lastName,
            // course: professorDetails.subject,
            title: '',
            description: '',
            deadlineDate: ''
        },
        validate: (values) => {
            console.log("In Validation");
            const errors ={}
            const dateFormatRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
            if(!dateFormatRegex.test(values.deadlineDate)) {
                errors.deadlineDate = "Invalid Date! Please make sure date is in right format!";
            }
            return errors;
        },
        onSubmit: values => {
            console.log("Values");
            console.log(values);
            console.log(professorDetails);
            axios({
                method: "POST",
                url: "http://127.0.0.1:5000/addAssignment",
                data: {userType: 'professor', email: localStorage.getItem("email"),
                    fullName: professorDetails.firstName + " " + professorDetails.lastName, course: professorDetails.subject, ...values}
            }).then((response) => {
                handleOpenSnackBar();
                const res = response.data;
                if(res.toString().includes("Failed!")) {

                    handleOpenError();
                } else {

                    setToken(res);
                    handleOpen();

                }
            }).catch((error) => {
                handleOpenError();
            })
        },
    });

    useEffect(() => {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/professorDetails",
            data: {email: localStorage.getItem("email")}
        }).then((response) => {
            console.log("Response for Professor Details: ", response);
            handleOpenSnackBar();
            setProfessorDetails(response.data);
            console.log(professorDetails);
        }).catch((error) => {
            handleOpenError();
        })

    }, []);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        props.setShowavailableGradingHandler();
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Assignment added successfully!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Token value to be shared with the students: {token}
                    </Typography>
                </Box>
            </Modal>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            {/*<TextField*/}
                            {/*    name="fullName"*/}
                            {/*    required*/}
                            {/*    fullWidth*/}
                            {/*    id="fullName"*/}
                            {/*    label="Professor Full Name (Readonly)"*/}
                            {/*    // onChange={formik.handleChange}*/}
                            {/*    // value={formik.values.fullName}*/}
                            {/*    defaultValue={professorDetails.firstName + " " + professorDetails.lastName}*/}
                            {/*    InputProps={{*/}
                            {/*        readOnly: true,*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/*<TextField*/}
                            {/*    required*/}
                            {/*    fullWidth*/}
                            {/*    id="course"*/}
                            {/*    label="Subject (Readonly)"*/}
                            {/*    name="course"*/}
                            {/*    // onChange={formik.handleChange}*/}
                            {/*    // value={formik.values.course}*/}
                            {/*    InputProps={{*/}
                            {/*        readOnly: true,*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                type="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                // onChange={setEmailHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                multiline
                                rows={4}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="deadlineDate"
                                label="Deadline Date"
                                name="deadlineDate"
                                autoComplete="deadlineDate"
                                onChange={formik.handleChange}
                                value={formik.values.deadlineDate}
                                helperText="Enter the date in MM/DD/YYYY Format Only."
                            />
                            {formik.touched.deadlineDate && formik.errors.deadlineDate && (
                                <div style={{ color: 'red' }}>{formik.errors.deadlineDate}</div>
                            )}
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"

                        variant="contained"
                        sx={{mt: 3, mb: 2, backgroundColor: "black"}}
                        // onClick = {handleRegistration}
                    >
                        Register
                    </Button>
                </Box>
            </form>
        </>
    );
}

export default AddAssignmentForm;