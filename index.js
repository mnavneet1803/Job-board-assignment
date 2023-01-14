const mongoose = require("mongoose");
const express = require("express");
const { DB_URL } = require("./configs/db.config");

const app = express();
app.use(express.json())


mongoose.connect(DB_URL,
    () => { console.log("Connected To MongoDB") },
    err => { console.log("Error :", err.message) })



let authRouter = require('./routes/auth.router')
authRouter(app)
let jobRouter = require('./routes/job.router')
jobRouter(app)
let generalRouter = require("./routes/general.router")
generalRouter(app)
let candidateRouter = require("./routes/candidate.router")
candidateRouter(app)

app.get("/get", (req, res) => {
    res.send("api hiting")
})

app.listen(3000, () => console.log("Job-Board Application Started at Port Number 3000"))