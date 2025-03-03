import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Signup from './components/Pages/Signup/Signup'
import Footer from './components/Footer/Footer'
import Navbar from './components/Product/Nav/Navbar'
import Login from './components/Pages/Login/Login'
import Add from './components/Add-Page/BodyPage/Add'
import SidNav from './components/Add-Page/SideNav/SidNav'
import AddPage from './components/Add-Page/AddPage'
import { Route, Routes } from 'react-router-dom'



function App() {
  const [showSignIn, setShowSignIn] = useState(false);




  return (
    <>



    {/* <Header /> */}
      {/* <Navbar /> */}
       {/* <Signup /> */}
      {/* <Footer /> */}
      
      <Header  openSignIn={() => setShowSignIn(true)} />
     <AddPage openSignIn={() => setShowSignIn(true)} />
   

      {showSignIn && (
          <div className="overlay">
            <div className="signin-modal">
              <Signup closeSignIn={() => setShowSignIn(false)} />{" "}
            </div>
          </div>
        )}



        <Routes>
          <Route path='/Login' element ={<Login />} />
          <Route path='/signup' element ={<Signup />} />
        </Routes>
    </>
  )
}

export default App
