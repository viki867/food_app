import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Cart.css";
import axios from "axios";
import confetti from "canvas-confetti";
function Cart({ cart, setCart, user }) {
  const nav = useNavigate();
  const [showModal, setShowModal] = useState(false);
 

const placeOrder = () => {
  axios.post("http://localhost:5000/place-order", {
    username: user.username,
    items: cart,
    total: totalPrice
  })
  .then(res => {
    confetti();
    setShowModal(true);
    setCart([]);
    setTimeout(() => {
      setShowModal(false);
      nav("/orders");
    }, 2000);
  })
  .catch(err => alert("Error placing order"));
};

  const increment = (id) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decrement = (id) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 } : item
    ));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

  return (
    <div className="cart-container">
      <img src="/images/1.avif" alt="Cart Background" className="bg-image" />

      <div className="cart-box">
        <h2 className="cart-title">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-text">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
  <div className="cart-item" key={index}>
    <img src={item.image} alt={item.title} className="cart-img" />

    <div className="cart-details">
      <h4>{item.title}</h4>
      <p>₹{item.price} x {item.qty} = ₹{item.price * item.qty}</p>

      <div className="quantity-controls">
        <button onClick={() => decrement(item.id)}>-</button>
        <span>{item.qty}</span>
        <button onClick={() => increment(item.id)}>+</button>
      </div>
    </div>

    <button className="remove-btn" onClick={() => removeItem(item.id)}>✖</button>
  </div>
))
        )}

        <h3 className="total-text">Total: ₹{totalPrice}</h3>

        {cart.length > 0 && (
          <button onClick={placeOrder} className="place-button">
            Place Order
          </button>
        )}
      </div>
       {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>🎉 Order Placed Successfully!</h2>
            <p>Thank you for your order. We are preparing your food!</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
