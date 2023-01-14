const candidateController = require("../controllers/candidate.controller")
const { verifyToken, isCandidate } = require("../middlewares/verifytoken")

module.exports = function candidateRouter(app) {
    console.log("candidate router api is ready to hit!")
    app.post("/job/apply/:id", [verifyToken, isCandidate], candidateController.apply)
    app.put("/application/update/:id", [verifyToken, isCandidate], candidateController.updateApplication)
    app.delete("/application/delete/:id", [verifyToken, isCandidate], candidateController.deleteApplication)
}