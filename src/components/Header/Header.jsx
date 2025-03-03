import React from 'react';
import bell from '../../assets/bell.png';
import cart from '../../assets/cart.png';

const Header = ({openSignIn}) => {

    return (
        <div className="bg-green-700 flex flex-wrap items-center justify-between h-24 w-full px-4 md:px-8 "style={{position:"sticky",top:"0",zIndex:"100"}}>

            <h3 className="text-white text-xl font-semibold">Logo</h3>

            <div className='flex flex-col sm:flex-row items-center gap-2'>
                <select className="bg-blue-100 text-center h-8 w-28 rounded-md">
                    <option>Coimbatore</option>
                    <option>Salem</option>
                    <option>Kerala</option>
                </select>
                <input
                    className="w-30 sm:w-60 md:w-96 h-8 bg-blue-100 border-none rounded-md px-2"
                    placeholder="Search..."
                />
            </div>

            <button className="bg-red-800 text-white h-8 sm:w-20 md:w-24 rounded-md">
                Sell Now !
            </button>

            <div className="flex items-center gap-x-4 justify-center sm:justify-end">
                <img className="w-5 h-5" src={bell} alt="bell" />
                <span className="text-white"> <button onClick={openSignIn}>Login</button></span>
                <img className="w-5 h-5" src={cart} alt="cart" />
            </div>
        </div>
    );
}

export default Header;
