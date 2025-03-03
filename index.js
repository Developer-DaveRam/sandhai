import express  from 'express'
import bcrypt from 'bcrypt'
import router from './router/index.js';
import cookieParser from 'cookie-parser';
import { authVerify } from './middleware/token.js';
import dotenv from 'dotenv'
import catRoute from './router/category.router.js';
import cors from 'cors'
import bodyParser from 'body-parser';
import chatRouter from './router/chatRouter.js';
const app = express()
const port = 8000;

dotenv.config()
// app.use(bodyParser())
app.use('/',express.static('uploads'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use("/",router)
app.use("/category",catRoute)
app.use("/chat",chatRouter)


// console.log('env',process.env.name);



app.listen(port,()=>{
    console.log(`Server is on the post http://localhost:${port}`);
    
})