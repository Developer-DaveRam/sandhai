import React, { useEffect, useState } from "react";
import fav from '../../../assets/product/faviroute.svg'
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";



const ProductPage = () => {
  const { category_name } = useParams();
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const cat_id  = location.state?.cat_id;
  const decodedCategoryName = decodeURIComponent(category_name);

  const fetchCategoryPage = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/category/getProductByCatId?id=${cat_id}`);
      setProduct(response.data.getbyid);
    } catch (error) {
      console.error({ error: error.message });
    }
  };

  useEffect(() => {
    fetchCategoryPage();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 py-4 sm:py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center lg:text-left">
          Selected Categories / Hen
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {product.map((prod) => (
            <div key={prod.id} className="flex flex-col border  border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <img 
                  src={`http://localhost:8000/products/${prod.image}`} 
                  alt={prod.name} 
                  className="w-full h-full object-cover z-0"
                  loading="lazy"
                />

                {/* <img src={prod} alt="" /> */}
              </div>
              
              <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <p className="text-sm sm:text-base font-semibold mb-1">{prod.productname}</p>
                <p className="text-gray-600 font-medium text-sm sm:text-base">₹ {prod.price} /-</p>
                <p className="text-xs sm:text-sm text-gray-500 mb-3">{prod.location}</p>

                <div className="mt-auto flex items-center justify-between gap-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-colors flex-grow">
                    Contact
                  </button>
                  <img 
                    src={fav} 
                    alt="Favorite" 
                    className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:opacity-80 transition-opacity" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;