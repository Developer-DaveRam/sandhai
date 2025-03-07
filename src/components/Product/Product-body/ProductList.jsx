import React, { useEffect, useState } from "react";
import fav from '../../../assets/product/faviroute.svg'
import hen from '../../../assets/product/hen.svg'
import hen1 from '../../../assets/product/hen1.svg'
import hen2 from '../../../assets/product/hen2.svg'
import hen3 from '../../../assets/product/hen3.svg'
import hen4 from '../../../assets/product/hen4.png'
import hen5 from '../../../assets/product/hen5.svg'
import { useParams } from "react-router-dom";
import axios from "axios";

const products = [
  { id: 1, name: "Chicken", price: 299, location: "Coimbatore", image: hen },
  { id: 2, name: "Chicken", price: 299, location: "Coimbatore", image:  hen2},
  { id: 3, name: "Chicken", price: 299, location: "Coimbatore", image: hen1 },
  { id: 4, name: "Chicken", price: 299, location: "Coimbatore", image: hen3 },
  { id: 5, name: "Chicken", price: 299, location: "Coimbatore", image:hen4  },
  { id: 6, name: "Chicken", price: 299, location: "Coimbatore", image:  hen5},
  { id: 7, name: "Chicken", price: 299, location: "Coimbatore", image: hen1},
  { id: 8, name: "Chicken", price: 299, location: "Coimbatore", image: hen2},
  { id: 9, name: "Chicken", price: 299, location: "Coimbatore", image:  hen4},
  { id: 10, name: "Chicken", price: 299, location: "Coimbatore", image:  hen3},
];

const ProductPage = () => {

  const {cat_id} = useParams();
  const [product,setProduct] = useState([])

 
    const fetchCategoryPage = async() =>{
      try {
        const responce  =  await axios.get(`http://localhost:8000/category/getProductByCatId?id=${cat_id}`)
        console.log(responce);
        
      } catch (error) {
        
      }}
 
      useEffect(()=>{
        fetchCategoryPage()
      },[])


  console.log("category id  ",cat_id);
  

  return (
    <div className="p-10 flex  flex-col   w-full items-center">
      <h2 className="w-full  pl-15  text-center sm:text-left  sm:text-3xl font-bold  mb-6">Selected Categories / Hen</h2>

      {/* Responsive Flexbox */}
      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((prod) => (
          <div key={prod.id} className="border border-gray-300 rounded-lg shadow-md p-4 w-72 bg-white">
            <img src={prod.image} alt={prod.name} className="w-full h-48 object-cover rounded-md" />
            <p className="mt-2 font-semibold text-lg">{prod.name}</p>
            <p className="text-gray-600 font-medium text-lg">₹ {prod.price} /-</p>
            <p className="text-sm text-gray-500">{prod.location}</p>

            <div className="w-full flex gap-4">
            <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md w-3/4">Contact</button>
            <img src={fav} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
