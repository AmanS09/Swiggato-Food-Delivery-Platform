import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import './style2.css'; 
import { useNavigate } from 'react-router-dom';

function Cart1() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const incrementQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };


  const decrementQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);
    }
  };


  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index]) {
      const itemName = updatedCartItems[index].name; 

      updatedCartItems.splice(index, 1);
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);

   
      Swal.fire({
        icon: "success",
        title: `${itemName} removed from cart!`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };


  const calculateTotalPrice = (item) => {
    const total = item.price * item.quantity;
    return isNaN(total) ? 0 : total;
  };

  const calculateTotalPriceForCart = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += calculateTotalPrice(item);
    });
    return totalPrice;
  };


  const updateLocalStorage = (updatedCartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };


  const handlePaymentClick = () => {
   
    navigate('/project/payment', { state: { cartItems } });
  };

  return (
    <div className="cart-container">
      <h1><b>Cart</b></h1>
      <div className="items-container">
        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.imageUrl} alt={item.name} className="item-image" />
            <div className="item-details">

              <h2><b style={{ color: 'Green' }}>{item.name}</b></h2>


              <h2>Price: Rs{item.price}</h2>
              <div className="quantity-container">
                <div className="quantity-btn" onClick={() => decrementQuantity(index)}>
                  -
                </div>
                <span s><h3>{item.quantity}</h3></span>
                <div className="quantity-btn" onClick={() => incrementQuantity(index)}>
                  +
                </div>
              </div>
              <h2><b>Total: Rs{calculateTotalPrice(item)}</b></h2>
              <span className="delete-btn" onClick={() => removeItem(index)}>
                Remove
              </span>
            </div>
          </div>
        ))}
      </div>
      <div id="totalPriceSection">
        <h1>Total Price: <span id="totalPrice">Rs{calculateTotalPriceForCart()}</span></h1>
      </div>
      <button className="payment-btn" onClick={handlePaymentClick}>Pay</button>
    </div>
  );
};


export default Cart1;
