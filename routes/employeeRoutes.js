import express from 'express'
import {
    getOneEmployee,
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from '../controllers/employeeControlers.js'
const router = express.Router()

// GET all
router.get('/', getAllEmployees)
// GET one
router.get('/:id', getOneEmployee, getEmployee)
// POST
router.post('/', createEmployee)
// PATCH
router.patch('/:id', getOneEmployee, updateEmployee)
// DELETE
router.delete('/:id', deleteEmployee)

export default router
