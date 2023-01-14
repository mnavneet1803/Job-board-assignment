const jobController = require("../controllers/job.controller")
const { verifyToken, isRecruiter } = require("../middlewares/verifytoken")

module.exports = function jobRouter(app) {
    console.log("Job router api is ready to hit!")
    app.post("/job/create", [verifyToken, isRecruiter], jobController.createJobs)
    app.put("/job/update/:id", [verifyToken, isRecruiter], jobController.updateJobs)
    app.delete("/job/delete/:id", [verifyToken, isRecruiter], jobController.deleteJobs)
    app.get("/job/getApplication/:id", [verifyToken, isRecruiter], jobController.getApplication)
}
