import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import db from '../db/index.js'
import cookieParser from 'cookie-parser';
// import crypto from 'crypto-random'
import crypto from 'crypto'
import { hashGenerator, hashValidator, tokenGenerator } from '../middleware/token.js';
import { transporter } from '../middleware/nodeMailer.js';


const userLoginExist = async (browser_token) => {
    const query = 'SELECT user_id FROM user_session WHERE browser_token = ?';
    const [existUser] = await db.promise().query(query, [browser_token]);
    return existUser.length > 0 ? existUser[0].user_id : null;
};


const getOrCreateConversation = async (user1_id, user2_id) => {
    try {
        const checkQuery = `SELECT id FROM coversation WHERE (user1_id =?  AND user2_id =? )  OR (user1_id = ? AND user2_id)`
        const [result] = await db.promise().query(checkQuery, [user1_id, user2_id, user2_id, user1_id])

        if (result.length > 0) {
            return result[0].id
        }
        const createQuery = `INSERT INTO coversation (user1_id,user2_id) VALUES (?,?)`
        const [createConversation] = await db.promise().query(createQuery, [user1_id, user2_id])
        return createConversation.insertId;
    } catch (error) {

        throw new Error("DataBase Error" + error.message)
    }
}


export const sendMessage = async (req, res) => {
    try {
        const { sender_id, reciver_id, message } = req.body;

        if (!sender_id || !reciver_id || !message) {
            return res.json("All Fields are required")
        }
        const conversationId = await getOrCreateConversation(user1_id, user2_id)
        const query = `INSERT INTO messages (conversation_id,sender_id,message) VALUES (?,?,?)`
        const [result] = await db.promise().query(query, [conversationId, sender_id, message])

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            conversation_id
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

export const getMessage = async (req, res) => {
    try {
        const { user1_id, user2_id } = req.body;
        const createQuery = `SELECT sender_id , reciver_id ,message FROM messages WHERE conversation_id  =?`
        const [messages] = await db.promise().query(createQuery, [user1_id, user2_id])
        return res.status(200).json({
            sucess: "true",
            messages
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })

    }
}

const getUserByMobile = async (mobile) => {
    const query = 'SELECT id FROM user WHERE mobileNo =?'

    const [user] = await db.promise().query(query, [mobile])
    console.log(user);
    return user.length > 0 ? user[0].id : null;
}


export const register = async (req, res) => {
    try {
        const { name, password, mobileNo, email } = req.body;
        // console.log(`user name ,${userName},password ,${password} , emial ,${email}`);

        console.log(`mobile ${mobileNo}, password ${password}, email ${email}, name ${name}`);
        if (!name || !password || !email) {
            return res.status(200).json({ message: "All files are required" })
        }
        // const hash = await bcrypt.hash(password,10);
        const hash = await hashGenerator(password)
        const data = [
            name,
             hash,
            mobileNo,
            email
        ]
        console.log("data " + hash);

        const query = "INSERT INTO user (name, password, mobileNo, email) VALUES (?, ?, ?, ?)";
        const [result] = await db.promise().query(query, data)

        return res.status(200).json({ message: "The user has been added to the DataBase" })


    } catch (error) {
        console.log(error);
        
        return res.status(404).json({ error: error.message })

    }
    finally {
        // console.log("The finally block for create user has been eceuted");

    }
}


export const login = async (req, res) => {
    try {
        const { mobile, password, browser_token, browser_name } = req.body;
        if (!mobile || !password || !browser_token || !browser_token) {
            return res.status(300).json({ message: "data varla " })
        }


        console.log(`mobile ${mobile}, password ${password}, browser_token ${browser_token}, browsername ${browser_name}`);

        const user_id = await getUserByMobile(mobile)

        console.log(`user id ${user_id}`);


        if (!user_id) {
            return res.json({ message: "user_id is invalid" })
        }
        const query = "SELECT * FROM user WHERE mobileNo = ?"
        const [user] = await db.promise().query(query, [mobile])

        if (user.length === 0) {
            return res.status(404).json("User not found...")
        }

        // const isPassword = await bcrypt.compare(password,user[0].password);

        const isPassword = await hashValidator(password, user[0].password)
        // console.log("isPassord" + isPassword);


        if (!isPassword) {
            return res.status(401).json({ message: "Invalid password " })
        }

        // const token = jwt.sign({
        //     userId : user[0].id,email:user[0].email
        //     },"mySuperSecretKey123", {
        // expiresIn: "3d"})

        const token = await tokenGenerator(user[0].id, user[0].email)
        const expirationDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

        const updateQuery = `
          UPDATE user_login 
          SET reset_token = ?, reset_token_expiry = ? 
          WHERE mobile = ?
        `;


        await db.promise().query(updateQuery, [token, expirationDate, mobile]);
        // console.log("hit");
        const browser_tokenquery = ` INSERT INTO user_session (user_id, browser_token, browser_name)    VALUES (?, ?, ?) `;

        const insert_btoken = await db.promise().query(browser_tokenquery, [user_id, browser_token, browser_name])
        res.cookie("JWT", token)
        return res.status(200).json({ 
             token: `BEARER ${token}`,
             expiration: expirationDate,
            });

    } catch (error) {
        console.log(error);
        console.log("error pa ");
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const changePassword = async (req, res) => {
    const { email, password, newPassword } = req.body;
    console.log(`email :${email} , passwor ${password}  , newPassword :${newPassword}`);

    if (!email || !password || !newPassword) {
        return res.status(404).json({ message: "All fields are required" })
    }

    const query = "SELECT * FROM user WHERE email = ?"
    const [user] = await db.promise().query(query, [email])

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    const isPassword = await hashValidator(password, user[0].password)
    console.log("status" + isPassword);

    if (!isPassword) {
        return res.json("Password is incorrect")
    }
    else {
        const hash = await hashGenerator(newPassword)
        const reset = "UPDATE user_login SET password = ? WHERE email  = ?"
        const insert = await db.promise().query(reset, [hash, email])
        return res.status(200).json({ message: "user password has been added" })
    }
}


export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const query = "SELECT * FROM user WHERE email = ?";
        const [user] = await db.promise().query(query, [email]);

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        const updateQuery = `
          UPDATE user_login 
          SET reset_otp = ?, reset_otp_expiry = ? 
          WHERE email = ?
        `;
        const sendmail = await transporter.sendMail({
            from: {
                name: "daveram",
                address: "dave@123.com"
            },
            to: email,
            subject: `Your OTP for the account Login`,
            text: `The login otp for the account OTP is ${otp}`
        })
        console.log("the mail id is ", email);
        console.log("send Mail", sendmail);



        await db.promise().query(updateQuery, [otp, otpExpiry, email]);
        console.log(`OTP for ${email}: ${otp}`);

        return res.status(200).json({
            message: "OTP sent successfully",
            otp,
            expiresAt: otpExpiry,
        });
    } catch (error) {
        console.error("Error in forgetPassword:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const query = "SELECT * FROM user_login WHERE email = ?";
        const [user] = await db.promise().query(query, [email]);

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const { reset_otp, reset_otp_expiry } = user[0];

        if (!reset_otp || reset_otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (new Date(reset_otp_expiry) < new Date()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        const hash = await hashGenerator(newPassword);

        const updateQuery = `
          UPDATE user_login 
          SET password = ?, reset_otp = NULL, reset_otp_expiry = NULL 
          WHERE email = ?
        `;
        await db.promise().query(updateQuery, [hash, email]);

        return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const editProfile = async (req, res) => {

    try {

        const { id, useName, mobile } = req.body;

        if (!useName, !id, !mobile) {
            return res.json({ message: "All files are required" })
        }

        const query = "UPDATE user_login SET username =?,mobile =? WHERE id  = ?"
        const updateProfile = await db.promise().query(query, [useName, mobile, id])

        res.status(200).json({ message: "Profile has been updated...." })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteProfile = async (req, res) => {

    try {
        const id = req.query.id;
        console.log("id", id);

        const check = "SELECT * FROM user_login WHERE id =? "
        const [user] = await db.promise().query(check, [id])
        if (!user.length === 0) {
            return res.status(404).json({ message: "All fields are required..." })
        }

        const query = "UPDATE user_login SET soft_delete = 1 WHERE id = ?"
        await db.promise().query(query, [id])
        return res.status(200).json({ message: "user has been delted" })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}


export const logout = async (req, res) => {
    try {
        const { browser_token } = req.body;
        const signoutQuery = `DELETE FROM user_session WHERE browser_token = ? `
        const signout = await db.promise().query(signoutQuery, [browser_token])
        return res.status(200).json({ message: "The session has logged out" })
    }
    catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

export const logOutAll = async (req, res) => {
    try {
        const { user_id } = req.body;
        const signOutAllquery = `DELETE FROM user_session WHERE user_id = ?`
        const signOutAll = await db.promise().query(signOutAllquery, [user_id])
        return res.status(200).json({ message: "The user has logged out from All devices" })
    } catch (error) {
        return res.status(400).json({ error: error.message })

    }
}

export const protectedRoute = async (req, res) => {
    res.status(200).json("hello")
}
