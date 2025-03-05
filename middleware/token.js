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
        console.log('26',token);
        
        const data = jwt.verify(token,"mySuperSecretkey123")
        return data
    } catch (error) {
        console.log('31',error)
            console.log("Validation");
            
    }
}

export const authVerify = async (req,res,next) => {
 try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("BEARER ")) {
        return res.status(403).json({ message: "Access Denied: No Token Provided" });
    }
    console.log(authHeader.split(" "))
    const token = authHeader.split(" ")[2]; // ✅ Extract the token correctly
    const browser_token = req.headers["x-browser-token"];

    console.log("Extracted Token:", token);
    console.log("Received Browser Token:", browser_token);

    const  valid = await tokenValidation(token);
    
    if(!valid ){
        return await res.json({message:"Access Denied"})
    }

    if(!browser_token){
        return await res.json({message:"Invalid Browser TOken"})
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
 } catch (error) {
    console.error("Auth Verification Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });    
 }  

}