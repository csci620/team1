#CSCI620-Assignment -5 Testing.

Program by : Jayesh Sathe 
             
------------------------------------------------------------------------------------------------------------------------------------
# Overview
Testing hotel api using  mocha, supertest, chai

# input 
1) npm install  mocha supertest chai --save-dev
2) npm install -g mocha
3) Update package.json 
  "scripts": {
    "test": "mocha"
  },
4) Create test- dir under api- package.
5) Create hotels.test.js under 'test' package.
6) run the command for testing 
- npm test or mocha

# Output 
Runs CRUD requests for hotels api and returns whether test is passing or fails.

#Workflow
- User lands on Dashboard where he can see images of famous places along with review and feedback. 
- On-click on the image user is directed to login. 
- After login user can see famous hotels and there reviews with reserve button at the bottom of each hotel. 
- On-click on reserve button user will be redirected to reserve panel where user will put info regarding his stay, hotel of choice and duration. 
- On-click on Book button, hotel reservation is made and user is redirected to user page where he can see all his future reservations. 
- In usere tab, the user can delete and upate hotel options.
- User can also enjoy blogs of people regarding famous places on youtube by clicking on blog tab.
