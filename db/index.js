import mysql, { createConnection } from 'mysql2'

const db = createConnection({
    user:'root',
    password :"",
    host:"localhost",
    database:"sandhai_app"
})

db.connect((error)=>{
    try {
        if(error){
            console.log("the db is not yet connected ");
            
        }
    } catch  {
        console.log("the data base has been connected....");
        
    }

})


export default db;