import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import promoimage1 from '../../assets/promotion/promo-image1.svg'
import { useNavigate } from 'react-router-dom';




const HomePage = () => {
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const navigator  = useNavigate();



    const settings = {
        infinite: true,
        speed: 500,  
        autoplay: true,  
        autoplaySpeed: 2000,  
        arrows: true,  
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };
    

    const fetchCategory = async () => {
        try {
            const response = await axios.get("http://localhost:8000/category/allCategory");
            setCategory(response.data.data);
        } catch (error) {
            console.log("Error fetching categories:", error.message);
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await axios.get("http://localhost:8000/category/getllProduct");
            setProduct(response.data.data);
        } catch (error) {
            console.log("Error fetching products:", error.message);
        }
    };

    const handelViewall = (cat) => {
        console.log("Original category_name:", cat.category_name);
        
        const encodedUri = encodeURIComponent( cat.category_name);
        console.log("Encoded category_name:", encodedUri);
    
        navigator(`/product/${encodedUri}`, { state: { cat_id: cat.id } });       
    };
    

    useEffect(() => {
        fetchCategory();
        fetchProduct();
    }, []);



    return (
        <div className="flex-col   " style={{padding:'20px 150px'}}>

            <div ></div>

            <div>
                <h2 className="text-3xl  font-bold">All Categories</h2>
                <div className="overflow-hidden pt-2">
                    <Slider {...settings}>
                        {category.map((cat) => (
                            <div key={cat.id} className="p-2 ">
                                <div className=" p-4 rounded-2xl overflow-hidden   text-center h-auto shadow-md w-auto ">
                                    {cat.category_image && (
                                        <img
                                            src={`http://localhost:8000/category/${cat.category_image}`}
                                            alt={cat.category_name}
                                            className="w-16 h-16 mx-auto"
                                        />
                                    )}
                                    <p className="mt-2 font-semibold">{cat.category_name}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>


            {/* Promotion Banner */}
            <div className="flex  justify-center items-center  pt-10">
                <div className='flex  rounded-lg shadow-lg w-3/4  bg-green-500 '>
                <div className="text-white p-6 flex flex-col   ">
                    <h2 className="text-4xl font-bold mb-2 ">Promote your Products</h2>
                    <p className="mb-4   w-3/5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia fuga, mollitia
                        voluptatum corrupti laudantium harum temporibus aliquam consequatur vel.
                    </p>
                    <button className="bg-white text-green-500 px-4 py-2 w-40 rounded-3xl flex items-center gap-2 hover:bg-green-600 hover:text-white transition">
                        Post your Ad <FaArrowRight />
                    </button>
                </div>
                <div> 
                    <img className='h-70 ' src={promoimage1} alt="" /></div>
                </div>
            </div>

            {/* Product Listings */}
            <div className="pt-10">
                {category.map((cat) => {
                    const filteredProducts = product.filter((prod) => prod.cat_id === cat.id);

                    if (filteredProducts.length === 0) return null; // Hides empty categories

                    return (
                        <div key={cat.id} className="mb-10">
                            {/* Category Header */}
                            <div className="flex justify-between items-center">
                                <h2 className="text-3xl font-semibold">{cat.category_name}</h2>
                                <button className="text-green-500 flex items-center gap-1 hover:underline" 
                                onClick={()=>handelViewall(cat)}
                                >
                                    View All <FaArrowRight />
                                </button>
                            </div>

                            {/* Product List */}
                            <div className="flex gap-6 overflow-x-auto pt-4">
                                {filteredProducts.slice(0, 4).map((prod) => (
                                    <div key={prod.id} className="border p-4 border-gray-300 rounded-lg text-center shadow-md  bg-white">
                                        {prod.image && (
                                            <img
                                                src={`http://localhost:8000/products/${prod.image}`}
                                                alt={prod.productname}
                                                className="w-full  h-40 object-cover rounded-lg"
                                            />
                                        )}
                                        <p className="mt-2  font-semibold">{prod.productname}</p>
                                        <p className="text-gray-600">₹{prod.price}</p>
                                        <p className="text-sm text-gray-500">{prod.location}</p>
                                        <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md w-full">
                                            Contact
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>



            <div></div>


        </div>
    );
};

export default HomePage;
