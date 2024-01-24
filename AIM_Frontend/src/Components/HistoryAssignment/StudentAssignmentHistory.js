import {useEffect, useState} from "react";
import axios from "axios";
import AssignmentDetailPostSubmission from "./AssignmentDetailPostSubmission";
import {useAppContext} from "../../AppContext";

const StudentAssignmentHistory = () => {
    const{handleOpenError,handleOpenSnackBar}=useAppContext();
    const [assignmentHistoryList, setAssignmentHistoryList] = useState([]);
    useEffect(() => {
        console.log("Use Effect Called!");
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/searchStudentAssignment",
            data: {
                email: localStorage.getItem("email"),
                userType: 'student',
            }
        }).then((response) => {
            console.log(response);
            if(response.data.toString().includes("Failed!")) {
                handleOpenError();
                console.log("No Data Found!");
            } else {
                handleOpenSnackBar();
                console.log(response.data);
                setAssignmentHistoryList(response.data);
            }
        }).catch((error) => {
            handleOpenError();
        })
    }, []);
  return (
      <>
          {assignmentHistoryList.map((item, index) => (
              <>
              <AssignmentDetailPostSubmission title={item.title} professor={item.professor} course={item.course} description={item.description} comments={item.comments} grades={item.grades}/>
              <br/>
              </>
          ))}
      </>
  );

}

export default StudentAssignmentHistory;