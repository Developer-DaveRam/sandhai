import express from 'express'
import { getMessage, sendMessage } from '../controller/user.logs.js'
import { createNotification, getNotification, markAsRead } from '../controller/notification.js'

const chatRouter  = express()

chatRouter.get("/getMessage",getMessage)
chatRouter.post("/postMessage",sendMessage)

chatRouter.post("/createNotification",createNotification)
chatRouter.get("/getNotification",getNotification)
chatRouter.put("/readNotification" ,markAsRead)

export default chatRouter;