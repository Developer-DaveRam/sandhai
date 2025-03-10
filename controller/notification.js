import db from "../db/index.js";

export const createNotification = async(req,res) =>{
    const {sender_id,reciver_id,message} = req.body;
    
    if(!sender_id || ! reciver_id || !message){
        return res.json("All Fields are required")
    }
    
    try {
        const insertQuery = "INSERT INTO notifications (sender_id,reciver_id,message) VALUES (?,?,?)"
        const insertNotification  =  await db.promise().query(insertQuery,[sender_id,reciver_id,message])
        const result  =  insertNotification[0].affectedRows ? 1 :0;
        const dbmessage =  result ? "The notification has added" : "The notification is not added"

        return res.status(200).json({
            message :"the notification has added",
            "result" : result,
            "dbmessage" : dbmessage 
        })
    } catch (error) {
        return res.json({error : error.message})
    } 
}

export const getNotification = async(req,res)=>{
    const reciver_id  = req.query.reciver_id;
    console.log(reciver_id);
    
    if(!reciver_id){
        return res.json("the reciver id is necessary")
    }
    try {
        const notifyQuery = "SELECT * FROM notifications WHERE reciver_id =? ORDER BY created_at DESC"
        const [notify] = await db.promise().query(notifyQuery,[reciver_id])
        // console.log(notify);
        
        const result = notify[0].length === 0 ? 1 :0;
        const dbmessage = result ? "the value is obtained" : "the value is not obtained"
        return res.status(200).json({
            "result" :result,
            "message " : notify,
            "notify" : "The notification has recived",
            "dbmessage ": dbmessage 
        })
    } catch (error) {
        return res.status(400).json({error : error.message})
        
    }

}

export const markAsRead = async(req,res) =>{
    const notification_id = req.query.notification_id;

    if(!notification_id) {
        return res.status(400).json("All fileds are required")
    }
    try {
        const readNotifyQuery = "UPDATE notifications SET is_read =  TRUE  WHERE id = ?"
        const readNotify =  await db.promise().query(readNotifyQuery,[notification_id])
        const result  =  readNotify[0].affectedRows ? 1 : 0
        const dbmessage  = readNotify ? "The value has changed" : " the value is not changed" 
        return res.status(200).json({
            "result": result,
            "dbmessage" : dbmessage,
            // "readNotify  "  : readNotify
        })
    } catch (error) {
        return res.status(400).json({error : error.message})
        
    }
 }