import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Alert from "@mui/material/Alert";
import {Chip} from "@mui/material";

const StudentItem = (props) => {
    let fullName = "Name: " + props.firstName + " " + props.lastName;
    return(
        <>
            <Alert severity="info">
            <ListItem alignItems="flex-start">
                {/*<ListItemAvatar>*/}
                {/*    /!*<Avatar alt="A"/>*!/*/}
                {/*</ListItemAvatar>*/}
                <ListItemText
                    primary={fullName}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Grades: {props.grades}
                                <br/>
                                Submitted On: {props.uploadedDate} {props.isLateSubmit == "Y" && (<Chip label="LATE" color="error" variant="outlined" />)}
                            </Typography>
                            <br/>
                            Degree and Course: {props.degree} in {props.major}
                        </React.Fragment>
                    }
                />
            </ListItem>
            {/*<Divider variant="inset" component="li" />*/}
            </Alert>
        </>
    );
}

export default StudentItem;