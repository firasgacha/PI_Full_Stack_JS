var {Feedback}=require("../models/feedback");


exports.getfeedbacksjson=async function (request, result) {
    Feedback.find(function (error,d_feedback){
        if(error)
            throw error;
        result.json(d_feedback)
    });
}
exports.getfeedbacks=async function (request, result) {
    Feedback.find(function (error,d_feedback){
        if(error)
            throw error;
        result.render("",{d_feedback});
    });
}