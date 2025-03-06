    import axios from 'axios';
    import React, { useEffect, useState } from 'react'
    import { FaArrowRight } from "react-icons/fa6";


    const HomePage = () => {

        const [category, setCategory] = useState([])
        const [product,setProduct] = useState([])


        const handelCategory = async () => {
            try {
                const data = await axios.get("http://localhost:8000/category/allCategory")
                // console.log(data);
                setCategory(data.data.data)
            } catch (error) {
                console.log(error.message);
            }
        }

        const handelProduct = async () => {
            try {
              const responce = await axios.get("http://localhost:8000/category/getllProduct");
              setProduct(responce.data); 
            //   console.log("Products:", JSON.stringify(val.data));
            //   console.log(product`product`);
              
            } catch (error) {
              console.log("Error fetching products:", error.message);
            }
          };
    

        // console.log(`products `, JSON.stringify(product));

        useEffect(() => {
            handelCategory()
            handelProduct()
        }, [])





        return (
            <div className='p-10'>


                <div className=' '>
                    <h2 className='text-3xl  font-bold'>All Categories</h2>
                    <div className='flex justify-between pt-6 '>


                        {category.map((item) => (
                            <div className='border-1  p-2  h-45 border-gray-700  rounded-2xl text-center' style={{background:"e4e9e4"}} key={item.id}>
                                {item.category_image && <img src={`http://localhost:8000/category/${item.category_image}`} alt={item.category_name} />}
                                <p>{item.category_name} </p>
                            </div>
                        ))}
                    </div>               
                </div>


            <div className="flex justify-center items-center pt-10">

            <div className="text-white bg-green-500 p-6 flex flex-col items-center text-center rounded-lg shadow-lg w-3/4">
            <div className='p-6 float-end'>
            <h2 className="text-4xl font-bold text-left  mb-2">Promote your Products</h2>
            <p className="mb-4 flex text-left flex-wrap w-3/5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.iis tenetur quisquam. Quia fuga, mollitia voluptatum corrupti laudantium harum temporibus aliquam consequatur vel. Sunt, nihil!
            </p>
            <button className="bg-white   float-left  text-green-500 px-4 py-2 rounded-3xl hover:bg-green-600 hover:text-white transition">
                Post your Ad<FaArrowRight />

            </button>

            </div>
            
            </div>
        </div>

            
            <div>
                {category.map((cat) =>(
                    <div key={cat.id}>
                        <h2 className='text-3xl'>{cat.category_name}</h2>

                        

                    </div>
                ))}
            </div>

            </div>
        )
    }

    export default HomePage