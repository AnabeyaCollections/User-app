import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import AllProdcuts from './components/AllProducts'
import Orders from './components/Orders';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import AboutUs from './components/About';
import Contact from './components/Contact';
import SignUp from './components/Signup';
import Alert from './components/Alert'
const App = () => {
    const [cartCount, setCartCount] = useState(0);
    const updateCart = (No_of_Products) => {
        setCartCount(No_of_Products);
    }


    const [alert, setAlert] = useState(null)

    const showAlert = (message, type) => {
      setAlert({
        message: message,
        type: type
      })
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }

    return(
        
        <>
        <Router>
            <Navbar cartCount={cartCount}/>
            <Alert alert={alert}/>
            <Routes>
                <Route path="/" element={<Home updateCart={updateCart} showAlert={showAlert}/>} />
                <Route path="/orders" element={<Orders updateCart={updateCart} showAlert={showAlert}/>} />
                <Route path='/allproducts' element={<AllProdcuts updateCart={updateCart} showAlert={showAlert}/>}></Route>
                <Route path="/cart" element={<Cart updateCart={updateCart} showAlert={showAlert}/>} />
                <Route path="/login" element={<Login  showAlert={showAlert}/>}/>
                <Route path="/signup" element={<SignUp showAlert={showAlert}/>} />
                <Route path="/reviews" element={<Reviews showAlert={showAlert}/>} />
                <Route path="/about" element={<AboutUs/>} />
                <Route path="/contact" element={<Contact/>} />
            </Routes>
            <Footer/>
        </Router>
    </>
    );
};

export default App;
