Smart Hospital Management System



-----------To run the project-------------- 

1.Pip install requirement.txt

2.In database.py

*set database connection url

*create database-HospitalManagementSystem

*create collections-patients,doctors,appointments,receptionist

3.In backend folder 

create .env file ,set up your Twilio account and GROQ API Key

TWILIO_ACCOUNT_SID=#########
TWILIO_AUTH_TOKEN=######
TWILIO_PHONE_NUMBER=##########
GROQ_API_KEY = "###########"

4.In mongodb insert  doctor and receptionist -just for prototype ,later progress include doctor and receptionist registrations

For example:In doctors collection
{
  "department": "Cardiologist",
  "name": "dr_john",
  "password": "john@123"
}

In receptionist collection 
{
  "name": "ds",
  "password": "ds@123"
}

 
5.backend>unicorn main:app --reload    

6.frontend>npm install

7.frontend>npm run dev

8.backend>python facecap.py   -----press 'q' to exit     


