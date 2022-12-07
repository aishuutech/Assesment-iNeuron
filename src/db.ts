import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String
    },
    emailId : {
        required : true,
        type : String
    },
    dob : {
        required : true,
        type : String
    }
})

module.exports = mongoose.model('Data',userSchema)