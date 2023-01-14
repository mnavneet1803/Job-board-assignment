// this utility will be used to convert cover letter from markeddown formet to html


const convertToHTML = require("markdown-to-html-converter");
const markdown_converter = function (data) {
    let userdata = []
    data.forEach(element => {
        let markdstr = element.coverletter
        let htmlstr = convertToHTML.convertToHTML(markdstr)
        userdata.push({
            "application id": element._id,
            "email": element.email,
            "resume": element.resume,
            "coverletter": htmlstr



        })
    });
    if (userdata.length > 0) {
        return userdata
    }
    else return "No data"
}

module.exports = {
    markdown_converter: markdown_converter
}