import React from 'react'
import hen from '../../../assets/product/hen.svg'
import cow from '../../../assets/product/cow.svg'


const Add = () => {

    const product = [
        {
            img: hen,
            productName: "Multicolor Sonali Hen",
            price: "₹ 2,500 ",
            location: 'coimvatore',
        },
        {
            img: cow,
            // productName : "Multicolor Sonali Hen",
            price: "₹ 25,000 ",
            location: 'coimvatore',
        },
        {
            img: cow,
            // productName : "Multicolor Sonali Hen",
            price: "₹ 25,000 ",
            location: 'coimvatore',
        },
        {
            img: cow,
            // productName : "Multicolor Sonali Hen",
            price: "₹ 25,000 ",
            location: 'coimvatore',
        },
        {
            img: cow,
            // productName : "Multicolor Sonali Hen",
            price: "₹ 25,000 ",
            location: 'coimvatore',
        },  {
            img: cow,
            // productName : "Multicolor Sonali Hen",
            price: "₹ 25,000 ",
            location: 'coimvatore',
        },
        {
            img: cow,
            // productName : "Multicolor Sonali Hen",
            price: "₹ 25,000 ",
            location: 'coimvatore',
        },
        {
            img: cow,
            // productName : "Multicolor Sonali Hen",
            price: "₹ 25,000 ",
            location: 'coimvatore',
        }
    ]





    return (
        <div className='w-full float-end flex-wrap md:h-96' style={{ background: '#F8F8F8', height: '100%' }}>
            <div className='m-4'>

                <h2>My Ads for Selling Product is starts from June</h2>

                <div className='sm:flex justify-between items-center' >
                    <div className='  text-1xl sm:text-2xl p-3 flex gap-4'>

                        <button className='p-2 w-50  bg-green-700'>Present Ads</button>
                        <button className='p-2 w-50 text-green-700  border-2  border-green-700'>Expired Ads</button>

                    </div>
                    <div className='flex invisible sm:visible  items-center gap-3 mt-0'>
                        <p >viewBy :  </p>
                        <div className="flex items-center gap-2">
                            <img className="flex items-center gap-1" src={list} alt="" />
                            <img className='w-2 h-15 ' src={grid} alt="" />
                            <img className="flex items-center gap-1" src={line} alt="" />
                        </div>
                    </div>
                </div>


                <div className="flex flex-wrap justify-center md:justify-evenly gap-6">
                    {product.map((item, index) => (
                        <div key={index} className="p-3 bg-white shadow-md rounded-lg 
            basis-1/3 md:basis-1/4 lg:basis-1/5 flex-grow max-w-xs">
                            {item.img && (
                                <img
                                    src={item.img}
                                    alt={item.productName || "Product Image"}
                                    className="w-32 h-32 object-cover mx-auto"
                                />
                            )}
                            <h3 className="text-lg font-semibold mt-2">{item.productName || "No Name Available"}</h3>
                            <p className="text-gray-700">{item.price}</p>
                            <p className="text-gray-500">{item.location}</p>
                        </div>
                    ))}
                </div>






            </div>


        </div>
    )
}

export default Add