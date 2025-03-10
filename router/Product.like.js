import express from 'express'
import { productLike } from '../controller/productd.details.js';

const Product = express()


Product.post('/productLike',productLike)

export default Product;

