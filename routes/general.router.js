const generalController = require("../controllers/general.controller")
const { verifyToken } = require("../middlewares/verifytoken")

module.exports = function jobRouter(app) {
    console.log("Job router api is ready to hit!")
    app.get("/job/find", [verifyToken], generalController.findAll)
    app.get("/job/find/:id", [verifyToken], generalController.findById)
}