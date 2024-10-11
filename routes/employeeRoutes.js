import express from 'express'
import {
    getOneEmployee,
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from '../controllers/employeeControlers.js'
import 'dotenv/config'
import authenticateUser from '../authentication/authenticate.js'
const router = express.Router()

// GET all
router.get('/', getAllEmployees)
// GET one
router.get('/:id', getOneEmployee, getEmployee)
// POST
router.post('/', authenticateUser, createEmployee)
// PATCH
router.patch('/:id', authenticateUser, getOneEmployee, updateEmployee)
// DELETE
router.delete('/:id', authenticateUser, deleteEmployee)

export default router
