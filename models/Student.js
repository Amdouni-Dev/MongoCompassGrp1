const mongoose=require('mongoose')
const validator=require('validator')
const studentSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Name is required'],
        trim:true
    },
    age:{
        type:Number,
        required:[true,'age is required'],
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        validate: [ validator.isEmail,'Invalid email address ']
    }

},
{timestamps:true}
)
module.exports=mongoose.model('Student',studentSchema)