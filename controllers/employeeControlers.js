import Employee from '../models/employeeModel.js'

// Route controller functions

// Helper function for getting one employee by id
async function getOneEmployee(request, response, next) {
    const { id } = request.params
    let employee
    try {
        employee = await Employee.findById(id)
    } catch (error) {
        return response
            .status(500)
            .json({ message: 'Employee not found', error: error.message })
    }
    request.employee = employee
    next()
}

// GET all employees

async function getAllEmployees(request, response) {
    try {
        const employees = await Employee.find()
        response.json(employees)
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

// GET an employee by id
async function getEmployee(request, response) {
    response.status(200).json(request.employee)
}

// POST a new employee
async function createEmployee(request, response) {
    let employee
    if (!request.body) {
        return response.status(400).json({ message: 'Request body is empty' })
    }
    const {
        name,
        age,
        employmentStartDate,
        department,
        isManager,
        monthlySalary,
    } = request.body
    employee = new Employee({
        name,
        age,
        employmentStartDate,
        department,
        isManager,
        monthlySalary,
    })
    try {
        const newEmployee = await employee.save()
        response.status(201).json(newEmployee)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

// PATCH (update) an employee by id
async function updateEmployee(request, response) {
    if (!request.body || Object.keys(request.body).length === 0) {
        return response.status(400).json({ message: 'Request body is empty' })
    }

    const {
        name,
        age,
        employmentStartDate,
        department,
        isManager,
        monthlySalary,
    } = request.body

    // Update only provided fields
    if (name !== undefined) request.employee.name = name
    if (age !== undefined) request.employee.age = age
    if (employmentStartDate !== undefined)
        response.employee.employmentStartDate = employmentStartDate
    if (department !== undefined) request.employee.department = department
    if (isManager !== undefined) request.employee.isManager = isManager
    if (monthlySalary !== undefined)
        request.employee.monthlySalary = monthlySalary

    try {
        const updatedEmployee = await request.employee.save()
        response.json(updatedEmployee)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}
// DELETE an employee by id
async function deleteEmployee(request, response) {
    const { id } = request.params
    try {
        await Employee.findByIdAndDelete(id)
        response.json({ message: 'Employee removed' })
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

export {
    getOneEmployee,
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}
