import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    employmentStartDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    department: {
        type: String,
        required: true,
    },
    isManager: {
        type: Boolean,
        required: true,
    },
    monthlySalary: {
        type: Number,
        required: true,
    },
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
