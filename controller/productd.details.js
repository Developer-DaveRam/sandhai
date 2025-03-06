import db from '../db/index.js'

export const createCategory = async(req,res) =>{

    
try {
    const {category_name} = req.body;
    const image = req.file.filename;

    

    if(!category_name || !image){
        return res.json("category name is required")
    }

    const query = "INSERT INTO category (category_name,category_image,created_date)  VALUES (?,?,NOW())";
    const addCategory = await db.promise().query(query,[category_name,image])
   
    let result = addCategory[0].affectedRows ? 1 :0

    return res.status(200).json({
        image: image ? `uploads/category/${image}` : null,
        "result" : result,
        message:"The category has added to the Database",
    })
} catch (error) {
    return res.status(400).json({message : error.message})
} }

export const editCategory = async(req,res) =>{

    try {
        const {id,category_name} = req.body;
        if(!category_name) {
            return res.json("Category Name illa")
        }
        if(!id) {
            return res.json("Category id illa")
        }
        const query = "UPDATE category SET category_name = ? , modifyed_date = NOW() WHERE id = ?"
        const updateCate = await db.promise().query(query,[category_name,id])
        let result = updateCate[0].affectedRows ? 1:0
        let dbmessage = result ? "The values has updated" : " The value has not yet updated"
        return res.status(200).json({
            "result" : result,
            message :"The value in the DB has modified",
            dbmessage
        })        
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
 
}

export const deletCategory = async(req,res)=>{
    try {
        const id = req.query.id;
        console.log("ID" ,typeof(id));
        
        if(!id){
            return res.json("id is required")
        }
        
        const checkQuery = "SELECT * FROM category WHERE id = ? "
        // console.log("ID" ,typeof(id));
        const checkCat = await db.promise().query(checkQuery,[id])
        
        if(!checkCat){
            return res.json("Category not foound")
        }

        const query = "UPDATE category SET s_delete = 1 , deleted_date = NOW() WHERE id = ?"
        const deleteCat = await db.promise().query(query,[id])
        let result = deleteCat[0].affectedRows ? 1 : 0;
        let dbmessage  = result ? "The name is deleted" : " The name is not deleted"
        return res.status(200).json({
            "result" : result,
            message :"Operation Sucess",
            "dbmessage" : dbmessage
        })    
    } catch (error) {
        return res.json({message : error.message})
    }
}

export const getAllCategory = async(req,res) =>{
   try {
    let query = "SELECT * FROM category WHERE s_delete = 0"
    const [allCategory] = await db.promise().query(query)
    let result = allCategory.length > 0 ? 1 : 0;
    let dbmessage = result ? "The values has fetched" : " No values has been fetched"
    return res.status(200).send({
        data : allCategory,
        "result" : result,
        "dbmessage" : dbmessage
    })
   } catch (error) {
    console.log(error)
    return res.status(400).json({message : error.message})
   }
} 

export const getCatById = async(req,res) => {
try {
    const id = req.query.id;

    const query = "SELECT * FROM category WHERE id = ?"
    const [value] = await db.promise().query(query,[id])
    
    let result  =  value.length ? 1 : 0;
    let dbmessage  =  result ? "The is found and returned" : "Invalied id"

    return res.status(200).json({
        value,
        "Result" : result,
        "dbMessage" : dbmessage
    })

} catch (error) {
    return res.status(400).json({error : error.message})
}}






export const createProduct = async (req, res) => {
    try {
        const { cat_id, productName, description, price, location } = req.body;
        const files = req.files;

        if (!files || !files.coverImage || !files.otherImage || files.otherImage.length < 4) {
            return res.status(400).json({ error: "Please upload at least 5 images (1 cover + 4 others)" });
        }

        const coverImage = files.coverImage[0].filename;
        const otherImages = files.otherImage.map(file => file.filename);

        if (!cat_id || !productName || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        console.log("Category ID:", cat_id);

        const addProductQuery = "INSERT INTO product_details (cat_id, productname, image, description, created_at, price, location) VALUES (?, ?, ?, ?, NOW(), ?, ?)";
        const [addProduct] = await db.promise().query(addProductQuery, [cat_id, productName, coverImage, description, price, location]);
        

        const product_id = addProduct.insertId;

        const insertImageQuery = `INSERT INTO image (product_id, image_url) VALUES ?`;
        const imageValues = otherImages.map(image => [product_id, image]);

        if (imageValues.length > 0) {
            await db.promise().query(insertImageQuery, [imageValues]);
        }

        console.log("Images stored:", otherImages);

        const result = addProduct.affectedRows ? 1 : 0;
        const dbmessage = result ? "Product added successfully" : "Failed to add product";

        return res.status(200).json({
            result: result,
            dbmessage: dbmessage,
            message: "Values added successfully"
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: error.message });
    }
};


export const editProduct = async(req,res) =>{
try {
    const {id,productName,description} = req.body;
    if(!productName || !description) {
        return res.json("All fileds are required")
    }
    let query = "UPDATE product_details SET productname =? ,description = ? , modified_at = NOW() WHERE id = ?"
    let updateProduct = await db.promise().query(query,[productName,description,id])
    
    const result = updateProduct[0].affectedRows ? 1 : 0;
    const dbmessage = result ? "The value is  updated" : " The value is not updated"
    
    return res.status(200).json({
        "result": result,
        "dbmessage ": dbmessage,
        message :"The function executed"
    })
} catch (error) {
    return res.status(400).json({message : error.message})
}}

export const deleteProduct = async(req,res) =>{
   try {
    const id = req.query.id;
    if(!id){
        return res.json("The id is required for deleting a product")
    }
    const query = "UPDATE product_details SET deleted_at = Now() ,s_delete = 1 WHERE id = ?"
    const deleteProduct = await db.promise().query(query,[id])
    
    const result = deleteProduct[0].affectedRows ? 1:0
    const dbmessage = result ? "The value is deleted" :"The value is not yet deleted"
    return res.status(200).json({
        "result" : result,
        message  : "The delete function has executed",
        "dbmessage" : dbmessage

    })
   } catch (error) {
        return res.status(400).json({error:error.messaage})
   }
}
 

export const  getAllProduct = async(req,res) =>{
    try {
    const query = "SELECT * FROM product_details"
    const [getALL]  = await db.promise().query(query)
    const result = getALL.length ? 1:0;
    const dbmessage = result ? "The values are fetched" : "There is an error in fectching the value"
    return res.status(200).json({
        data : getALL,
        "result" : result,
        "dbmessage" :dbmessage,
        message :"The getAll function has been executed"

        
    })

    } catch (error) {
        return  res.status(400).json({message : error.message})        
     }
 }


 export const getProductById = async(req,res) =>{
try {
    const id = req.query.id;
    if(!id){
        return res.json("The id is required for obtaining a product")
    }
    const query = "SELECT * FROM product_details WHERE  id = ?"
    const [getbyid] = await db.promise().query(query,[id])
    const result = getbyid.length ? 1: 0;
    const dbmessage = result ? "The value is found in the DB" : "The value is not in the DB"
    return res.status(200).json({
        getbyid,
        "result" : result,
        "dbmessage" : dbmessage,
        message:"The getby id has executed"
    })
    
} catch (error) {   
    return res.status(400).json({
        error: error.messaage
    })}
}


export const productStatus = async(req,res)=>{
    try {
        const {status,id} = req.body;
        if( !id) {
            return res.json("The files are required")
        }
        
        const query = 'UPDATE product_details  SET  status  = ? WHERE id = ?'
        const updateState = await db.promise().query(query,[status,id])
        const result = updateState[0].affectedRows ? 1 :0;
        // console.log("result " ,result);
        
        const dbmessage = result ? "The state is changed" : "The State is not chaned"
        return res.status(200).json({
            "result " : result,
            "dbmessage" : dbmessage,
            messaage : "Product Status function has been Executed"
        })
        
    } catch (error) {
        return res.status(400).json({messaage: error.messaage})        
    }
}


export const categoryStatus = async(req,res) =>{
    try {
        
        const {id,status} = req.body;
        console.log(`id and status  ${id} ${status}` );
        if(!id ){
            return res.json("ALl fileds are Reqquired")
        }
        
        
        const query  = "UPDATE category SET status = ? WHERE id = ?"
        const catStatus = await db.promise().query(query,[status,id])
        const result = catStatus[0].affectedRows ? 1 : 0
        const dbmessage = result ? "The value is updated" : " The value is not yet updated"
        return res.status(200).json({
            "dbmessage" : dbmessage,
            "result ": result,
            "id" : id,
            "message" : "The category Status value has been executed"
        })
    } catch (error) {
        return  res.status(400).json({error : error.messaage})        
    }
}