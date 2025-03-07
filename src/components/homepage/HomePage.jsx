import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';

const HomePage = () => {
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);

    const handelCategory = async () => {
        try {
            const response = await axios.get("http://localhost:8000/category/allCategory");
            setCategory(response.data.data);
        } catch (error) {
            console.log("Error fetching categories:", error.message);
        }
    };

    const handelProduct = async () => {
        try {
            const response = await axios.get("http://localhost:8000/category/getllProduct");
            setProduct(response.data.data); // Ensure `data.data` is used if products are inside `data`
        } catch (error) {
            console.log("Error fetching products:", error.message);
        }
    };

    useEffect(() => {
        handelCategory();
        handelProduct();
    }, []);

    return (
        <div className="p-40 relative bottom-40">

            <div>
                <h2 className="text-3xl font-bold">All Categories</h2>
                <div className="flex justify-between pt-6">
                    {category.map((cat) => (
                        <div
                            className="border p-4 border-gray-700 rounded-2xl text-center shadow-md w-35"
                            style={{ background: "#e4e9e4" }}
                            key={cat.id}
                        >
                            {cat.category_image && (
                                <img
                                    src={`http://localhost:8000/category/${cat.category_image}`}
                                    alt={cat.category_name}
                                    className="w-20 h-20 mx-auto"
                                />
                            )}
                            <p className="mt-2 font-semibold">{cat.category_name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center pt-10">
                <div className="text-white bg-green-500 p-6 flex flex-col items-center text-center rounded-lg shadow-lg w-3/4">
                    <div className="p-6 text-left w-full">
                        <h2 className="text-4xl font-bold mb-2">Promote your Products</h2>
                        <p className="mb-4 w-3/5">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia fuga, mollitia
                            voluptatum corrupti laudantium harum temporibus aliquam consequatur vel.
                        </p>
                        <button className="bg-white text-green-500 px-4 py-2 rounded-3xl flex items-center gap-2 hover:bg-green-600 hover:text-white transition">
                            Post your Ad <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-10">
                {category.map((cat) => (
                    <div key={cat.id} className="mb-10">
                        <h2 className="text-3xl font-semibold mb-4">{cat.category_name}</h2>

                        <div className="flex flex-wrap gap-6">
                            {product
                                .filter((prod) => prod.cat_id === cat.id)
                                .map((prod) => (
                                    <div
                                        key={prod.id}
                                        className="border p-5 border-gray-700 rounded-2xl text-center bg-gray-200 shadow-md w-60"
                                    >
                                        {prod.image && (
                                            <img
                                                src={`http://localhost:8000/products/${prod.image}`}
                                                alt={prod.productname}
                                                className="w-20 h-20 mx-auto"
                                            />
                                        )}
                                        <p className="mt-2 font-semibold">{prod.productname}</p>
                                        <p className="text-gray-600">₹{prod.price}</p>
                                        <p>{prod.location}</p>
                                    </div>
                                ))}
                        </div>


                        {product.filter((prod) => prod.cat_id === cat.id).length === 0 && (
                            <p className="text-gray-500">No products available in this category.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
