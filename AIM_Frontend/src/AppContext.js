import React, { createContext, useState, useContext } from 'react';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [message, setMessage] = useState('');

    const showMessage = (text) => {
        console.log("In Testing: ", text);
        setMessage(text);
    };


    const [openSnackError, setOpenSnackError] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);

    const handleOpenSnackBar = () => {
        setOpenSnack(true);
    };

    const handleClose = () => {
        setOpenSnack(false);
    };

    const handleOpenError = () => {
        setOpenSnackError(true);
    };

    const handleCloseError = () => {
        setOpenSnackError(false);
    };

        return (
        <AppContext.Provider value={{ handleOpenSnackBar, handleOpenError }}>
            <>
                <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        API call Success!
                    </Alert>
                </Snackbar>

                <Snackbar open={openSnackError} autoHideDuration={6000} onClose={handleCloseError}  key={"top" + "center"}>
                    <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                        No results found or Backend Failure. Please try again or contact the administrator!
                    </Alert>
                </Snackbar>

                {children}
            </>
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};