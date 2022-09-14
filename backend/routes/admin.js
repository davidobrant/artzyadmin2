const express = require('express')
const router = express.Router()
const adminAuth = require('../middleware/adminAuth')
const { loginAdmin, createAdmin, updateAdmin, deleteAdmin, getAdmin, getAdmins } = require('../controllers/adminController')

router.post('/login', loginAdmin)

router.post('/create', createAdmin)

// router.post('/forgotten/:id', forgottenPassword) ???

// PROTECTED
router.use(adminAuth)

router.get('/', getAdmin)

router.get('/all', getAdmins)

router.patch('/:id', updateAdmin)

router.delete('/:id', deleteAdmin)


module.exports = router