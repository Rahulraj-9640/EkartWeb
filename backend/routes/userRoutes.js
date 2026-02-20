import express from 'express'
import { register, verify, reVerify, login, logout, forgetPassword, verifyOTP, changePassword, allUser, getUserById } from '../controllers/userController.js'
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js'
import { singleUpload } from '../middleware/multer.js'
import { updateUser } from '../controllers/userController.js'


const router = express.Router()

router.post('/register', register)
router.post('/verify', verify)
router.post('/reverify', reVerify)
router.post('/login', login)
router.post('/logout',isAuthenticated, logout)
router.post('/forget-password', forgetPassword)
router.post('/verify-otp/:email', verifyOTP)
router.post('/change-password/:email', changePassword)
router.get('/all-user', isAuthenticated, isAdmin, allUser)
router.get('/get-user/:userId', getUserById)
router.put('/update/:id', isAuthenticated, singleUpload, updateUser)

export default router