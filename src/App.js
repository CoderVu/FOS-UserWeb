import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProducts from '../src/components/Products/AllProducts.jsx'; 
import Login from '../src/components/auth/Login.jsx';
import Logingg from './components/auth/LoginGoogle.jsx';
import LoginFacebook from './components/auth/LoginFacebook.jsx';
import Home from '../src/components/home/Home.jsx';
import AllCartItemOfMe from "../src/components/Products/AllCartItemOfme.jsx";
import AllHistoryOrderOfme from './components/Products/AllHistoryOrderOfme.jsx';
import OAuth2RedirectHandler from './components/auth/OAuth2RedirectHandler.jsx';


const App = () => {
  return (

      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-google" element={<Logingg />} />
          <Route path="/login-facebook" element={<LoginFacebook />} />
          <Route exact path="/all-product" element={<AllProducts />} />
          <Route path="/all-cart-item-of-me" element={<AllCartItemOfMe />} />
          <Route path="/all-order" element={<AllHistoryOrderOfme />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
     

  );
}


export default App;