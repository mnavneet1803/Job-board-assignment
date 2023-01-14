const { objectConverter } = require("../configs/object.converter")
const Jobs = require("../models/job.model")

//FetchAll function will fetch all the data in the Jobs Model
const fetchAll = async (res, pages, limits) => {
    let data
    try {
        data = await Jobs.find({}).skip((pages - 1) * limits).limit(limits)
        return data
    }
    catch (er) {
        console.er("Error while fetching the users")
        res.status(500).send({ message: "Some internal error occured" })
    }
}


//FetchByTitle will fetch the data with filter on title field
const fetchByTitle = (data, userNameReq) => {
    let result = []
    data.forEach((element) => {
        if (element.title == userNameReq) {
            result.push(element)
        }
    })
    if (result.length === 0) {
        return "No user found"
    }
    else {
        return result
    }
}


//FetchBySkills will fetch the data with skills field
const fetchBySkills = (data, userTypeReq) => {
    let result = []
    data.forEach((element) => {
        if (element.skills == userTypeReq) {
            result.push(element)
        }
    })
    if (result.length === 0) {
        return "No user found"
    }
    else {
        return result
    }
}

//fetchByExperienceLevel will fetch data with experience level filter
const fetchByExperienceLevel = (data, userStatusReq) => {
    let result = []
    data.forEach((element) => {
        if (element.experienceLevel == userStatusReq) {
            result.push(element)
        }
    })
    if (result.length === 0) {
        return "No user found"
    }
    else {
        return result
    }
}

//Findall is a controller for job/find/ Route
exports.findAll = async (req, res) => {
    let data
    let pages = req.query.pages || 1
    let limits = req.query.limits || 5
    try {
        data = await fetchAll(res, pages, limits)
    }
    catch (er) {
        res.status(500).send("Some Internal error occured")
    }
    let jobs
    let userExperienceReq = req.query.experienceLevel
    let userSkillsReq = req.query.skills
    let userTitleReq = req.query.title
    if (userTitleReq && !userSkillsReq && !userExperienceReq) {
        jobs = fetchByTitle(data, userTitleReq)
    }
    else if (!userTitleReq && userSkillsReq && !userExperienceReq) {
        jobs = fetchBySkills(data, userSkillsReq)
    }
    else if (!userTitleReq && !userSkillsReq && userExperienceReq) {
        jobs = fetchByExperienceLevel(data, userExperienceReq)
    }
    else {
        jobs = await fetchAll(data, res)
    }
    res.status(200).send({ pages: pages, total: data.length, limits: limits, "result": objectConverter(jobs) })
}

//findById is a controller for job/find/:id Route
exports.findById = async (req, res) => {
    let data
    try {
        data = await Jobs.find({ _id: req.params.id })

    }
    catch (er) {
        console.er("Error while fetching the users")
        res.status(500).send({ message: "Some internal error occured" })
    }
    res.status(200).send(data[0])
}