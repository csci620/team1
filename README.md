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