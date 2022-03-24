var {Rate}=require("../models/rate");


exports.getratingsjson=async function (request, result) {
    Rate.find(function (error,d_rate){
        if(error)
            throw error;
        result.json(d_rate)
    });
}
exports.getratings=async function (request, result) {
    Rate.find(function (error,d_rate){
        if(error)
            throw error;
        result.render("",{d_rate});
    });
}