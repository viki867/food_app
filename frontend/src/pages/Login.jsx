import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const nav = useNavigate();

  const handleLogin = () => {
     axios.post('http://localhost:5000/login', { username, password })
    .then(res => {
      if (res.data.status === "Success") {
        // Full details set pannura
        setUser({
          username: res.data.username,
          mobile: res.data.mobile,
          address: res.data.address,
              email: res.data.email,
        });
        nav('/products');
      } else {
        alert("Invalid Credentials");
      }
    });
  };

  const handleRegister = () => {
    if (!username || !password || !mobile || !address) {
      alert("Please fill all fields");
      return;
    }
    axios.post('http://localhost:5000/register', { username, password, mobile, address,email })
      .then(res => alert(res.data));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegister ? "Register" : "Login"}</h2>

   <input
  className="input-field"
  placeholder="Username"
  style={{
    backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/1077/1077114.png')"
  }}
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

<input
  className="input-field"
  type="password"
  placeholder="Password"
  style={{
    backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/3064/3064155.png')"
  }}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

<br /><br />

        {isRegister && (
          <>
            <input
              className="input-field"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            /><br /><br />
            <input
  className="input-field"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>


            <textarea
              className="input-field"
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea><br /><br />
          </>
        )}

        {isRegister ? (
          <>
            <button className="btn register-btn" onClick={handleRegister}>Register</button>
            <p onClick={() => setIsRegister(false)} className="toggle-text">Already have an account? Login</p>
          </>
        ) : (
          <>
            <button className="btn login-btn" onClick={handleLogin}>Login</button>
            <p onClick={() => setIsRegister(true)} className="toggle-text">New user? Register</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
