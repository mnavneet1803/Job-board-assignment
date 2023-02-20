## config file has database connection 
## utility file has some common useful functions



# ABOUT THIS APP
This application is built on MVC Framework.

In this job board application, there are two usertype 
1) Candidate  #one who apply and find for job
2) Recruiter   #onewho create a job so candidate can apply on it

Inputformat
name / email /usertype is String
experiencelevel is String datatype denotes year of experience


Key features of this app:
Tasks Recruiter can only perform - 
* Post a Job
* Update a specific job.
* Delete a particular posted Job.
* Can View the applications received for a particular job posted by them.

Tasks Candidates can only perform - 
* Apply for a specific job using job Id.
* Update their Job application.
* Delete a job application.

Tasks every user can perform - 
* View all jobs.
* View some jobs by using filters on fields like skills and experience level.
* Search a specific job using job title.
* Get a specific job using job id.



Nodejs, ExpressJs,is used for creating and running server. 
Mongodb is used for storing data.
Mongoose ORM is used for interacting with database.
JWT is used for authentication and authorizations of users.
