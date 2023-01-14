const { default: mongoose } = require("mongoose")
const Application = require("../models/application.model")
const Jobs = require("../models/job.model")
const User = require("../models/user.model")
exports.apply = async (req, res) => {
    const applications = {
        name: req.body.name,
        resume: req.body.resume,
        coverletter: req.body.coverletter,
        email: req.email,
        jobId: req.params.id
    }

    try {
        const data = await User.find({ email: req.email })
        //ch variableholds the index of our job in appliedjobs array
        let ch
        ch = data[0].appliedJobs.indexOf(req.params.id)
        if (ch != -1) {
            res.status(400).send({ message: "You have already applied for this job" })
            return
        }
        else {
            //result variable holds the data received while creating a document in database
            let result = await Application.create(applications)
            //setid variable holds the data received while fetching Job
            let setid = await Jobs.findOne({ _id: req.params.id })
            await setid.applications.push(result._id)
            setid.save()
            let user_appliedjob = await User.findOne({ email: req.email })
            await user_appliedjob.appliedJobs.push(req.params.id)
            await user_appliedjob.applications.push(result._id)
            user_appliedjob.save()
            res.send({ message: `applied for job successfully for ${req.params.id}` })
        }

    } catch (error) {
        res.send({ message: error.message })
    }

}
exports.updateApplication = async (req, res) => {
    const body = req.body;

    try {
        const email = await Application.find({ _id: req.params.id })
        if (email[0].email != req.email) {
            res.status(400).send("Not Authorised")
        }
        else {
            const data = await Application.findOneAndUpdate({ _id: req.params.id }, { name: body.name, resume: body.resume, coverletter: body.coverletter })
            res.status(200).send("Updated Successfully")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "some internal error"
        })
    }
}


exports.deleteApplication = async (req, res) => {
    const body = req.body;
    try {
        const email = await Application.find({ _id: req.params.id })
        if (email[0].email != req.email) {
            res.status(400).send("Not Authrised")
        }
        else {
            const data = await Application.find({ _id: req.params.id })
            await Application.findOneAndDelete({ _id: req.params.id })
            let setid = await Jobs.findOne({ _id: data[0].jobId })
            let getid = await User.findOne({ email: req.email })
            let ch = -1
            for (let i = 0; i < setid.applications.length; i++) {
                if (String(setid.applications[i]) == String(data[0]._id)) {
                    ch = i
                    break
                }
            }
            let arr = []
            let id = String(setid.applications[ch])
            setid.applications.forEach((el) => {
                if (String(el) != id) {
                    arr.push(String(el))
                }
            })
            const ne = await Jobs.findOneAndUpdate({ _id: String(setid._id) }, { applications: arr })
            let jid = String(data[0].jobId)
            let aid = String(data[0]._id)
            let ar2 = []
            getid.appliedJobs.forEach(et => {
                if (et != jid) {
                    ar2.push(String(et))
                }
            })
            let ar3 = []
            getid.applications.forEach(et => {
                if (String(et) != aid) {
                    ar3.push(String(et))
                }
            })
            const udata = await User.findOneAndUpdate({ email: req.email }, { appliedJobs: ar2, applications: ar3 })
            res.status(200).send("Deleted Successfully")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "some internal error"
        })
    }
}