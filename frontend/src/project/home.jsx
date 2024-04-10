import React from 'react';
import './style1.css';
import ReactTyped from "react-typed";
import ios from './home_images/iOS.webp';
import logo1 from './home_images/logo1.jpg';
import order from './home_images/order.png'
import ice_cream from './home_images/ice-cream.png'
import phone from './home_images/phone.png'
import play from './home_images/play.webp'

const handleClick = () => {
  console.log('Button clicked!');
};
const handleClick1 = () => {
  console.log('Button clicked!');
};



class SwiggatoApp extends React.Component {
  alertFunction = () => {
    window.alert("App is in development... kindly wait for some time");
  };
  
  updateSelection = () => {
    console.log("lol");
    if (document.getElementById("selection").value === "") {
      document.getElementById("search-button").disabled = true;
    } else {
      document.getElementById("search-button").disabled = false;
    }
  };

  

  redirectToIndex = (event) => {
    event.preventDefault();
   
  };

  redirectToIndex1 = (event) => {
    event.preventDefault();
    
  };
 
  render() {
    return (
      <>
        <div className="landing">
          <div className="landing-interact">
            <div className="navbar2">
              <div className="branding">
                <div><img className="logo1" src={logo1} alt="" /></div>
                <div className="logo-title">Swiggato</div>
                <div>
                <a className='logout1' href="/project/LoginSignup" role="button" onClick={handleClick}>
           Login
        </a>
        <a className='login1' href="/project/LoginSignup" role="button" onClick={handleClick1}>
           Signup
        </a>
              </div>
              
              <div className="links">
                </div>
              </div>
            </div>

            {/* The login and signup boxes are now removed */}
            
            <div className="title1">
            <h1 className='type1' >
        {" "}
        <ReactTyped strings={["Feeling hungry?","Unexpected guests?","Cooking gone wrong?","Game night?","Movie marathon?"]} typeSpeed={100} loop />
      </h1>
              <div className="sub-title1">Order food from favourite resturants near you.</div>
              
            </div>

            <div className="search1">
              <select
                id="selection"
                onChange={this.updateSelection}
                className="search-bar1"
                type="text"
                placeholder="Enter your delivery location"
              >
                <option value="" selected style={{ display: 'none' }}>
                  Select your location
                </option>
                <option value="11">Ahmedabad</option>
                <option value="3">Bangalore</option>
                <option value="7">Chennai</option>
                <option value="1">Delhi</option>
                <option value="6">Hyderabad</option>
                <option value="2">Kolkata</option>
                <option value="3">Mumbai</option>
                <option value="5">Pune</option>
              </select>
              <a id="search" href='/project/LoginSignup'>
                <button
                  disabled
                  id="search-button"
                  className="search-bar1 search-submit1"
                  type="submit"
                >
                  Find Food
                </button>
              </a>
            </div>

            <div className=" cities1 ">
              <div className="cities-title1">CITIES SERVED IN INDIA</div>
              <div className="cities-sub-title1">
                Ahmedabad, Bangalore, Chennai, Delhi, Hyderabad, Kolkata, Mumbai, & Pune
              </div>
            </div>
          </div>

          <div className="landing-images">
            <img className="landing-image" src={require('./home_images/4.jpg')} alt="" />
          </div>
        </div>
        
        <div className="features">
          <div className="feature">
            <div><img className="feature-image" src={order} alt="" /></div>
            <div className="feature-title">No Minimum Order</div>
            <div className="feature-desc">
              Order in for yourself or for the group, with no restrictions on order value
            </div>
          </div>
          <div className="feature">
            <div><img className="feature-image" src={ice_cream} alt="" /></div>
            <div className="feature-title">Live Order Tracking</div>
            <div className="feature-desc">
              Know where your order is at all times, from the restaurant to your doorstep
            </div>
          </div>
        </div>

        <div className="mobile">
          <div className="mob-1">
            <img className="mobile-image" src={phone} alt="" />
          </div>
          <div className="mob-2">
            <div className="changing">Restaurants in your pocket</div>
            <div className="sub-title">
              Order from your favorite restaurants & track on the go, with the all-new Swiggato app.
            </div>
            <div className="stores">
              <img
                className="store-image"
                onClick={this.alertFunction}
                src={play}
                alt=""
              />
              <img className="store-image" src={ios}  alt="" onClick={this.alertFunction} />
            </div>
          </div>
        </div>
        <div className="footer1">
          <div className="credits1">Created/Developed By Aman || Copyright © 2024 Aman. All rights reserved.</div>
        </div>
      </>
    );
  }
}

export default SwiggatoApp;
