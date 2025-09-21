import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Cart from './pages/Cart';
import './App.css';
import Profile from './pages/Profile'; 
import foodItems from './pages/data/products';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/Orders';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBoxOpen, faShoppingCart, faSignOutAlt, faUser, faClipboardList } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
 


  const addToCart = (item) => {
    const exists = cart.find(i => i.id === item.id);
    if (exists) {
      setCart(cart.map(i =>
        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <video autoPlay muted loop className="background-video">
          <source src="/videos/any.mp4" type="video/mp4" />
        </video>

        <nav className="navbar">
          <div className="logo">🍽️ InfoTreats</div>
          <div className="nav-links">
            <Link to="/"><FontAwesomeIcon icon={faHome} className="nav-icon" />Home</Link>
            {user ? (
              <>
                <Link to="/products"> <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" /> Products</Link>
                <Link to="/profile">
 <FontAwesomeIcon icon={faUser} className="nav-icon" />Profile
</Link>

  <Link to="/orders"> <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />Orders</Link> {/* New Orders Link */}
              <Link to="/cart" className="cart-link">  <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
  Cart <span className="cart-count">
    {cart.reduce((sum, item) => sum + item.qty, 0)}
  </span>
</Link>
                <button className="logout-btn" onClick={() => setUser(null)}><FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />Logout</button>
              </>
            ) : (
              <Link to="/login" className="loginbtn"><FontAwesomeIcon icon={faUser} className="nav-icon" />Login</Link>
            )}
            
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/products" element={user ? <Products addToCart={addToCart} /> : <Navigate to="/login" />} />
          <Route path="/cart" element={user ? <Cart cart={cart} setCart={setCart} user={user} /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
          <Route path="/orders" element={user ? <Orders user={user} /> : <Navigate to="/login" />} />

          <Route path="/product/:id" element={<ProductDetails products={foodItems} addToCart={addToCart} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
