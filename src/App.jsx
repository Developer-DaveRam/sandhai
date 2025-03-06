import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Signup from "./components/Pages/Signup/Signup";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Product/Nav/Navbar";
import Login from "./components/Pages/Login/Login";
import AddPage from "./components/Add-Page/AddPage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("token"); // Check if a token exists
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

const LoginRoute = () => {
  const isAuthenticated = localStorage.getItem("token"); // Check if a token exists
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

function App() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [closeLogin, setCloseLogin] = useState(false);

  // console.log('23 closeLogin',closeLogin);
  // console.log('24 openSignIn',openSignIn);
  
  return (
    <>
      <Header openLogin={() => setCloseLogin(true)} />
      {/* <AddPage openSignIn={openSignIn} /> */}

      {openSignIn && (
        <div className="overlay">
          <div className="signin-modal">
            <Signup closeSignIn={() => setOpenSignIn(false)} openLogin={()=>{
               setCloseLogin(true)
               setOpenSignIn(false)
            }} />
          </div>
        </div>
      )}

      {closeLogin && (
        <div className="overlay">
          <div className="signin-modal">
            <Login closeLogin={() => setCloseLogin(false)} openSignUp={()=>{
              setCloseLogin(false)
              setOpenSignIn(true)
            }} />
          </div>
        </div>
      )}

      <Routes>
          <Route path="/homePage" element={<HomePage  />} />
       <Route element={<LoginRoute />}>
          </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/add-page" element={<AddPage openSignIn={openSignIn} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
