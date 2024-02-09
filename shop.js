let cartItems = [
  ];
  
  // Function to render cart items on the page
  function renderCartItems() {
    const cartItemsList = document.getElementById('cartItems');
    cartItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} - $${item.price}`;
      cartItemsList.appendChild(listItem);
    });
  }
  
  renderCartItems();
  
  // Function to send cart items to the server
  document.getElementById('buyButton').addEventListener('click', function() {
    fetch('/send-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems: cartItems
      })
    })
    .then(response => {
      if (response.ok) {
        alert('Order sent successfully!');
      } else {
        throw new Error('Failed to send order');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to send order. Please try again later.');
    });
  });

  // node.js
  
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com', // Enter your email
    pass: 'your_password' // Enter your password or app-specific password
  }
});

// Endpoint to handle sending cart items
app.post('/send-cart', (req, res) => {
  const { cartItems } = req.body;

  const cartItemsText = cartItems.map(item => `${item.name} - $${item.price}`).join('\n');

  const mailOptions = {
    from: 'your_email@gmail.com', // Enter your email
    to: 'website_owner@example.com', // Enter website owner's email
    subject: 'New order received',
    text: `New order received with the following items:\n\n${cartItemsText}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Failed to send order');
    } else {
      console.log('Order sent:', info.response);
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function addToCart(productName, price) {
    const item = {
        name: productName,
        price: price
    };

    cartItems.push(item);
    updateCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Clear the existing cart items
    cartList.innerHTML = '';

    // Populate the cart with the updated items
    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function() {
            removeFromCart(index);
        };
        
        listItem.appendChild(removeButton);
        cartList.appendChild(listItem);
    });

    // Calculate and display the total price
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

function openCart() {
    const cart = document.querySelector('.cart');
    const openCartBtn = document.querySelector('.open-cart-btn');
    const closeCartBtn = document.querySelector('.close-btn');
    
    cart.style.display = 'block';
    openCartBtn.style.display = 'none';
    closeCartBtn.style.display = 'block';
}

function closeCart() {
    const cart = document.querySelector('.cart');
    const openCartBtn = document.querySelector('.open-cart-btn');
    const closeCartBtn = document.querySelector('.close-btn');

    cart.style.display = 'none';
    openCartBtn.style.display = 'block';
    closeCartBtn.style.display = 'none';
}