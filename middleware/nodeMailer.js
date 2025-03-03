import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()


export  const transporter  =  nodemailer.createTransport({
    host :'smtp.gmail.com',
    secure : 'false',
    auth :{
        user : process.env.user,
        pass : process.env.password
    }
})
