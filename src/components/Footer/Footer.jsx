import React from 'react';
import background from '../../assets/Footer/background.svg';
import facebook from '../../assets/Footer/facebook.svg';
import gamil from '../../assets/Footer/gmail.svg';
import x from '../../assets/Footer/x.svg';
import instragram from '../../assets/Footer/instragram.svg';
import applestore from '../../assets/Footer/applestore.svg';
import googlestore from '../../assets/Footer/googlestore.svg';

const Footer = () => {
  return (
    <div className="text-white p-4 flex justify-between items-center" style={{background :"#217D61"}}>
      <div className="w-1/5">
        <img className="p-12 w-24" src={background} alt="" />
      </div>
      <div className="w-4/5 flex flex-row ">
        <div className="w-2/5 ">
          <h1 className="text-3xl font-bold ">SANDHAI</h1>
          <p className="mt-2 text-xl " >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis maximus lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold">Let's Connect With Us</h3>
            <hr className='flex flex-wrap w-70' />
            <div className="flex space-x-4 mt-2">
              <img className="w-10" src={facebook} alt="" />
              <img className="w-10" src={x} alt="" />
              <img className="w-10" src={instragram} alt="" />
              <img className="w-10" src={gamil} alt="" />
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-evenly">
          <div className="flex justify-evenly">
            <div>
              <h2 className="text-3xl font-semibold">Categories</h2>
              <hr />
              <ul className="list-none text-xl ">
                <li>Hen</li>
                <li>Cow</li>
                <li>Buffalo</li>
                <li>Rice</li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-semibold">Site Maps</h2>
              <hr />
              <ul className="list-none text-xl mt-2">
                <li>Home</li>
                <li>About Us</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-4">
            <img className="w-40" src={applestore} alt="App Store" />
            <img className="w-40" src={googlestore} alt="Google Play" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
