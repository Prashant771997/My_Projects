//import express
import express from 'express'
import usersRoutes from "./routes/users.js"
//import body-parser
import bodyParser from 'body-parser';
//initialize our app
const app = express();
//declare the port
const PORT = 5000;
//this means we will use json in our project
app.use(bodyParser.json());
app.use('/users', usersRoutes)
//Get your first route
app.get("/", (req, res) => {console.log(res.send("hello from homepage"));
});
//listen on port
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
