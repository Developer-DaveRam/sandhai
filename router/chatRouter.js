import express from 'express'
import { getMessage, sendMessage } from '../controller/user.logs.js'

const chatRouter  = express()

chatRouter.get("/getMessage",getMessage)
chatRouter.post("/postMessage",sendMessage)

export default chatRouter;