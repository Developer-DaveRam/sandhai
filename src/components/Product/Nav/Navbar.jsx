import React from 'react'
import grid from '../Nav/grid.svg'
import list from '../Nav/list.svg'
import line from '../Nav/line.svg'

const Navbar = () => {
  return (
    <div className='flex text-gray-600 m-10 text-2xl'>
        <div className="NavbarCategory gap-10  w-3/4 flex  ">
            <select className='text-black'>
                <option>All Categories</option>
                <option>Cow</option>
                <option>Milkproduct</option>
            </select>
            <ul className='flex gap-10 '>
                <li>Hens</li>
                <li>Cows</li>
                <li>MilkProducts</li>
                <li>Hen Feeds</li>
                <li>Cow Feeds</li>
            </ul>
        </div>

        <div className="filterAndGrid  w-1/4 justify-evenly flex">

        <button className='text-black h-10 w-24 rounded-sm border border-gray-700 px-4'>
          Filters
        </button>
                 <div className='flex gap-2.5'>
                <p className='text-sm text-black '>viewBy :  </p>    
                <div className='flex h-5 text-sm text-black gap-3.5'>
                    <p><img src={list} alt="" /> Grid</p>
                    <img className='h-10 ' src={line} alt="" />
                    <p><img src={grid} alt="" />List</p>
                </div>            
                </div>
        </div>
    </div>
  )
}

export default Navbar