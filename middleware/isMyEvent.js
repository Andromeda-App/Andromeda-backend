const {Event} = require("../models")

const isMyEvent = (req,res,next)=>{
    Event.findByPk(req.params.id).then(foundEvent=>{
        if(!foundEvent){
            return res.status(404).json({msg:"no event found"})
        }
        else if(foundEvent.UserId===req.user.id){
            next()
        } else {
            res.status(403).json({msg:"this isn't your event"})
        }
    })
}
module.exports = isMyEvent