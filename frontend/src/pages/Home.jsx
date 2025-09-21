import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="fade-in">Welcome to FoodExpress 🍽️</h1>
        <p className="slide-up">Delicious food delivered to your door — hot, fast & fresh!</p>
        <div className="special-box bounce-in">
          <h2>🔥 Today's Special</h2>
          <h3>Cheese Burger - ₹99</h3>
          <p>Juicy grilled burger with melted cheese and crispy fries!</p>
          <button className="order-btn">Order Now</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
