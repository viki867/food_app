const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect('mongodb://127.0.0.1:27017/foodapp')
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  mobile: String,
  address: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .then(user => {
      if (user) {
        res.json({
          status: "Success",
          username: user.username,
          mobile: user.mobile,
          address: user.address
        });
      } else {
        res.send("Invalid Credentials");
      }
    })
    .catch(err => {
      console.log(err);
      res.send("Error occurred");
    });
});



const OrderSchema = new mongoose.Schema({
  username: String,
  items: Array,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);


// Place Order with Email Notification
app.post('/place-order', (req, res) => {
  const { username, items, total } = req.body;
  
  User.findOne({ username })
    .then(user => {
      if (!user) return res.send("User Not Found");

      const newOrder = new Order({ username, items, total });
      newOrder.save()
        .then(() => {
         

          res.send("Order Placed & Email Sent");
        });
    });
});



// My Orders Fetch
app.post("/my-orders", (req, res) => {
  const { username } = req.body;

  Order.find({ username })
    .sort({ createdAt: -1 })
    .then(orders => res.json(orders))
    .catch(err => res.status(500).send("Error fetching orders"));
});
// Register Route
app.post('/register', (req, res) => {
  const { username, password, mobile, address,email } = req.body;
  const newUser = new User({ username, password, mobile, address,email });
  newUser.save()
    .then(() => res.send("Registered Successfully"))
    .catch(err => res.send("Error Registering"));
});


// ✅ Profile Update Route
app.post('/update-profile', (req, res) => {
  const { username, mobile, address,email } = req.body;

  User.findOneAndUpdate(
    { username },
    { mobile, address,email },
    { new: true }
  )
    .then(user => {
      if (user) {
        res.send("Profile Updated Successfully");
      } else {
        res.send("User Not Found");
      }
    })
    .catch(err => {
      console.log(err);
      res.send("Update Failed");
    });
});

// Server Listen
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
