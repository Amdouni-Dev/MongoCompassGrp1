const express=require('express')
const { adduser, getAllStudents, updateStudent, deleteUser, getUsersWithAggregation } = require('../controllers/userController')
 const userRoutes=express.Router()
// Ajout =>POST
userRoutes.post('/addUser',adduser)
userRoutes.get('/getStudents',getAllStudents)
userRoutes.put('/updateUser/:userId',updateStudent)
userRoutes.delete('/deleteUSer/:userId',deleteUser)
userRoutes.get('/getUsersAggr',getUsersWithAggregation)
module.exports = userRoutes


























/*const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getUsers);

// Get a specific user by ID
router.get('/users/:id', userController.getUserById);

// Update a user by ID
router.put('/users/:id', userController.updateUser);

// Delete a user by ID
router.delete('/users/:id', userController.deleteUser);
// Get all users with aggregation
router.get('/aggregate/users', userController.getUsersWithAggregation);

module.exports = router;
*/