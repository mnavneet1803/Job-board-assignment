
const authController =require("../controllers/auth.controller")
const {validation}=require("../middlewares/signup.validations")
module.exports = function authRouter(app) {
    app.post("/auth/signup",[validation],authController.signup)
    app.post("/auth/signin",authController.signin)
}

