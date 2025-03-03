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
  const [showLogin, setShowLogin] = useState(false);

  const openSignIn = () => {
    setShowSignIn(true);
    setShowLogin(false);
  };

  const openLogin = () => {
    setShowLogin(true);
    setShowSignIn(false);
  };

  return (
    <>



      {/* <Header /> */}
      {/* <Navbar /> */}
      {/* <Signup /> */}
      {/* <Footer /> */}

      <Header openSignIn = {openSignIn}
              openLogin = {openLogin}

      />
      <AddPage openSignIn={openSignIn} />


      {showSignIn && (
        <div className="overlay">
          <div className="signin-modal">
            <Signup closeSignIn={() =>{
            setShowSignIn(false)
               } }/>{" "}
          </div>
        </div>
      )}

      {showLogin && (
        <div className="overlay">
          <div className="signin-modal">
            <Login closeLogin={() => {setShowLogin(false)
              }
            } />{" "}
          </div>
        </div>
      )}

      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
