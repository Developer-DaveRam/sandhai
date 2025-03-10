import { useState } from "react";
import "./App.css";
import Signup from "./components/Pages/Signup/Signup";
import Footer from "./components/Footer/Footer";
import Login from "./components/Pages/Login/Login";
import AddPage from "./components/Add-Page/AddPage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import Navbar from "./components/Header/Navbar";
import SearchBar from "./components/Header/SearchBar";
import ProductPage from "./components/Product/Product-body/ProductList";
import PageNotFound from "./PageNotFound";
import EditProfile from "./components/SideNav-pages/Edit-profile";

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

  
  return (
    <>
      {/* <Header openLogin={() => setCloseLogin(true)} /> */}
        <Navbar  openLogin = {() => setCloseLogin(true)}/>
        <SearchBar />
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
        <Route path = '*' element ={<PageNotFound />} />        
          <Route path="/homePage" element={<HomePage  />} />
          <Route path = '/product/:category_name' element ={<ProductPage />} />
          <Route path="/editProfile" element ={<EditProfile />} />


       <Route element={<LoginRoute />}>
          </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/add-page" element={<AddPage openSignIn={openSignIn} />} />
        </Route>
      </Routes>
      
      {/* <Footer /> */}
    </>
  );
}

export default App;
