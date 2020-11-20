# task-manager

Node.js backend app for task manager. Based on <a href="https://www.mongodb.com/">MongoDB</a> atlas database. Secure user authentication with JWT tokens. Driven by <a href="http://expressjs.com/">Express.js</a>. Deployed on heroku: <a href="https://auron-task-manager.herokuapp.com/users">Get all Users</a>

Used frameworks:<br>
<a href="http://expressjs.com/">Express.js</a> - http server <br>
<a href="https://www.npmjs.com/package/nodemon">Nodemon</a> - restart Node.js application after saving file <br>
<a href="https://www.npmjs.com/package/mongodb">Mongodb</a> - MongoDB driver for Node.js <br>
<a href="https://mongoosejs.com/">Mongoose</a> - object modeling for asynchronous environment<br>
<a href="https://www.npmjs.com/package/validator">Validator.js</a> - validate email and password <br>
<a href="https://www.npmjs.com/package/multer">Multer</a> - handling files from user upload <br>
<a href="https://www.npmjs.com/package/sharp">Sharp #</a> - optimise images size and format <br>
<a href="https://sendgrid.com/">Sendgrid</a> - @sendgrid/mail sending e-mail service. <br>
<a href="https://www.npmjs.com/package/env-cmd">Env-cmd </a>- mamaging .env files <br>
<a href="https://jestjs.io/">Jest</a> - JavaScript automated testing framework <br>
<a href="https://www.npmjs.com/package/supertest">Supertest</a> - automated testing express endpoints <br>

REST API with 16 endpoints:<br>
<strong>POST:</strong><br>
/users - create user <br>
/users/login - login user<br>
/users/logout - logout user<br>
/users/logoutAll - logout on all devices<br>
/users/me/avatar - add profile photo<br>
/tasks - create task<br>

<strong>GET:</strong>
/users - read all users<br>
/users/me - read loged profile<br>
/users/:id - read user by id<br>
/tasks - read user tasks<br>
/tasks/:id - read task by id<br>

<strong>PATCH</strong>
/users/me - update profile<br>
/tasks/:id - update task<br>

<strong>DELETE</strong>
/users/me - delete profile<br>
/tasks/:id - delete task<br>
/users/me/avatar - delete avatar<br>

Setup this values for deploy:<br>
PORT=3000<br>
SENDGRID_API_KEY=<br>
MONGODB_URL=<br>
JWT_SECRET=<br>
