import React from 'react'
import SidNav from './SideNav/SidNav'
import Add from './BodyPage/Add'

const AddPage = ({openSignIn}) => {

  return (
    <div className='flex'> 
       
       <div className=' hidden align-middle ml-10 sm:block '>

        <SidNav />
       </div>
        <div className='flex  w-full '>
        <Add />

        </div>
    </div>
  )
}

export default AddPage