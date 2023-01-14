const User = require("../models/user.model")
const Jobs = require("../models/job.model")
const Application = require("../models/application.model")
const { markdown_converter } = require("../configs/markdown")

//createJobs is a callback for /job/create Route
exports.createJobs = async (req, res) => {
    const jobObject = {
        title: req.body.title,
        description: req.body.description,
        email: req.body.email,
        skills: req.body.skills,
        experienceLevel: req.body.experienceLevel,
    }
    try {
        let da
        da = await Jobs.create(jobObject)
        let setid = await User.findOne({ email: req.body.email })
        await setid.postedJobs.push(da._id)
        setid.save()
        res.status(200).send({ "message:": "Data stored" })

    } catch (error) {
        console.log("Some error happened while creating ticket", error.message)
        res.status(500).send({
            message: 'Some internal server error'
        })
    }
}

//updateJobs is a callback for /job/update/:id Route
exports.updateJobs = async (req, res) => {
    const body = req.body;
    try {
        const email = await Jobs.find({ _id: req.params.id })
        if (email[0].email != req.email) {
            res.status(400).send("Not Authrised")
        }
        else {
            const data = await Jobs.findOneAndUpdate({ _id: req.params.id }, { title: body.title, description: body.description, skills: body.skills, experienceLevel: body.experienceLevel })
            res.status(200).send("Updated Successfully")
        }


    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "some internal error"
        })
    }
}

//deleteJobs is a callback for /job/delete/:id Route
exports.deleteJobs = async (req, res) => {
    const body = req.body;
    try {
        const email = await Jobs.find({ _id: req.params.id })
        if (email[0].email != req.email) {
            res.status(400).send("Not Authrised")
        }
        else {
            const data = await Jobs.findOneAndDelete({ _id: req.params.id })
            res.status(200).send("Deleted Successfully")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "some internal error"
        })
    }
}


//getApplication is a callback for /job/getApplication/:id Route
exports.getApplication = async (req, res) => {
    const job = await Jobs.find({
        _id: req.params.id
    })
    let pages = req.query.pages || 1
    let limits = req.query.limits || 5
    const application = await Application.find({ _id: job[0].applications }).skip((pages - 1) * limits).limit(limits)
    res.send({ pages: pages, total: application.length, limits: limits, result: markdown_converter(application) })
}

