import React, {useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Home from "./Home";
import Login from "./Authentication&Authorization/Login";
import StudentRegistration from "./Authentication&Authorization/StudentRegistration";
import ProfessorRegistration from "./Authentication&Authorization/ProfessorRegistration";

const ParentComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [registerUserStudent, setRegisterUserStudent] = useState(false);
    const [registerUserProfessor, setRegisterUserProfessor] = useState(false);
    const [customerID, setCustomerID] = useState(0);
    const updateCustomerID = (cID) => {
        setCustomerID(cID);
    }

    const logoutHandler = () => {
        setIsLoggedIn(false);
        setRegisterUserStudent(false);
        setRegisterUserProfessor(false);
        setCustomerID(0);
    }

    //Snackbar
    const [openSnack, setOpenSnack] = useState(false);
    const handleOpen = () => {
        setOpenSnack(true);
    };

    const handleClose = () => {
        setOpenSnack(false);
    };

    const [openSnackError, setOpenSnackError] = useState(false);
    const handleOpenError = () => {
        setOpenSnackError(true);
    };

    const handleCloseError = () => {
        setOpenSnackError(false);
    };

    //Success

    const loginSuccess = () => {
        console.log("Login Success");
        setIsLoggedIn(true);
        setOpenSnack(true);
    }

    const showSuccess = () => {
        setOpenSnack(true);
    }


    const registerSuccess = () => {
        console.log("StudentRegistration Success");
        handleOpen();
        hideStudentRegistration();
        hideProfessorRegistration();
    }

    //Failures

    const showFailure = () => {
        setOpenSnackError(true);
    }

    const loginFail = () => {
        console.log("Login Failed");
        setOpenSnackError(true);
    }

    //Utilities
    const hideStudentRegistration = () => {
        setRegisterUserStudent(false);
    }
    const showStudentRegistration = () => {
        setRegisterUserStudent(true);
    }

    const hideProfessorRegistration = () => {
        setRegisterUserProfessor(false);
    }
    const showProfessorRegistration = () => {
        setRegisterUserProfessor(true);
    }
    return(
        <div className="App" style={{width:'100%'}}>
            {isLoggedIn && <Home logoutHandler={logoutHandler} customerID={customerID} showFailure={showFailure} showSuccess={showSuccess}/>}
            {!isLoggedIn && !registerUserStudent && !registerUserProfessor && <Login updateCustomerID={updateCustomerID} loginFail={loginFail} loginSuccess={loginSuccess} showProfessorRegistration={showProfessorRegistration}  showStudentRegistration={showStudentRegistration}/>}
            {!isLoggedIn && !registerUserProfessor && registerUserStudent && <StudentRegistration registerSuccess={registerSuccess} hideRegistration={hideStudentRegistration}/>}
            {!isLoggedIn && !registerUserStudent && registerUserProfessor && <ProfessorRegistration registerSuccess={registerSuccess} hideRegistration={hideProfessorRegistration}/>}
        </div>
    );
}

export default ParentComponent;