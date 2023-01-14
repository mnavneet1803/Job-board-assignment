
// this utility will be used to convert raw data from backend to extracted data



const objectConverter = function (data) {
    let userdata = []
    data.forEach(element => {
        userdata.push({
            "jobId": element._id,
            "title": element.title,
            "description": element.description,
            "email": element.email,
            "skills": element.skills,
            "experienceLevel": element.experienceLevel
        })
    });
    if (userdata.length > 0) {
        return userdata
    }
    else return "No data"
}

module.exports = {
    objectConverter: objectConverter
}