import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails({ products, addToCart }) {
  const { id } = useParams();
  const nav = useNavigate();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Product Not Found</h2>;

  return (
  <div className="details-container">
    <div className="details-card">
  <img src={product.image} alt={product.title} className="details-image" />
  
  <div className="details-info">
    <h2 className="details-title">{product.title}</h2>
    <h3 className="details-price">₹{product.price}</h3>
    <p className="details-desc">Freshly made delicious {product.title}. Taste the joy!</p>

    <div className="details-buttons">
      <button className="add-btn" onClick={() => addToCart({ ...product, qty: 1 })}>Add to Cart</button>
      <button className="back-btn" onClick={() => nav(-1)}>Go Back</button>
    </div>
  </div>
</div>
</div>
  );
}

export default ProductDetails;
