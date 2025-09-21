import { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



function Orders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios.post("http://localhost:5000/my-orders", { username: user.username })
        .then(res => setOrders(res.data))
        .catch(err => console.log(err));
    }
  }, [user]);
const downloadPDF = () => {
  const doc = new jsPDF();
  doc.text("Order Summary", 20, 20);

  orders.forEach((order, idx) => {
    doc.text(`Order #${idx + 1} - Total ₹${order.total}`, 20, 30 + idx * 20);

    autoTable(doc, {
      startY: 35 + idx * 20,
      head: [['Item', 'Qty', 'Price']],
      body: order.items.map(item => [item.title, item.qty, `₹${item.price}`])
    });
  });

  doc.save("orders.pdf");
};


  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-orders">No Orders Found</p>
      ) : (
        orders.map((order, idx) => (
          <div className="order-card" key={idx}>
            <h4>Order #{idx + 1}</h4>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>{item.title} x {item.qty} - ₹{item.price}</li>
              ))}
            </ul>
            <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
      {orders.length > 0 && (
  <button className="download-btn" onClick={downloadPDF}>
    Download Orders PDF
  </button>
)}

    </div>
  );
}

export default Orders;
