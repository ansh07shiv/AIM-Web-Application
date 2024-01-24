import ViewReviewAssignmentItem from "./ViewReviewAssignmentItem";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAppContext} from "../../AppContext";

const ViewReviewAssignments = () => {
    const{handleOpenError,handleOpenSnackBar}=useAppContext();
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {

        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/fetchPostedAssignment",
            data: {email: localStorage.getItem("email"), userType: "professor"}
        }).then((response) => {
            handleOpenSnackBar();
            console.log("Result: ", response.data);
            setAssignments(response.data);

        }).catch((error) => {
            handleOpenError();
        })
    }, []);
  return(
    <>
        {assignments.map((item) => (
            <>
            <ViewReviewAssignmentItem title={item.title} course={item.course} token={item.token} deadlineDate={item.deadlineDate}/>
                <br/>
            </>
        ))}
    </>
  );
}

export default ViewReviewAssignments;