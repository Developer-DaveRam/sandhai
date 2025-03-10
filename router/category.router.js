import express from 'express'
import multer  from 'multer';
import { categoryStatus, createCategory, createProduct, deletCategory, deleteProduct, editCategory, editProduct, getAllCategory, getAllProduct, getCatById, getProductByCatId, getProductById, likeCount, productDisLike, productLike, productStatus } from '../controller/productd.details.js';
import { category, upload } from '../middleware/multer.js';

const catRoute = express();

catRoute.post("/add-cat",category.single('image',1),createCategory)


catRoute.get('/getProductByCatId',getProductByCatId)
catRoute.put("/edit-cat",editCategory)
catRoute.delete('/delete-cat',deletCategory)
catRoute.get("/allCategory",getAllCategory)
catRoute.post("/getCatByID",getCatById)
catRoute.post("/create-product",upload.fields([{name:'coverImage' ,maxCount : 1},{name:'otherImage',maxCount :20}]),createProduct)
catRoute.put("/edit-product",editProduct)
catRoute.delete("/delete-product",deleteProduct)
catRoute.get("/getllProduct",getAllProduct)
catRoute.get("/getByProductid",getProductById)
catRoute.post("/statusUpdate",productStatus)
catRoute.post('/catStatus',categoryStatus)


catRoute.post('/productLike',productLike)
catRoute.delete('/deleteLike',productDisLike)
catRoute.get('/likecount',likeCount)

export default catRoute;