import React, { useState } from 'react';
import './payment.css'; 
import { useNavigate,useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

function PaymentForm ()  {
    const [activeTab, setActiveTab] = useState('Order Details');
    const [showPopup, setShowPopup] = useState(false);
    const [proceedClicked, setProceedClicked] = useState(false); 
    const {state}= useLocation();
    const navigate = useNavigate();
  
    const openCity = (mop) => {
  
      setActiveTab(mop);
    };
    const calculateTotalPrice = (item) => {
      const total = item.price * item.quantity;
      return isNaN(total) ? 0 : total;
    };
  
    const GST_RATE = 0.05; 
    const DELIVERY_CHARGE = 50; 
   
    const calculateTotalPriceForCart = () => {
      let totalPrice = 0;
      cartItems.forEach((item) => {
        totalPrice += calculateTotalPrice(item);
      });
      const gstAmount = totalPrice * GST_RATE;

      const totalAmount = totalPrice + gstAmount + DELIVERY_CHARGE;
      return  totalAmount;
    };

  
  const handleProceedClick = () => {
    setProceedClicked(true);
    openCity('Credit Card'); 
  };


    const [cardNumber, setCardNumber] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
  
    const [userId, setUserId] = useState('');
    const [atmPin, setAtmPin] = useState('');
  
    const [walletCardNumber, setWalletCardNumber] = useState('');
    const [walletPin, setWalletPin] = useState('');
  
    const [codName, setCodName] = useState('');
    const [codPhone, setCodPhone] = useState('');
    const [codAddress, setCodAddress] = useState('');
    const [codLandmark, setCodLandmark] = useState('');
    const [codPincode, setCodPincode] = useState('');
  
    const [upi, setUPI] = useState('');
    const [isUpiFilled, setIsUpiFilled] = useState(false);
  
  
    const showSuccessPopup = () => {
        setShowPopup(true);
      };
    
      const closePopup = () => {
        setShowPopup(false);
      };

      const redirectToHomePage = () => {
        localStorage.removeItem("cartItems");  
        navigate('/project/index1', { replace: true });
      };

      
      const cartItems = state ? state.cartItems || [] : []; 
      const totalAmount2= calculateTotalPriceForCart();      
   const validateAndSubmit = () => {
    switch (activeTab) {
      case 'Credit Card':
        if (cardNumber.trim() !== '' && expirationMonth.trim() !== '' && cvv.trim() !== '' && cardHolderName.trim() !== '') {
          showSuccessPopup();
        } else {
          alert('All fields are required for Credit Card payment.');
        }
        break;

        case 'Debit Card':
          if (cardNumber.trim() !== '' && expirationMonth.trim() !== '' && cvv.trim() !== '' && cardHolderName.trim() !== '') {
            showSuccessPopup();
          } else {
            alert('All fields are required for Credit Card payment.');
          }
          break;

      case 'Internet Banking':
        if (userId.trim() !== '' && atmPin.trim() !== '') {
          showSuccessPopup();
        } else {
          alert('All fields are required for Internet Banking payment.');
        }
        break;

      case 'Wallet/Cash Card':
        if (walletCardNumber.trim() !== '' && walletPin.trim() !== '') {
          showSuccessPopup();
        } else {
          alert('All fields are required for Wallet/Cash Card payment.');
        }
        break;

      case 'Cash on Delivery':
        if (codName.trim() !== '' && codPhone.trim() !== '' && codAddress.trim() !== '' && codLandmark.trim() !== '' && codPincode.trim() !== '') {
          showSuccessPopup();
        } else {
          alert('All fields are required for Cash on Delivery payment.');
        }
        break;

      case 'UPI':
        if (isUpiFilled) {
          showSuccessPopup();
        } else {
          alert('UPI ID or UPI Number is required.');
        }
        break;

      default:
        showSuccessPopup();
        break;
    }
  };      

  return (
    <div>
      <div className="tab">
      <button
          className={activeTab === 'Order Details' ? 'tablinks active' : 'tablinks'}
          onClick={() => openCity('Order Details')}
        >
          Order Details
        </button>

        <button
          className={activeTab === 'Credit Card' ? 'tablinks active' : 'tablinks'}
          onClick={() => openCity('Credit Card')}
        >
          Credit Card
        </button>
        <button
          className={activeTab === 'Debit Card' ? 'tablinks active' : 'tablinks'}
          onClick={() => openCity('Debit Card')}
        >
          Debit Card
        </button>
        <button
          className={activeTab === 'Internet Banking' ? 'tablinks active' : 'tablinks'}
          onClick={() => openCity('Internet Banking')}
        >
          Internet Banking
        </button>
        <button
          className={activeTab === 'Wallet/Cash Card' ? 'tablinks active' : 'tablinks'}
          onClick={() => openCity('Wallet/Cash Card')}
        >
          Wallet/Cash Card
        </button>
        <button
          className={activeTab === 'Cash on Delivery' ? 'tablinks active' : 'tablinks'}
          onClick={() => openCity('Cash on Delivery')}
        >
          Cash on Delivery
        </button>
        <button
          className={activeTab === 'UPI' ? 'tablinks active' : 'tablinks'}
          onClick={() => openCity('UPI')}
        >
          UPI
        </button>
      </div>

      <div id="tab-content-container">
      {activeTab === 'Order Details' && (
      <div id="Order Details" className={`tabcontent ${activeTab === 'Order Details' ? 'active' : ''}`}>
          <h3>Amount and Order Details</h3>
          <br></br>
          <p>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x Rs{item.price} = Rs{item.quantity * item.price}
              </li>
            ))}
          </p>
          <br></br>
          <p>GST ({(GST_RATE * 100).toFixed(2)}%): Rs{(calculateTotalPriceForCart() * GST_RATE).toFixed(2)}</p>
    <p>Delivery Charge: Rs{DELIVERY_CHARGE}</p>
          <h3>Total Amount: Rs{totalAmount2}</h3>
          <button
        className="proceed-button"
        onClick={handleProceedClick}
        disabled={!cartItems.length}
      >
        Proceed
      </button>
        </div>
        
      )}
      
        {proceedClicked && (
          <>
        {activeTab === 'Credit Card' && (
          <div id="Credit Card" className={`tabcontent ${activeTab === 'Credit Card' ? 'active' : ''}`}>
            {/* Credit Card content */}
            <img src={require('./cart_images/1.png')} alt="1" style={{ width: '200px', height: 'auto' }} />
            <h3>Pay by Credit Card</h3>
            <p>Card Number</p>
            <input type="text" name="card" placeholder="Enter Card Number" value={cardNumber} 
            onChange={(e) => setCardNumber(e.target.value)}/>
            <p>Expiration Date</p>
            <input type="month" name="month" placeholder="Month" value={expirationMonth}
             onChange={(e) => setExpirationMonth(e.target.value)} />
            <p>CVV/CVC</p>
            <input type="text" name="cvv" value={cvv}onChange={(e) => setCvv(e.target.value)} />
            <p>Card Holder Name</p>
            <input type="text" name="name" placeholder="Enter Card Holder Name" value={cardHolderName} 
            onChange={(e) => setCardHolderName(e.target.value)} />
            <input type="submit" value="Submit" onClick={validateAndSubmit} />
          </div>
        
        )}
        </>
        )}
        {/* Tab contents for Debit Card */}
        {proceedClicked && (
          <>
        {activeTab === 'Debit Card' && (
          <div id="Debit Card" className={`tabcontent ${activeTab === 'Debit Card' ? 'active' : ''}`}>
            {/* Debit Card content */}
            <img src={require('./cart_images/db.png')} alt="db" style={{ width: '150px', height: 'auto' }} />
            <h3>Pay by Debit Card</h3>
            <p>Card Number</p>
            <input type="text" name="card" placeholder="Enter Card Number" value={cardNumber} 
            onChange={(e) => setCardNumber(e.target.value)}/>
            <p>Expiration Date</p>
            <input type="month" name="month" placeholder="Month" value={expirationMonth}
             onChange={(e) => setExpirationMonth(e.target.value)} />
            <p>CVV/CVC</p>
            <input type="text" name="cvv" value={cvv}onChange={(e) => setCvv(e.target.value)} />
            <p>Card Holder Name</p>
            <input type="text" name="name" placeholder="Enter Card Holder Name" value={cardHolderName} 
            onChange={(e) => setCardHolderName(e.target.value)} />
            <input type="submit" value="Submit" onClick={validateAndSubmit} />
          </div>
        )}
          </>
        )}

        {/*Internet Banking */}
        {proceedClicked && (
          <>
        {activeTab === 'Internet Banking' && (
          <div id="Internet Banking" className={`tabcontent ${activeTab === 'Internet Banking' ? 'active' : ''}`}>
            {/* Internet Banking content */}
            <img src={require('./cart_images/nb.png')} alt="nb" style={{ width: '200px', height: 'auto' }} />
            <h3>Pay by Internet Banking</h3>
            <p>User ID</p>
            <input type="text" name="userid" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <p>ATM Pin/Password</p>
            <input type="password" name="pwd" value={atmPin} onChange={(e) => setAtmPin(e.target.value)} />
            <input type="submit" value="Submit" onClick={validateAndSubmit} />
          </div>
        )}
             </>
        )}
      {/*Wallet/Cash Card*/}
      {proceedClicked && (
          <>
      {activeTab === 'Wallet/Cash Card' && (
        <div id="Wallet/Cash Card" className={`tabcontent ${activeTab === 'Wallet/Cash Card' ? 'active' : ''}`}>
          {/* Wallet/Cash Card content */}
          <img src={require('./cart_images/wallet.png')} alt="wallet" style={{ width: '150px', height: 'auto' }} />
          <h3>Pay by Wallet/Cash Card</h3>
          <p>Card Number</p>
          <input type="text" name="card" placeholder="Enter Card Number" value={walletCardNumber} 
          onChange={(e) => setWalletCardNumber(e.target.value)}/>
          <p>Pin</p>
          <input type="password" name="pwd" placeholder="Enter Pin" value={walletPin} onChange={(e) => setWalletPin(e.target.value)} />
          <input type="submit" value="Submit" onClick={validateAndSubmit} />
        </div>
      )}
           </>
        )}

          {/* Cash on Delivery*/}
          {proceedClicked && (
          <>
          {activeTab === 'Cash on Delivery' && (
        <div id="Cash on Delivery" className={`tabcontent ${activeTab === 'Cash on Delivery' ? 'active' : ''}`}>
          {/* Cash on Delivery content */}
          <div className="image-container">
            <img src={require('./cart_images/cod.png')} alt="cod" className="right-image" width="400" height="auto" />
          </div>
          <h3>Cash on Delivery (COD)</h3>
          <p>Name</p>
          <input type="text" name="name" placeholder="Enter Name" value={codName} onChange={(e) => setCodName(e.target.value)} />
          <p>Phone Number</p>
          <input type="text" name="phone" placeholder="Enter Phone Number" value={codPhone} onChange={(e) => setCodPhone(e.target.value)}/>
          <p>Address</p>
          <input type="text" name="address" placeholder="Enter Address" value={codAddress} onChange={(e) => setCodAddress(e.target.value)} />
          <p>Landmark</p>
          <input type="text" name="landmark" placeholder="Enter Landmark" value={codLandmark} onChange={(e) => setCodLandmark(e.target.value)} />
          <p>Pincode</p>
          <input type="text" name="pincode" placeholder="Enter Pincode" value={codPincode} onChange={(e) => setCodPincode(e.target.value)}/>
          <input type="submit" value="Submit" onClick={validateAndSubmit} />
        </div>
      )}
       </>
        )}

      {/*UPI */}
      {proceedClicked && (
          <>
      {activeTab === 'UPI' && (
        <div id="UPI" className={`tabcontent ${activeTab === 'UPI' ? 'active' : ''}`}>
          {/* UPI content */}
          <img src={require('./cart_images/UPI.png')} alt="upi" style={{ width: '100px', height: 'auto' }} />
          <h3>UPI</h3>
          <p>UPI ID or UPI Number</p>
          <input type="text" name="upi" placeholder="Enter UPI ID or UPI Number" value={upi} onChange={(e) => {setUPI(e.target.value);
          setIsUpiFilled(e.target.value.trim() !== '');}}/>
          <input type="submit" value="Submit" onClick={validateAndSubmit} />
        </div>
      )}
       </>
        )}
</div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div id="popup" className="popup">
            <div className="popup-content">
              <img src={require('./cart_images/tick.png')} alt="tick" className="tick" />
              <p>Order Placed Successfully</p>
              <button onClick={redirectToHomePage}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;






