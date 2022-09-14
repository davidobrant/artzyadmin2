const express = require('express')
const router = express.Router()
const { 
    loginUser, 
    signupUser, 
    updateUser, 
    deleteUser, 
    getUser, 
    getUsers 
} = require('../controllers/userController')


router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/:id', getUser)

router.get('/', getUsers)

router.patch('/:id', updateUser)

router.delete('/:id', deleteUser)


module.exports = router