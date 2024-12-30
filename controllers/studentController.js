const Student = require('../models/Student')
const student=require('../models/Student')
exports.addStudent=async(req,res) => {

    try {
        const newStudent=new Student(req.body)
        const savedStudent = await newStudent.save()
        res.status(200).json(savedStudent)


    } catch (error) {
        res.status(500).json({err: error.message})
    }
}