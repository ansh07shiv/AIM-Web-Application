import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AssignmentDetail from "./AssignmentDetail";
import * as React from "react";
import axios from "axios";
import {useState} from "react";
import {useAppContext} from "../../AppContext";
import {CompareWithTodayIsLate} from "../Utilities/CompareWithTodayIsLate";

const SearchAssignment = (props) => {

    const{handleOpenError,handleOpenSnackBar}=useAppContext();


    const [token, setToken] = useState("");
    const [assignmentDetail, setAssignmentDetail] = useState({});
    const [showAssignmentDetail, setShowAssignmentDetail] = useState(false);
    const [isLateSubmit, setIsLateSubmit] = useState(false);

    const tokenChangeHandler = (event) => {
        setToken(event.target.value);
    }

    const searchAssignmentClickHandler = () => {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/searchAssignment",
            data: {
                token,
                userType: 'student',
                email: localStorage.getItem("email")
            }
        }).then((response) => {
            console.log(response);
            if (response.data.toString().includes("Failed!")) {
                handleOpenError();
                console.log("No Data Found!")
                setAssignmentDetail([]);
                setShowAssignmentDetail(false);
            } else {
                handleOpenSnackBar();
                if(CompareWithTodayIsLate(response.data.deadlineDate)) {
                    setIsLateSubmit(true);
                } else {
                    setIsLateSubmit(false);
                }
                setAssignmentDetail(response.data);
                setShowAssignmentDetail(true);
            }
        }).catch((error) => {
            handleOpenError();
        })
    }

    const uploadHandler = (event) => {
        console.log("In Upload Handler");
        console.log(event)
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/addAssignmentSubmission",
            data: {
                email: localStorage.getItem("email"),
                token,
                file: "C:\\Users\\TRANS20-LAP-RA2\\Downloads\\" + event.target.files[0].name,
                userType: 'student',
                uploadedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                isLateSubmit: isLateSubmit,
            }
        }).then((response) => {
            console.log(response);
            if (response.data.includes("Success!")) {
                handleOpenSnackBar();
                props.showHistoryHandler();
            } else {
                handleOpenError();
            }
        }).catch((error) => {
            handleOpenError();
        })
    }

  return (
      <Grid container spacing={3}>
          <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="assignmentToken"
                  label="Enter Token"
                  name="assignmentToken"
                  autoComplete="assignmentToken"
                  onChange={tokenChangeHandler}
              />
          </Grid>

          <Grid item xs={12}>
              <Button variant="outlined" onClick={searchAssignmentClickHandler}>Search
                  Assignment</Button>
          </Grid>
          <Grid item xs={12}>
              {showAssignmentDetail && (
                  <AssignmentDetail title={assignmentDetail.title}
                                    professor={assignmentDetail.professor}
                                    course={assignmentDetail.course}
                                    description={assignmentDetail.description}
                                    submissionExisting ={assignmentDetail.submissionExisting}
                                    uploadHandler={uploadHandler}
                                    deadlineDate = {assignmentDetail.deadlineDate}
                                    lateSubmit = {isLateSubmit}
                  />
              )}
          </Grid>

      </Grid>
  );
}

export default SearchAssignment;