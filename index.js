require("dotenv").config();
const cors = require('cors');
const express = require("express");
const app = express();
const port = process.env.APP_PORT;


const userRouter = require("./api/user/user.router");

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(express.json());
app.use(cors(corsOptions))


app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/api/user" , userRouter);




app.listen(port, () => {
	console.log(`Server runnning on port ${port}`);
});
