const mongoose = require('mongoose')

const searchSchema = new mongoose.Schema({
    companyId: {type:Number, required:true},
    companyName: {type:String, required:true},
    primaryText: {type:String, required:true},
    headline: {type:String, required:true},
    description: {type:String, required:true},
    cta: {type:String, required:true},
    image: {type:String, required:true},
    url: {type:String, required:true}
}) 
 
module.exports = mongoose.model('searches', searchSchema)