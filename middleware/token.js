import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import db from '../db/index.js'

export const hashGenerator  = async (password)=>{
    const hash = await bcrypt.hash(password,10)
    return hash
}

export const hashValidator = async (password,userPassword) =>{
    const result = await bcrypt.compare(password,userPassword)
    return result;
}

export const tokenGenerator = async(UserId,email) =>{
    const token = jwt.sign({UserId,email},
        "mySuperSecretkey123",{
            expiresIn : "3d"}
    )
    return token;
}

export const tokenValidation = async (token) =>{
    try {
        const data = jwt.verify(token,"mySuperSecretkey123")
        return data
    } catch (error) {
            console.log("Validation");
            
    }
}

export const authVerify = async (req,res,next) => {
    const { JWT } = req.cookies;
    const {browser_token} = req.body;
    const  valid = await tokenValidation(JWT);
    
    if(!valid || !browser_token){
        return await res.json({message:"Access Denied"})
    }
    
    if(!valid){
        return res.status(403).json({message: "Invalid Token"})
    }

    const checkQuery = "SELECT * FROM user_session  WHERE browser_token = ?"
    const [session] = await db.promise().query(checkQuery,[browser_token])

    if(session.length === 0){
        return res.status(403).json({message:"Login to continue"})
    }
    next();

}