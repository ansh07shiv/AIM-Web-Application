# import flast module
import traceback
import random

from flask import Flask, render_template, request, redirect, url_for, session, jsonify, send_file
from flask_cors import CORS, cross_origin
import json

import pymongo

app = Flask(__name__)

cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)

client = pymongo.MongoClient("mongodb+srv://root:root@clusteraim.7gzslvl.mongodb.net/?retryWrites=true&w=majority")
db = client["aimDb"]

studentCollection = db["studentCollection"]
assignmentCollection = db["assignmentCollection"]
studentAssignmentSubmissionCollection = db["studentAssignmentSubmissionCollection"]

professorCollection = db["professorCollection"]


@app.route("/")
def hello_world():
    print("Root Route")
    print("Checking Mongo Connection")

    if client is None:
        print("Mongo Connection Failed!")
    else:
        print("Mongo Connection Success!")

    return "Root Route!"


@app.route("/registration", methods=["POST"])
def registration():
    try:
        json_object = json.loads(request.data)
        if json_object['userType'] == 'student':
            # Data
            student_user_data = {
                "firstName": json_object['firstName'],
                "lastName": json_object['lastName'],
                "email": json_object['email'],
                "phone": json_object['phone'],
                "university": json_object['university'],
                "degree": json_object['degree'],
                "major": json_object['major'],
                "password": json_object['password'],
            }
            studentCollection.insert_one(student_user_data)
        elif json_object['userType'] == 'professor':
            # Data
            professor_user_data = {
                "firstName": json_object['firstName'],
                "lastName": json_object['lastName'],
                "email": json_object['email'],
                "phone": json_object['phone'],
                "university": json_object['university'],
                "subject": json_object['subject'],
                "password": json_object['password'],
            }
            professorCollection.insert_one(professor_user_data)
        return "Success!"

    except:
        return "Failed!"
    # To Do Professor


@app.route("/login", methods=["POST"])
def login():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        email = json_object['email']
        password = json_object['password']
        user_student = studentCollection.find_one({'email': email, 'password': password})
        if user_student:
            return jsonify({"userType": "student"})
        else:
            user_professor = professorCollection.find_one({'email': email, 'password': password})
            print(user_professor)
            if user_professor:
                return jsonify({"userType": "professor"})
            else:
                return "Failed!"
    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/searchAssignment", methods=["POST"])
def search_assignment():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        if json_object['userType'] == 'student':
            # Data
            token = int(json_object['token'])
            email = json_object['email']
            assignment_found = assignmentCollection.find_one({'token': int(token)}, {'_id': 0})
            print("Search Assignment. ", assignment_found)
            if assignment_found:
                assignment_found = dict(assignment_found)
                # Search if Submission Exists
                check_assignment_submission_exist = (studentAssignmentSubmissionCollection.
                                                     find_one(({'token': int(token), 'email': email})))
                print(check_assignment_submission_exist)
                if check_assignment_submission_exist:
                    assignment_found['submissionExisting'] = "Y"
                else:
                    assignment_found['submissionExisting'] = "N"

                return jsonify(assignment_found)
            else:
                return "Failed!"
    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/addAssignment", methods=["POST"])
def add_assignment():
    try:
        json_object = json.loads(request.data)
        print("Object Received: ", json_object)
        random_token = random.randint(10000, 99999)
        if json_object['userType'] == 'professor':
            # Data
            assignment_data = {
                "course": json_object["course"],
                "professor": json_object["fullName"],
                "email": json_object["email"],
                "title": json_object["title"],
                "description": json_object["description"],
                "token": random_token,
                "deadlineDate": json_object["deadlineDate"]
            }

            assignmentCollection.insert_one(assignment_data)
            return str(random_token)
    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/addAssignmentSubmission", methods=["POST"])
def add_assignment_submission():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        if json_object['userType'] == 'student':
            # Data
            assignment_submission_data = {
                "email": json_object["email"],
                "token": int(json_object["token"]),
                "file": json_object["file"],
                "uploadedDate": json_object["uploadedDate"],
                "comments": "",
                "grades": "",
                "isLateSubmit": "Y" if json_object["isLateSubmit"] else "N"
            }
            check_exist = (studentAssignmentSubmissionCollection.find_one
                           ({'token': assignment_submission_data['token'],
                             'email': assignment_submission_data['email']}))
            if check_exist:
                studentAssignmentSubmissionCollection.update_one(
                    {'_id': check_exist['_id']},
                    {'$set': assignment_submission_data}
                )
            else:
                studentAssignmentSubmissionCollection.insert_one(assignment_submission_data)

            return "Success!"
    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/searchStudentAssignment", methods=["POST"])
def search_student_assignment():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        if json_object['userType'] == 'student':
            # Data
            email = json_object['email']
            search_student_assignment_result = studentAssignmentSubmissionCollection.find({'email': email}, {'_id': 0})

            if search_student_assignment_result:
                assignment_found = list(search_student_assignment_result)
                return_list_assignment_details = []
                for val in assignment_found:
                    token = int(val["token"])
                    assignment_detail = assignmentCollection.find_one({'token': int(token)}, {'_id': 0})
                    assignment_detail["comments"] = val["comments"]
                    if val["grades"]:
                        assignment_detail["grades"] = int(val["grades"])
                    else:
                        assignment_detail["grades"] = ""
                    return_list_assignment_details.append(assignment_detail)

                return jsonify(return_list_assignment_details)
            else:
                return "Failed!"
    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/studentProfile", methods=["POST"])
def get_student_profile():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        if json_object['userType'] == 'student':
            # Data
            email = json_object['email']
            search_student_result = studentCollection.find({'email': email}, {'_id': 0})

            if search_student_result:
                print(search_student_result)
                search_student_result = list(search_student_result)
                print(search_student_result)

                search_student_result = dict(search_student_result[0])
                return jsonify(search_student_result)
            else:
                return "Failed!"
    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/professorProfile", methods=["POST"])
def get_professor_profile():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        if json_object['userType'] == 'professor':
            # Data
            email = json_object['email']
            search_professor_result = professorCollection.find({'email': email}, {'_id': 0})

            if search_professor_result:
                print(search_professor_result)
                search_professor_result = list(search_professor_result)
                print(search_professor_result)

                search_professor_result = dict(search_professor_result[0])
                return jsonify(search_professor_result)
            else:
                return "Failed!"
    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/fetchPostedAssignment", methods=["POST"])
def fetch_posted_assignment():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        if json_object['userType'] == 'professor':
            # Data
            email = json_object["email"]
            assignment_found = assignmentCollection.find({'email': email}, {'_id': 0})
            if assignment_found:
                assignment_found = list(assignment_found)
                return jsonify(assignment_found)
            else:
                return "Failed!"
    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/getAssignmentSubmissionsProfessor", methods=["POST"])
def get_assignment_submissions_professor():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        if json_object['userType'] == 'professor':
            # Data
            token = int(json_object["token"])
            assignments_found = studentAssignmentSubmissionCollection.find({'token': int(token)}, {'_id': 0})
            if assignments_found:
                assignments_found = list(assignments_found)
                return jsonify(assignments_found)
            else:
                return "Failed!"
    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/addGradesAndComments", methods=["POST"])
def add_grades_and_comments():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        if json_object['userType'] == 'professor':
            # Data
            token = int(json_object["token"])
            email = json_object["email"]
            comments = json_object["comments"]
            grades = int(json_object["grades"])

            # Search the Assignment Submission
            assignment_submission = studentAssignmentSubmissionCollection.find_one(
                {'token': int(token), 'email': email})

            if assignment_submission:
                studentAssignmentSubmissionCollection.update_one(
                    {'_id': assignment_submission['_id']},
                    {'$set': {'grades': int(grades), 'comments': comments}}
                )
            return "Success!"
    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/reportStudentAssignment", methods=["POST"])
def report_student_assignment():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        if json_object['userType'] == 'admin':
            # Data
            token = int(json_object["token"])

            # Search the Assignment Submission
            assignment_results = (studentAssignmentSubmissionCollection.
                                  find({'token': int(token)}, {'_id': 0}).sort([('grades', -1)]))

            return_student_list = []

            if assignment_results:
                assignment_results = list(assignment_results)
                print(assignment_results)
                for val in assignment_results:
                    student_data = studentCollection.find_one({'email': val["email"]}, {'_id': 0})
                    student_data = dict(student_data)
                    student_data['grades'] = int(val['grades'])
                    student_data['uploadedDate'] = val['uploadedDate']
                    student_data['isLateSubmit'] = val['isLateSubmit']

                    return_student_list.append(student_data)
            return jsonify(return_student_list)
    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/reportStudentProfessor", methods=["POST"])
def report_student_professor():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        if json_object['userType'] == 'admin':
            # Data
            return_student_list = []

            email = json_object["email"]
            token_results = assignmentCollection.find({'email': email}, {'_id': 0})

            if token_results:
                token_results = list(token_results)
                for token_item in token_results:
                    print("Token Item: ", token_item)
                    assignment_results = (studentAssignmentSubmissionCollection.
                                          find({'token': int(token_item["token"])}, {'_id': 0}).sort([('grades', -1)]))

                    if assignment_results:
                        assignment_results = list(assignment_results)
                        student_submission_data = assignment_results[0]
                        print("Submission Data: ", student_submission_data)
                        assignment_token = token_item["token"]
                        assignment_title = token_item["title"]
                        grades = int(student_submission_data["grades"])

                        student_data = studentCollection.find_one({'email': student_submission_data["email"]},
                                                                  {'_id': 0})
                        return_data = dict(student_data)
                        return_data['title'] = assignment_title
                        return_data['grades'] = int(grades)
                        return_data['isLateSubmit'] = student_submission_data['isLateSubmit']
                        return_data['uploadedDate'] = student_submission_data['uploadedDate']

                        return_student_list.append(return_data)
                    else:
                        return "Failed!"
                return jsonify(return_student_list)
            else:
                return "Failed!"
        else:
            return "Failed!"

    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/downloadFile", methods=["POST"])
def download_file():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        if json_object['userType'] == 'professor':
            # Data
            file_path = json_object["filePath"]
            mimetype = 'application/zip'
            file_name = file_path.split('\\')[-1]
            return send_file(file_path, as_attachment=True, download_name=file_name, mimetype=mimetype)

    except Exception as e:
        print(e)
        return jsonify({'error': 'Exception'}), 500


@app.route("/professorDetails", methods=["POST"])
def professor_details():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        email = json_object['email']
        professor_details_result = professorCollection.find_one({'email': email}, {'_id': 0})

        if professor_details_result:
            professor_details_result = dict(professor_details_result)
            return jsonify(professor_details_result)
        else:
            return "Failed!"
    except Exception as e:
        print(e)
        return "Failed!"


@app.route("/studentReportLateSubmission", methods=["POST"])
def student_report_late_submission():
    try:
        json_object = json.loads(request.data)
        print(json_object)
        if json_object['userType'] == 'admin':
            # Data
            token = int(json_object["token"])
            all_student_email = studentAssignmentSubmissionCollection.find({'token': token, 'isLateSubmit': 'Y'}, {'_id': 0})
            return_list = []
            if all_student_email:
                all_student_email = list(all_student_email)
                for student_email in all_student_email:
                    student_data = studentCollection.find_one({'email': student_email['email']}, {'_id': 0})
                    student_data = dict(student_data)
                    student_data['uploadedDate'] = student_email['uploadedDate']
                    student_data['grades'] = int(student_email['grades'])
                    student_data['isLateSubmit'] = student_email['isLateSubmit']

                    return_list.append(student_data)
            return jsonify(return_list)

    except Exception as e:
        print(e)
        return "Failed!"
