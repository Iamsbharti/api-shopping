/**this file is only meant for api documentaion */
/**Sign up route */
router.post("/signup", signupParamValidation, signUpControl);
/**
 * @api {post} /api/v1/signup Register a new user
 * @apiVersion 0.0.1
 * @apiGroup UserManagement
 *
 * @apiParam {String} firstName Firstname of User
 * @apiParam {String} lastName Lastname of User
 * @apiParam {String} email Email of User
 * @apiParam {String} mobile Mobile of User
 * @apiParam {String} password Password needed for login
 * @apiParamExample {json} Sign-Up Sample Request
 * {
     "firstName": "nancy",
     "lastName":"sams",
     "email":"user@gmail.com",
     "mobile":223466372421,
     "password":"Aasdkjte123"
    }
 * @apiSuccessExample {json} Sign-Up Success Response
 * {
        "error": false,
        "status": 200,
        "message": "User Create Sucess",
        "data": {
            "createdOn": "2020-08-06T10:15:33.561Z",
            "friends": [],
            "userId": "QWLx8cOcJ",
            "firstName": "nancy",
            "lastName": "sams",
            "email": "user@gmail.com",
            "mobile": "223466372421"
        }
    }
 *  @apiParamExample {json} Sign-Up Invalid Params Request
 *  {
      "firstName": "nancy",
      "email":"user@gmail.com",
      "mobile":223466372421,
      "password":"Aasdkjte123"
    }
 *  @apiErrorExample {json} Sign-Up Invalid Params Response
    {
        "error": true,
        "status": 400,
        "message": "Not valid Input Params",
        "data": [
            "\"lastName\" is required"
        ]
    }
 *  @apiParamExample {json} Sign-Up Invalid User Request
 *  {
      "firstName": "nancy",
      "email":"user@gmail.com",
      "mobile":223466372421,
      "password":"Aasdkjte123"
    }
    @apiErrorExample {json} Sign-Up Invalid User Request
 *   {
        "error": true,
        "status": 401,
        "message": "User Exists",
        "data": "user@gmail.com"
      }
 */
/**login route */
router.post("/login", loginParamValidation, loginControl);
/**
 * @api {post} /api/v1/login Login a user
 * @apiVersion 0.0.1
 * @apiGroup UserManagement
 *
 * @apiParam {String} email Email of User
 * @apiParam {String} password Password for login
 * @apiParamExample {json} Login Sample Request
 * {
      "email":"user@gmail.com",
      "password":"saurabh123123"
    }
 * @apiSuccessExample {json} Sign-Up Success Response
 * {
       "error": false,
       "status": 200,
       "message": "Login Sucess",
       "data": {
          "createdOn": "2020-08-06T10:15:33.561Z",
          "friends": [],
          "userId": "QWLx8cOcJ",
          "firstName": "nancy",
          "lastName": "sams",
          "email": "user@gmail.com",
          "mobile": "223466372421",
          "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlRyRXNUNFVEZiIsImlhdCI6MTU5NjcwOTQxODE1NSwiZXhwIjoxNTk2ODgyMjE4LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJrYW5iYW5Cb2FyZCIsImRhdGEiOnsiY3JlYXRlZE9uIjoiMjAyMC0wOC0wNlQxMDoxNTozMy41NjFaIiwiZnJpZW5kcyI6W10sInVzZXJJZCI6IlFXTHg4Y09jSiIsImZpcnN0TmFtZSI6Im5hbmN5IiwibGFzdE5hbWUiOiJzYW1zIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsIm1vYmlsZSI6IjIyMzQ2NjM3MjQyMSJ9fQ.Qktve9MPXunk4dn5ETDsZOpEFrG_dnwcpIdILWwaXPo"
        }
    }
 *  @apiParamExample {json} Login Invalid User Request
 *  {
       "email":"us@gmail.com",
       "password":"saurabh123123"
    }
 *  @apiErrorExample {json} Login Invalid User Response
    {
       "error": true,
       "status": 404,
       "message": "User Not Found",
       "data": "us@gmail.com"
    }
 *  @apiParamExample {json} Login Invalid Password Request
 *  {
       "email":"user@gmail.com",
       "password":"saurabh1231"
    }
    @apiErrorExample {json} Login Invalid Password Request
 *  {
       "error": true,
       "status": 401,
       "message": "Login Failed",
       "data": null
    }
 * @apiParamExample {json} Login Invalid Params Request
 *  {
       "email":"user@gmail.com"
    }
    @apiErrorExample {json} Login Invalid Params Request
 *  {
       "error": true,
       "status": 400,
       "message": "Not valid Input Params",
       "data": [
          "\"password\" is required"
       ]
    }
 */
/**Forgot password */
router.post("/recoverPassword", recoverPwdValidation, recoverPwdControl);
/**
 * @api {post} /api/v1/recoverPassword RecoverPassword Via Email
 * @apiVersion 0.0.1
 * @apiGroup UserManagement
 *
 * @apiParam {String} email Email of User
 * 
 * @apiParamExample {json} RecoverPassword Sample Request
 * {
      "email":"user@gmail.com",
   }
 * @apiSuccessExample {json} RecoverPassword Success Response
 * {
       "error": false,
       "status": 200,
       "message": "Recovery Sucess",
       "data": {
           "email": "user@gmail.com",
           "recoveryCode": 759774,
           "Operation": "Email Sent"
        }
    }
 *  @apiParamExample {json} RecoverPassword Invalid User Request
 *  {
       "email":"us@gmail.com"   
    }
 *  @apiErrorExample {json} RecoverPassword Invalid User Response
    {
      "error": true,
      "status": "404",
      "message": "User Not Found",
      "data": null
    }
 */
/**Reset password */
router.post("/resetPassword", resetPwdValidation, resetPassword);
/**
 * @api {post} /api/v1/resetPassword ResetPassword for a User
 * @apiVersion 0.0.1
 * @apiGroup UserManagement
 *
 * @apiParam {String} recoveryCode RecoveryCode sent in email
 * @apiParam {String} email Email of User
 * @apiParam {String} password NewPassword SetBy the User
 * 
 * @apiParamExample {json} ResetPassword Sample Request
 * {
       "recoveryCode":"759774",
       "email":"user@gmail.com",
       "password":"bharti123"
    }
 * @apiSuccessExample {json} ResetPassword Success Response
 * {
      "error": false,
      "status": 200,
      "message": "Password Reset Success",
      "data": {
        "updated": 1,
        "email": "user@gmail.com"
      }
    }
 *  @apiParamExample {json} ResetPassword Invalid User Request
 *  {
      "recoveryCode":"759774",
      "email":"us@gmail.com",
      "password":"bharti123"
    }
 *  @apiErrorExample {json} ResetPassword Invalid User Response
    {
      "error": true,
      "status": "404",
      "message": "User Not Found",
      "data": null
    }
 *  @apiParamExample {json} ResetPassword Invalid Params Request
 *  {
      "recoveryCode":"759774",
      "email":"user@gmail.com",
    }
 *  @apiErrorExample {json} ResetPassword Invalid Params Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
         "\"password\" is required"
      ]
    }
 * @apiParamExample {json} ResetPassword Invalid RecoveryCode Request
 *  {
      "recoveryCode":"546346",
      "email":"user@gmail.com",
      "password":"bharti123"
    }
 *  @apiErrorExample {json} ResetPassword Invalid RecoveryCode Response
    {
      "error": true,
      "status": 400,
      "message": "Not Valid RecoveryCode",
      "data": null
    }
 *
 */
/*Create TaskList*/
router.post(
  "/createTaskList",
  isAuthorized,
  taskListValidation,
  createTaskList
);
/**
 * @api {post} /api/v1/createTaskList Create a tasklist
 * @apiVersion 0.0.1
 * @apiGroup TaskManagement
 *
 * @apiParam {String} name TaskList Name
 * @apiParam {String} userId User's Unique Id
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} TaskList Create Sample Request
 * {
      "name": "start-project",
      "userId":"QWLx8cOcJ"
    }
 * @apiSuccessExample {json} TaskList Creation Success Response
 * {
      "error": false,
      "status": 200,
      "message": "Task List Created",
      "data": {
        "createdOn": "2020-08-06T10:56:31.573Z",
        "name": "start-project",
        "userId": "QWLx8cOcJ",
        "taskListId": "BUpX2mV3E"
      }
    }
 *  @apiParamExample {json} TaskList Creation Invalid Name Request
 *  {
      "name": "st",
      "userId":"QWLx8cOcJ"
    }
 *  @apiErrorExample {json} TaskList Creation Invalid Name Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
        "\"name\" length must be at least 3 characters long"
      ]
    }
 *  @apiParamExample {json} TaskList Creation Invalid Params Request
 *  {
     //blank request
    }
 *  @apiErrorExample {json} TaskList Creation Invalid Params Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
        "\"name\" is required",
        "\"userId\" is required"
      ]
    }
 * @apiParamExample {json} TaskList Creation Invalid User Request
 *  {
      "name": "start-project",
      "userId":"QWLx8c"
    }
 *  @apiErrorExample {json} TaskList Creation Invalid User Response
    {
      "error": true,
      "status": 404,
      "message": "UserId Not Found",
      "data": "QWLx8cO"
    }
 * @apiParamExample {json} TaskList Creation No AuthToken Request
 *  {
      "name": "start-project",
      "userId":"QWLx8cOcJ"
    }
    @apiHeader {string} authToken If No authToken is passed as header
 *  @apiErrorExample {json} TaskList Creation No AuthToken Response
    {
      "error": true,
      "status": 400,
      "message": "AuthToken Missing",
      "data": "QWLx8cO"
    }
 * 
 */
/**get all taskList for a userId */
router.post(
  "/getAllTaskList",
  isAuthorized,
  getTaskListValidation,
  getAllTaskList
);
/**
 * @api {post} /api/v1/getAllTaskList?skip=[value] Get all Tasklists for a user
 * @apiVersion 0.0.1
 * @apiGroup TaskManagement
 *
 * @apiParam {String} userId User's Unique Id
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} TaskList Create Sample Request
 * {
      "userId":"QWLx8cOcJ"
   }
 * @apiSuccessExample {json} Get AllTaskList Success Response
 * {
      "error": false,
      "status": 200,
      "message": "Task List Fetched",
      "data": [
        {
            "createdOn": "2020-08-06T10:56:31.573Z",
            "name": "start-project",
            "userId": "QWLx8cOcJ",
            "taskListId": "BUpX2mV3E"
        }
      ]
   }
 *  @apiParamExample {json} Get AllTaskList Invalid User Request
 *  {
      "userId":"QWLx8c"
    }
 *  @apiErrorExample {json} Get AllTaskList Invalid User Response
    {
      "error": true,
      "status": 404,
      "message": "UserId Not Found",
      "data": "QWLx8cO"
    }
 *  @apiParamExample {json} Get AllTaskList Invalid Params Request
 *  {
     //blank request
    }
 *  @apiErrorExample {json} Get AllTaskList Invalid Params Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
        "\"userId\" is required"
      ]
    }
 * @apiParamExample {json} Get AllTaskList No AuthToken Request
 *  {
      "userId":"QWLx8cOcJ"
    }
    @apiHeader {string} authToken If No authToken is passed as header
 *  @apiErrorExample {json} Get AllTaskList Sample Error Response 3
    {
      "error": true,
      "status": 400,
      "message": "AuthToken Missing",
      "data": "QWLx8cO"
    }
 */
/**update/delete tasklist*/
router.post(
  "/updateTaskList",
  isAuthorized,
  updateTaskListValidation,
  updateTaskList
);
/**
 * @api {post} /api/v1/updateTaskList Update name of a Tasklist 
 * @apiVersion 0.0.1
 * @apiGroup TaskManagement
 *
 * @apiParam {String} userId User's Unique Id
 * @apiParam {String} taskListId TaskList's Unique Id
 * @apiParam {String} operation operation edit/delete
 * @apiParam {json} Request-Example:
                 [update:{ "name": "updated-name" }]
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} Update a TaskList Sample Request
 * {
     "userId": "QWLx8cOcJ",
     "taskListId": "BUpX2mV3E",
     "operation": "edit",
     "update": {
        "name": "project-complete"
     }
    }
 * @apiSuccessExample {json} Update a TaskList Success Response
 * {
      "error": false,
      "status": 200,
      "message": "TaskList Updated",
      "data": "1-doc updated"
    }
 *  @apiParamExample {json} Delete a TaskList Sample Success Request
 *  {
      "userId": "QWLx8cOcJ",
      "taskListId": "6Z99Ytlax",
      "operation": "delete"
    }
 *  @apiErrorExample {json} Delete a TaskList Sample Success Response
    {
      "error": false,
      "status": 200,
      "message": "TaskList deleted",
      "data": "1-docs deleted"
    }
 *  @apiParamExample {json} update/delete TaskList Invalid Params Request
 *  {
     //blank request
    }
 *  @apiErrorExample {json} update/delete TaskList Invalid Params Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
        "\"taskListId\" is required",
        "\"operation\" is required",
        "\"userId\" is required"
      ]
    }
 *  
 *  @apiParamExample {json} update/delete TaskList No AuthToken Request
 *  {
      "userId": "QWLx8cOcJ",
      "taskListId": "6Z99Ytlax",
      "operation": "delete"
    }
    @apiHeader {string} authToken If No authToken is passed as header
 *  @apiErrorExample {json} update/delete TaskList No AuthToken Response
    {
      "error": true,
      "status": 400,
      "message": "AuthToken Missing",
      "data": "QWLx8cO"
    }
 *
 *
 */

/**Create task */
router.post("/createTask", isAuthorized, createTaskValidation, createTask);
/**
 * @api {post} /api/v1/createTask Create a task
 * @apiVersion 0.0.1
 * @apiGroup TaskManagement
 *
 * @apiParam {String} name Task Name
 * @apiParam {String} taskListId List's Unique Id for the task
 * @apiParam {String} useruserIdId User's Unique Id
 * @apiParam {String} status Status of task open/done
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} Task Create Sample Request
 * {
      "name":"task 1",
      "taskListId":"BUpX2mV3E",
      "userId":"QWLx8cOcJ",
      "status":"open"
    }
 * @apiSuccessExample {json} Task Creation Success Response
 * {
        "error": false,
        "status": 200,
        "message": "Task Created",
        "data": {
            "createdOn": "2020-08-06T11:40:50.967Z",
            "name": "task 1",
            "taskId": "_0g28dnYQ",
            "taskListId": "BUpX2mV3E",
            "userId": "QWLx8cOcJ",
            "status": "open"
        }
    }
 *  @apiParamExample {json} Task Creation Invalid Name Request
 *  {
      "name":"t",
      "taskListId":"BUpX2mV3E",
      "userId":"QWLx8cOcJ",
      "status":"open"
    }
 *  @apiErrorExample {json} Task Creation Invalid Name Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
        "\"name\" length must be at least 3 characters long"
      ]
    }
 *  @apiParamExample {json} Task Creation Invalid Params Request
 *  {
     //blank request
    }
 *  @apiErrorExample {json} Task Creation Invalid Params Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
        "\"name\" is required",
        "\"taskListId\" is required",
        "\"userId\" is required"
      ]
    }
 * @apiParamExample {json} Task Creation Invalid TaskListId Request
 *  {
      "name":"t",
      "taskListId":"BUpX2mV",
      "userId":"QWLx8cOcJ",
      "status":"open"
    }
 *  @apiErrorExample {json} TaskList Creation Invalid TaskListId Response
    {
      "error": true,
      "status": 404,
      "message": "TaskListId Not Found",
      "data": "BUpX2mV"
    }
 *  @apiParamExample {json} Task Creation Invalid userId Request 
 *  {
      "name":"t",
      "taskListId":"BUpX2mV3E",
      "userId":"QWLx8cO",
      "status":"open"
    }
 *  @apiErrorExample {json} Task Creation Invalid userId  Response
    {
      "error": true,
      "status": 404,
      "message": "UserId Not Found",
      "data": "QWLx8cO"
    }
 *  @apiParamExample {json} Task Creation Existing TaskName Request 
 *  {
      "name":"task 1",
      "taskListId":"BUpX2mV3E",
      "userId":"QWLx8cOcJ",
      "status":"open"
    }
 *  @apiErrorExample {json} Task Creation Existing TaskName  Response
    {
      "error": true,
      "status": 400,
      "message": "Task Name Exists",
      "data": "task 1"
    }

 * @apiParamExample {json} Task Creation No AuthToken Request
 *  {
      "name": "start-project",
      "userId":"QWLx8cOcJ"
    }
    @apiHeader {string} authToken If No authToken is passed as header
 *  @apiErrorExample {json} Task Creation No AuthToken Response
    {
      "error": true,
      "status": 400,
      "message": "AuthToken Missing",
      "data": "QWLx8cO"
    } 
 */
/**get all tasks for listid and userid */
router.post("/getTasks", isAuthorized, getTaskValidation, getAllTasks);
/**
 * @api {post} /api/v1/getTasks Get all Tasks for a user & TaskList
 * @apiVersion 0.0.1
 * @apiGroup TaskManagement
 *
 * @apiParam {String} taskListId TaskLists's Unique Id
 * @apiParam {userId} userId User's Unique Id
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} TaskList Create Sample Request
 * {
 *    "taskListId": "BUpX2mV3E",
      "userId":"QWLx8cOcJ"
   }
 * @apiSuccessExample {json} Get AllTasks Success Response
 * {
      "error": false,
      "status": 200,
      "message": "Fetched Tasks",
      "data": [
        {
            "createdOn": "2020-08-06T11:40:50.967Z",
            "name": "task 1",
            "taskId": "_0g28dnYQ",
            "taskListId": "BUpX2mV3E",
            "userId": "QWLx8cOcJ",
            "status": "open"
        }
      ]
   }
 *  @apiParamExample {json} Get AllTasks Invalid User Request
 *  {
      "taskListId": "BUpX2mV3E",
      "userId":"QWLx8cO"
    }
 *  @apiErrorExample {json} Get AllTasks Invalid User Response
    {
      "error": true,
      "status": 404,
      "message": "UserId Not Found",
      "data": "QWLx8cO"
    }
 *  @apiParamExample {json} Get AllTasks Invalid Params Request
 *  {
     //blank request
    }
 *  @apiErrorExample {json} Get AllTasks Invalid Params Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
        "\"userId\" is required",
        "\"taskListId\" is required"
      ]
    }
 * @apiParamExample {json} Get AllTasks No AuthToken Request
 *  {
      "taskListId": "BUpX2mV3E",
      "userId":"QWLx8cOcJ"
    }
    @apiHeader {string} authToken If No authToken is passed as header
 *  @apiErrorExample {json} Get AllTasks Sample Error Response 3
    {
      "error": true,
      "status": 400,
      "message": "AuthToken Missing",
      "data": "QWLx8cO"
    }
 */
/**update/delete task */
router.post("/updateTask", isAuthorized, updateTaskValidation, updateTask);
/**
 * @api {post} /api/v1/updateTask Update a Task
 * @apiVersion 0.0.1
 * @apiGroup TaskManagement
 *
 * @apiParam {String} userId User's Unique Id
 * @apiParam {String} taskIdId Task's Unique Id
 * @apiParam {String} taskListId TaskList's Unique Id
 * @apiParam {String} operation operation edit/delete
 * @apiParam {json} Request-Example:
                 [update:{ "name": "updated-name","status": "done","taskListId": "5ipvkk7Vn" }]
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} Update a Task Sample Request
 * {
        "taskId": "_0g28dnYQ",
        "taskListId": "BUpX2mV3E",
        "userId": "QWLx8cOcJ",
        "operation": "edit",
        "update": {
            "name": "task 2",
            "status": "done",
            "taskListId": "9BtUxPstM"
        }
    }
 * @apiSuccessExample {json} Update a Task Success Response
 * {
      "error": false,
      "status": 200,
      "message": "Task Updated",
      "data": "1-doc updated"
    }
 *  @apiParamExample {json} Delete a Task Sample Success Request
 *  {
      "taskId": "_0g28dnYQ",
      "taskListId": "BUpX2mV3E",
      "userId": "QWLx8cOcJ",
      "operation": "delete"
    }
 *  @apiErrorExample {json} Delete a Task Sample Success Response
    {
      "error": false,
      "status": 200,
      "message": "Task deleted",
      "data": "1-docs deleted"
    }
 *  @apiParamExample {json} update/delete Task Invalid Params Request
 *  {
     //blank request
    }
 *  @apiErrorExample {json} update/delete Task Invalid Params Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
         "\"taskListId\" is required",
        "\"operation\" is required",
        "\"taskId\" is required",
        "\"userId\" is required"
      ]
    }
 *  
 *  @apiParamExample {json} update/delete Task No AuthToken Request
 *  {
      "taskId": "_0g28dnYQ",
      "taskListId": "BUpX2mV3E",
      "userId": "QWLx8cOcJ",
      "operation": "delete"
    }
    @apiHeader {string} authToken If No authToken is passed as header
 *  @apiErrorExample {json} update/delete Task No AuthToken Response
    {
      "error": true,
      "status": 400,
      "message": "AuthToken Missing",
      "data": "_0g28dnYQ"
    }
 *
 *
 */
/**create subtask */
router.post(
  "/createSubTask",
  isAuthorized,
  createSubTaskValidation,
  createSubTask
);
/**
 * @api {post} /api/v1/createSubTask Create a SubTask
 * @apiVersion 0.0.1
 * @apiGroup TaskManagement
 *
 * @apiParam {String} name SubTask Name
 * @apiParam {String} userId User's Unique Id
 * @apiParam {String} taskId User's Unique Id
 * @apiParam {String} status Status of Subtask
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} SubTask Create Sample Request
 * {
      "taskId": "gKmVTLkfa",
      "userId": "QWLx8cOcJ",
      "name":"sub-task 1",
      "status":"open"
    }
 * @apiSuccessExample {json} SubTask Creation Success Response
 * {
        "error": false,
        "status": 200,
        "message": "Sub Task Created",
        "data": {
            "createdOn": "2020-08-06T13:19:18.506Z",
            "status": "open",
            "name": "sub-task 1",
            "subTaskId": "sEFE9f0Nb",
            "taskId": "gKmVTLkfa",
            "userId": "QWLx8cOcJ"
        }
    }
 *  @apiParamExample {json} SubTask Creation Invalid Name Request
 *  {
      "taskId": "gKmVTLkfa",
      "userId": "QWLx8cOcJ",
      "name":"sub-task 1",
      "status":"open"
    }
 * 
 *  @apiErrorExample {json} SubTask Creation Invalid Name Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
        "\"name\" length must be at least 3 characters long"
      ]
    }
 *  @apiParamExample {json} SubTask Creation Invalid Params Request
 *  {
     //blank request
    }
 *  @apiErrorExample {json} SubTask Creation Invalid Params Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
        "\"name\" is required",
        "\"taskId\" is required",
        "\"status\" is required",
        "\"userId\" is required"
      ]
    }
 * @apiParamExample {json} SubTask Creation Invalid User Request
 *  {
      "taskId": "gKmVTLkfa",
      "userId": "QWLx8cO",
      "name":"sub-task 1",
      "status":"open"
    }
 *  @apiErrorExample {json} SubTask Creation Invalid User  Response
    {
      "error": true,
      "status": 404,
      "message": "UserId Not Found",
      "data": "QWLx8cO"
    }
 * @apiParamExample {json} SubTask Creation Invalid TaskId Request
 *  {
      "taskId": "gKmVTLk",
      "userId": "QWLx8cO",
      "name":"sub-task 1",
      "status":"open"
    }
 *  @apiErrorExample {json} SubTask Creation Invalid TaskId  Response
    {
      "error": true,
      "status": 404,
      "message": "TaskId Not Found",
      "data": "gKmVTLk"
    }
 * @apiParamExample {json} SubTask Creation Existing SubTaskName Request
 *  {
      "taskId": "gKmVTLkfa",
      "userId": "QWLx8cO",
      "name":"sub-task 1",
      "status":"open"
    }
 *  @apiErrorExample {json} SubTask Creation Existing SubTaskName Response
    {
      "error": true,
      "status": 404,
      "message": "Sub Task Name Exists",
      "data": "sub-task 1"
    }
 * @apiParamExample {json} SubTask Creation No AuthToken Request
 *  {
      "name": "start-project",
      "userId":"QWLx8cOcJ"
    }
    @apiHeader {string} authToken If No authToken is passed as header
 *  @apiErrorExample {json} SubTask Creation No AuthToken Response
    {
      "error": true,
      "status": 400,
      "message": "AuthToken Missing",
      "data": null
    }
 * 
 */
router.post("/getSubTasks", isAuthorized, getSubTaskValidation, getSubTasks);
/**
 * @api {post} /api/v1/getSubTasks Get all SubTasks for a Task
 * @apiVersion 0.0.1
 * @apiGroup TaskManagement
 *
 * @apiParam {String} taskId Task's Unique Id
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} TaskList Create Sample Request
 * {
 *    "taskId": "gKmVTLkfa" 
   }
 * @apiSuccessExample {json} Get AllSubTasks Success Response
 * {
        "error": false,
        "status": 200,
        "message": "Fetched Subtasks",
        "data": [
            {
                "createdOn": "2020-08-06T13:19:18.506Z",
                "status": "open",
                "name": "sub-task 1",
                "subTaskId": "sEFE9f0Nb",
                "taskId": "gKmVTLkfa",
                "userId": "QWLx8cOcJ"
            }
        ]
    }
 *  @apiParamExample {json} Get AllSubTasks Invalid TaskId Request
 *  {
      "taskId": "gKmVTLkf"
    }
 *  @apiErrorExample {json} Get AllSubTasks Invalid TaskId Response
    {
      "error": true,
      "status": 404,
      "message": "TaskId Not Found",
      "data": "gKmVTLkf"
    }
 *  @apiParamExample {json} Get AllSubTasks Invalid Params Request
 *  {
     //blank request
    }
 *  @apiErrorExample {json} Get AllSubTasks Invalid Params Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
        "\"taskId\" is required"
      ]
    }
 * @apiParamExample {json} Get AllSubTasks No AuthToken Request
 *  {
      "taskId": "gKmVTLkfa"
    }
    @apiHeader {string} authToken If No authToken is passed as header
 *  @apiErrorExample {json} Get AllSubTasks Sample Error Response 3
    {
      "error": true,
      "status": 400,
      "message": "AuthToken Missing",
      "data": null
    }
 */
/**update/delete subtask */
router.post(
  "/updateSubTask",
  isAuthorized,
  updateSubTaskValidation,
  updateSubTask
);
/**
 * @api {post} /api/v1/updateSubTask Update a SubTask
 * @apiVersion 0.0.1
 * @apiGroup TaskManagement
 *
 * @apiParam {String} userId User's Unique Id
 * @apiParam {String} subTaskId SubTask's Unique Id
 * @apiParam {String} taskId Task's Unique Id
 * @apiParam {String} operation operation edit/delete
 * @apiParam {json} Request-Example:
                 [update:{ "name": "updated-name","status": "done","taskId": "5ipvkk7Vn" }]
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} Update a SubTask Sample Request
 * {
        "subTaskId": "sEFE9f0Nb",
        "taskId": "gKmVTLkfa",
        "operation": "edit",
        "userId": "QWLx8cOcJ",
        "update":{
            "name":"updated-sub",
            "status":"done",
            "taskId":"gKmVTLkfa"
        }
    }
 * @apiSuccessExample {json} Update a SubTask Success Response
 * {
      "error": false,
      "status": 200,
      "message": "SubTask Updated",
      "data": "1-doc updated"
    }
 *  @apiParamExample {json} Delete a SubTask Sample Success Request
 *  {
        "subTaskId": "sEFE9f0Nb",
        "taskId": "gKmVTLkfa",
        "operation": "delete",
        "userId": "QWLx8cOcJ"
    }
 *  @apiErrorExample {json} Delete a SubTask Sample Success Response
    {
      "error": false,
      "status": 200,
      "message": "SubTask Deleted",
      "data": "1-doc deleted"
    }
 *  @apiParamExample {json} update/delete SubTask Invalid Params Request
 *  {
     //blank request
    }
 *  @apiErrorExample {json} update/delete SubTask Invalid Params Response
    {
      "error": true,
      "status": 400,
      "message": "Not valid Input Params",
      "data": [
        "\"operation\" is required",
        "\"taskId\" is required",
        "\"subTaskId\" is required",
        "\"userId\" is required"
      ]
    }
 *  
 *  @apiParamExample {json} update/delete SubTask No AuthToken Request
 *  {
        "subTaskId": "sEFE9f0Nb",
        "taskId": "gKmVTLkfa",
        "operation": "delete",
        "userId": "QWLx8cOcJ"
    }
    @apiHeader {string} authToken If No authToken is passed as header
 *  @apiErrorExample {json} update/delete SubTask No AuthToken Response
    {
      "error": true,
      "status": 400,
      "message": "AuthToken Missing",
      "data": null
    }
 *
 *
 */
/**get friendRequests */
router.post(
  "/getFriendRequests",
  isAuthorized,
  getFriendRequestsValidation,
  getFriendList
);
/**
 * @api {post} /api/v1/getFriendRequests Get Friend Requests for A User
 * @apiVersion 0.0.1
 * @apiGroup MultiUser
 *
 * @apiParam {String} senderId user's or sender unique Id
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} Get FriendRequest Status Sample Request
 * {
       "senderId":"eetkc3U56"
   }
 * @apiSuccessExample {json} Get FriendRequest Status Response
 * {
        "error": false,
        "status": 200,
        "message": "FriendRequests Fetched",
        "data": [
            {
                "status": "accepted",
                "createdOn": "2020-08-03T13:07:42.309Z",
                "uniqueCombination": "F7cL5F5Xm:eetkc3U56",
                "recieverId": "eetkc3U56",
                "recieverName": "saurabh bharti",
                "senderId": "F7cL5F5Xm",
                "senderName": "nancy sams"
            }
        ]
    }
 *  
 *  @apiParamExample {json} Get FriendRequest Invalid Params Request
 *  {
     //blank request
    }
 *  @apiErrorExample {json} Get FriendRequest Invalid Params Response
    {
        "error": true,
        "status": "Not Valid Input Params",
        "message": "\"senderId\" is required"
    }
 *  
 *  @apiParamExample {json} Get FriendRequest No AuthToken Request
 *  {
        "subTaskId": "sEFE9f0Nb",
        "taskId": "gKmVTLkfa",
        "operation": "delete",
        "userId": "QWLx8cOcJ"
    }
    @apiHeader {string} authToken If No authToken is passed as header
 *  @apiErrorExample {json} Get FriendRequest No AuthToken Response
    {
      "error": true,
      "status": 400,
      "message": "AuthToken Missing",
      "data": null
    }
 *
 *
 */
/**revert changes */
router.post("/revertChanges", isAuthorized, revertValidation, revertChanges);
/**
 * @api {post} /api/v1/revertChanges Undo Last Change Done by a User
 * @apiVersion 0.0.1
 * @apiGroup TaskManagement
 *
 * @apiParam {String} userId User's Unique Id
 * @apiHeader {String} authToken AuthorizationToken Recieved after Login Success
 * @apiParamExample {json} Undo Last Change Sample Request
 * {
        "userId":"eetkc3U56"
   }
 * @apiSuccessExample {json} Undo Last Change Success Response
 * {
        "error": false,
        "status": 200,
        "message": "Revert Success",
        "data": {
            "_id": "5f2b3ba7bf4dd9121909b52e",
            "userId": "eetkc3U56",
            "entity": "TaskList",
            "updatedOn": "2020-08-05T23:07:19.959Z",
            "updateId": "eetkc3U56:hArugVncn:1596668839959",
            "operation": "create",
            "__v": 0
        }
    }
 *  @apiParamExample {json} Undo Last Change No Change Request
 *  {
        "userId":"eetkc3U"
    }
 *  @apiErrorExample {json} Undo Last Change No Change Response
    {
        "error": true,
        "status": 404,
        "message": "No Historic Data Found",
        "data": null
    }
 *  
 *  
 *  @apiParamExample {json} Undo Last Change No AuthToken Request
 *  {
        "userId":"eetkc3U"
    }
    @apiHeader {string} authToken If No authToken is passed as header
 *  @apiErrorExample {json} Undo Last Change No AuthToken Response
    {
      "error": true,
      "status": 400,
      "message": "AuthToken Missing",
      "data": null
    }
 *
 *
 */
