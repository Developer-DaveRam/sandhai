import express from 'express'
import { changePassword, deleteProfile, editProfile, forgetPassword, login, logout, logOutAll, protectedRoute, register, resetPassword } from '../controller/user.logs.js'
import { authVerify } from '../middleware/token.js'
import { avathar } from '../middleware/multer.js'

const router = express()

router.post("/create-user",register)
router.post('/login',login)
router.put('/reset-pwd',changePassword)

router.get('/protected', authVerify ,protectedRoute)

router.post('/forget-password',forgetPassword)
router.post("/otp",resetPassword)


router.put("/edit-profile",avathar.single('avathar',1),editProfile)


router.delete("/delete-Profile",deleteProfile)
router.delete("/logout",logout)
router.delete("/logoutAll",logOutAll)


export default router;