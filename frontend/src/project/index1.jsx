import React, { useState, useEffect ,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './style.css'; 
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

function Index1() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleBackNavigation = (e) => {
      e.preventDefault();
      navigate('/project/index1');
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handleBackNavigation);

    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };
  }, [navigate]);
  
  


  const handleLogout = () => {

    console.log("Logout Clicked");
  };
  

  function addToCart(itemName, price,imageUrl) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const item = {
      name: itemName,
      price: price,
      quantity: 1,
      imageUrl: imageUrl,
    };

    cartItems.push(item);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount(cartItems.length);

    Swal.fire({
      icon: 'success',
      title: 'Item added to cart!',
      showConfirmButton: false,
      timer: 2000,
    });
  }

   const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDocumentClick = (event) => {
    const targetElement = event.target;

    if (menuRef.current && !menuRef.current.contains(targetElement) &&  !targetElement.closest('.button3')) {
      setMenuOpen(false);
    }
  };

    const handleMenuScroll = (event) => {
    const menuContainer = menuRef.current;

    if (
      menuContainer &&
      menuContainer.scrollHeight - menuContainer.scrollTop === menuContainer.clientHeight
    ) {
      event.stopPropagation();
    }
  };

  
  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('click', handleDocumentClick);
    } else {
      document.removeEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [menuOpen]);

  function updateCartCount(count) {
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.textContent = count;
  }

  const [foodNameInput, setFoodNameInput] = React.useState('');
const [priceInput, setPriceInput] = React.useState(0);

  function orderNow(foodName, price) {
    setFoodNameInput(foodName);
    setPriceInput(price);
  }

  React.useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartCount(cartItems.length);
  }, []);

  React.useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = cartItems.length;
    localStorage.setItem('cartCount', cartCount);
  });

  const [isFormValid, setIsFormValid] = React.useState(false);
  
  
  React.useEffect(() => {
    function validateForm() { 
      if (foodNameInput && priceInput) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
    validateForm();
  }, [foodNameInput, priceInput]);

  const handlePaymentClick = () => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let item = {
      name: foodNameInput,
      price: priceInput,
      quantity: 1,
    };
    cartItems.push(item);
    navigate('/project/payment', { state: { cartItems} });
  };

  return (
    <>
      <div className='check'>
        {/* Header section */}
        <header>
          <div className="logo">
            <div className="logo-container">
              <img src={require('./index_images/logo3.jpg')} alt="" />
              <span className="logo-text">Swiggato</span>
            </div>
          </div>

          <div id="menu-bar" className="fas fa-bars"></div>
          <nav className="navbar1">
            <a href="#home">
              <i className="fas fa-home"></i> Home
            </a>
            <a href="#About Us">
              <i className="fas fa-info-circle"></i> About Us
            </a>
            <a href="#speciality">
              <i className="fas fa-star"></i> Speciality
            </a>
            <a href="#Menu">
              <i className="fas fa-utensils"></i> Menu
            </a>
            <a href="#gallery">
              <i className="fas fa-image"></i> Gallery
            </a>
            <a href="#HealthyTips">
              <i className="fas fa-heart"></i> Healthy Tips
            </a>
            <Link to="/project/cart" id="cartLink">
            <i className="fas fa-shopping-cart">
              <span id="cartCount">0</span>
            </i>
            Cart
          </Link>
          <a href="/" role="button" onClick={handleLogout}>
        LogOut
      </a>
          </nav>
        </header>

        {/* Home section */}
        <section className="home" id="home">
          <div className="content">
            <h3 style={{ fontWeight: 'bold' }}>Food Made With Love</h3>
            <p>
              The most important ingredient and healing effect in the preparation of all meals and dishes: is Love! It’s
              always available and free, it causes well being, health, joy, gratitude and satisfaction.
            </p>
            <a href="#home" className="btn1">
              Welcome
            </a>
          </div>
          <div className="image">
            <img src={require('./index_images/pizza.webp')} alt="" />
          </div>
        </section>

        {/* Steps section */}
        <div className="step-container">
          <h1 className="heading">
            How It <span>Works</span>
          </h1>
          <section className="steps">
            <div className="box">
              <img src={require('./index_images/step-1.jpg')} alt="" />
              <h3 style={{ fontWeight: 'bold' }}>Choose your favorite food</h3>
            </div>
            <div className="box">
              <img src={require('./index_images/step-2.jpg')} alt="" />
              <h3 style={{ fontWeight: 'bold' }}>Free and Fast delivery</h3>
            </div>
            <div className="box">
              <img src={require('./index_images/step-3.jpg')} alt="" />
              <h3 style={{ fontWeight: 'bold' }}>Easy payments methods</h3>
            </div>
            <div className="box">
              <img src={require('./index_images/step-4.jpg')} alt="" />
              <h3 style={{ fontWeight: 'bold' }}>And finally, enjoy your meal</h3>
            </div>
          </section>
        </div>

        {/* About Us section */}
        <section className="About Us" id="About Us">
          <h1 className="heading"> About <span>Us</span> </h1>
          <div className="about-section">
            <h1>About The Swiggato</h1>
            <p>Craving some delicious  food? Maybe you’re in the mood for a juicy steak?
              No matter what kind of meal you have in mind, The Swiggato is ready to prepare it for you.
              Since 1973, The Swiggato has been the go-to diner for residents of Binghamton, NY. Our diner serves breakfast all day, in addition to wholesome and flavorful dining options for lunch and dinner. From burgers to salads, seafood to pastas, you’ll find all kinds of hearty meals prepared fresh at The Swiggato. Our diner also has a full bakery with delicious baked goods and other treats, including our famous cheesecake. Sounds delicious, right?.</p>
            <p>We’re here to serve you the best food around, whenever you’re looking for a great Indian restaurant in India.</p>
          </div>
          <h2 style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: '2rem', fontSize: '2.5rem' }}>Our Team</h2>
          <div className="row">
            <div className="column">
              <div className="card">
                <img src={require('./index_images/Aman3.jpg')} alt="Aman Srivastava" style={{ width: '100%' }} />
                <div className="container">
                  <h2 className='heading1'>Aman Srivastava</h2>
                  <h3 className="title">CEO & Founder</h3>
                  <h5 >Amansrivastava@gmail.com</h5>
                  <p>
                    <Link to="https://www.linkedin.com/in/aman-srivastava-73113b222/" target="_blank">
                      <button className="button" style={{ fontSize: '1.5rem' }}>Contact</button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div class="column">
              <div className="card">
                <img src={require('./index_images/Priyanshu.jpg')} alt="Priyanshu Srivastava" style={{ width: '100%' }} />
                <div className="container">
                  <h2 className='heading1'>Priyanshu Srivastava</h2>
                  <h3 className="title">Art Director & Co-founder</h3>
                  <h5>Priyanshusrivastava@gmail</h5>
                  <p>
                    <Link to="https://instagram.com/i_m_priyanshu.09/" target="_blank">
                      <button className="button" style={{ fontSize: '1.5rem' }}>Contact</button>
                    </Link>
                  </p></div>
              </div>
            </div>
            <div class="column">
              <div class="card">
                <img src={require('./index_images/Pranav.png')} alt="Pranav Bansal" style={{ width: '100%' }} />
                <div class="container">
                  <h2 className='heading1'>Pranav Bansal</h2>
                  <h3 class="title">Chairman and Managing Director</h3>
                  <h5>Pranavbansal@gmail.com</h5>
                  <p>
                    <Link to="https://instagram.com/pranav106/" target="_blank">
                      <button className="button" style={{ fontSize: '1.5rem' }}>Contact</button>
                    </Link>
                  </p></div>
              </div>
            </div>
            <div class="column">
              <div class="card">
                <img src={require('./index_images/Gaurav.jpg')} alt="Gaurav Kumar" style={{ width: '100%' }} />
                <div class="container">
                  <h2 className='heading1'>Gaurav Kumar</h2>
                  <h3 class="title">Head of Investments</h3>
                  <h5>Gauravkumar@gmail</h5>
                  <p>
                    <Link to="https://instagram.com/1up_gaurav/" target="_blank">
                      <button className="button" style={{ fontSize: '1.5rem' }}>Contact</button>
                    </Link>
                  </p></div>
              </div>
            </div>
            <div class="column">
              <div class="card">
                <img src={require('./index_images/AKshay.png')} alt="Akshay Pratap Singh" style={{ width: '100%' }} />
                <div class="container">
                  <h2 className='heading1'>Akshay Pratap Singh</h2>
                  <h3 class="title">Designer </h3>
                  <h5>Akshaypratap@gmail</h5>
                  <p>
                    <Link to="https://instagram.com/akshay_pratap_786/" target="_blank">
                      <button className="button" style={{ fontSize: '1.5rem' }}>Contact</button>
                    </Link>
                  </p></div>
              </div>
            </div>
          </div>
        </section>
        {/* About us Section Ends */}

        {/* Toggle Mennu Starts*/}

        <div className="sticky-button1">
          <div className="button3" onClick={toggleMenu}>
            <img src={require('./index_images/menu1.jpeg')} alt="Menu Icon" className="menu1-icon" />
          </div>
          <div  className={`menu1 ${menuOpen ? 'open' : ''}`}
        id="menu"
        ref={menuRef}
        onScroll={handleMenuScroll}>
            <div className="menu1-list-container">
              <ul className="menu-list">
                <li>
                  <span className="food-name">Veg Cheese Burger</span>
                  <span className="food-price"> Rs110</span>
                </li>
                <li>
                  <span className="food-name">Burrito</span>
                  <span className="food-price">Rs300</span>
                </li>
                <li>
                  <span className="food-name">Orange sponge cake</span>
                  <span className="food-price">Rs500</span>
                </li>
                <li>
                  <span className="food-name">Flavour barfi</span>
                  <span className="food-price"> Rs150</span>
                </li>
                <li>
                  <span className="food-name">Chocolate Cupcake</span>
                  <span className="food-price">Rs50</span>
                </li>
                <li>
                  <span className="food-name">Chicekn burger</span>
                  <span className="food-price">Rs100</span>
                </li>
                <li>
                  <span className="food-name">Cold drink</span>
                  <span className="food-price">Rs40</span>
                </li>
                <li>
                  <span className="food-name">Cold ice-cream</span>
                  <span className="food-price">Rs60</span>
                </li>
                <li>
                  <span className="food-name">Paneer sandwich</span>
                  <span className="food-price">Rs120</span>
                </li>
                <li>
                  <span className="food-name">Tasty cupcakes</span>
                  <span className="food-price">Rs50</span>
                </li>
                <li>
                  <span className="food-name">Crispy Fried Chicken</span>
                  <span className="food-price">Rs450</span>
                </li>
                <li>
                  <span className="food-name">Egg Toast</span>
                  <span className="food-price">Rs120</span>
                </li>
                <li>
                  <span className="food-name">Sweet Namkeen</span>
                  <span className="food-price">Rs150</span>
                </li>
                <li>
                  <span className="food-name">Chocolate</span>
                  <span className="food-price">Rs50</span>
                </li>
                <li>
                  <span className="food-name">Chicken Biryani</span>
                  <span className="food-price">Rs400</span>
                </li>
                <li>
                  <span className="food-name">Mutton Biryan</span>
                  <span className="food-price">Rs450</span>
                </li>
                <li>
                  <span className="food-name">Tandoori Chicken</span>
                  <span className="food-price">Rs350</span>
                </li>
                <li>
                  <span className="food-name">Pancake</span>
                  <span className="food-price">Rs120</span>
                </li>
                <li>
                  <span className="food-name">Veg Thali</span>
                  <span className="food-price">Rs180</span>
                </li>
                <li>
                  <span className="food-name">Egg Pulao</span>
                  <span className="food-price">Rs150</span>
                </li>
                <li>
                  <span className="food-name">Raj Kachori</span>
                  <span className="food-price">Rs90</span>
                </li>
                <li>
                  <span className="food-name">Tacos</span>
                  <span className="food-price">Rs110</span>
                </li>
                <li>
                  <span className="food-name">Vada Pav</span>
                  <span className="food-price">Rs50</span>
                </li>
                <li>
                  <span className="food-name">Samosa</span>
                  <span className="food-price">Rs40</span>
                </li>

              </ul>
            </div>
          </div>
        </div>

        {/* Speciality section */}
        <section className="speciality" id="speciality">
          <h1 className="heading">  Our <span>Speciality</span> </h1>
          <div className="box-container">
            <div className="box">
              <img className="image" src={require('./index_images/s-img-1.jpg')} alt="" />
              <div className="content">
                <img src={require('./index_images/s-1.png')} alt="" />
                <h3>Tasty burger</h3>
                <p>Our mission is to serve a fresh, flavorful, flat patty burger made from the finest Indian Style, while becoming a real part of every neighborhood in which we open.</p>
              </div>
            </div>
            <div className="box">
              <img className="image" src={require('./index_images/s-img-2.jpg')} alt="" />
              <div className="content">
                <img src={require('./index_images/s-2.png')} alt="" />
                <h3>Tasty pizza</h3>
                <p>Our Pizza has the freshest pizza dough in the city,It’s made every day so that the flavour and texture of the dough are perfect every time you visit.</p>
              </div>
            </div>
            <div className="box">
              <img className="image" src={require('./index_images/s-img-3.jpg')} alt="" />
              <div className="content">
                <img src={require('./index_images/s-3.png')} alt="" />
                <h3>Cold Ice-cream</h3>
                <p>Delicious, creamy, satisfying flavors of Cold Love. Artisanal ice cream, handmade with all-natural ingredients. You can order ice cream online</p>
              </div>
            </div>
            <div className="box">
              <img className="image" src={require('./index_images/s-img-4.jpg')} alt="" />
              <div className="content">
                <img src={require('./index_images/s-4.png')} alt="" />
                <h3>Cold Drinks</h3>
                <p>You've organized a family get together,no worries! We are here to back you up. Place a cold drink online order at our restaurant and our delivery boy will be there at your service</p>
              </div>
            </div>
            <div className="box">
              <img className="image" src={require('./index_images/s-img-5.jpg')} alt="" />
              <div className="content">
                <img src={require('./index_images/s-5.png')} alt="" />
                <h3>Tasty sweets</h3>
                <p>Here are the best chocolates in our restaurant. Place a tasty sweets online order at our restaurant and our delivery boy will be there at your service.</p>
              </div>
            </div>
            <div className="box">
              <img className="image" src={require('./index_images/s-img-6.jpg')} alt="" />
              <div className="content">
                <img src={require('./index_images/s-6.png')} alt="" />
                <h3>Healthy Breakfast</h3>
                <p>Eat healthy breakfast like a king, lunch like a prince, and dinner like a pauper.
                  Place a healthy breakfast online order at our restaurant.</p>
              </div>
            </div>
          </div>
        </section>

      
        <section className="Menu" id="Menu">
          <h1 className="heading">Menu - Most <span>Popular</span> Foods</h1>
          <div className="box-container">
            <div className="box">
              <span className="price" data-price="400">Rs.400</span>
              <img src={require('./menu_images/Chicken.webp')} alt="" />
              <h3>Chicken Biryani</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Chicken Biryani', 40)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Chicken Biryani', 400,require('./menu_images/Chicken.webp'))} />
              </div>
            </div>
            <div className="box">
              <span className="price" data-price="450">Rs.450</span>
              <img src={require('./menu_images/Mutton.jpg')} alt="" />
              <h3>Mutton Biryan</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Mutton Biryan', 450)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Mutton Biryan', 450,require('./menu_images/Mutton.jpg'))} />
              </div>
            </div>
            <div className="box">
              <span className="price" data-price="350">Rs.350</span>
              <img src={require('./menu_images/Tandoori.jpeg')} alt="" />
              <h3>Tandoori Chicken</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Tandoori Chicken', 350)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Tandoori Chicken', 350,require('./menu_images/Tandoori.jpeg'))} />
              </div>
            </div>
            <div className="box">
              <span className="price" data-price="120">Rs.120</span>
              <img src={require('./menu_images/pancake.jpg')} alt="" />
              <h3>Pancake</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Pancake', 120)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Pancake', 120,require('./menu_images/pancake.jpg'))} />
              </div>
            </div>
            <div className="box">
              <span className="price" data-price="180">Rs.180</span>
              <img src={require('./menu_images/veg.jpg')} alt="" />
              <h3>Veg Thali</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Veg Thali', 180)}>Order Now</a>
              <div className="icon">
                
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Veg Thali', 180,require('./menu_images/veg.jpg'))} />
              </div>
            </div>
            <div className="box">
              <span className="price" data-price="150">Rs.150</span>
              <img src={require('./menu_images/egg.jpg')} alt="" />
              <h3>Egg Pulao</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Egg Pulao', 150)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Egg Pulao', 150,require('./menu_images/egg.jpg'))} />
              </div>
            </div>
            <div className="box">
              <span className="price" data-price="90">Rs.90</span>
              <img src={require('./menu_images/raj.webp')} alt="" />
              <h3>Raj Kachori</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Raj Kachori', 90)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Raj Kachori', 90,require('./menu_images/raj.webp'))} />
              </div>
            </div>
            <div className="box">
              <span className="price" data-price="110">Rs.110</span>
              <img src={require('./menu_images/Tacos.jpg')} alt="" />
              <h3>Tacos</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Tacos', 110)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Tacos', 110,require('./menu_images/Tacos.jpg'))} />
              </div>
            </div>
            <div className="box">
              <span className="price" data-price="50">Rs.50</span>
              <img src={require('./menu_images/vada.webp')} alt="" />
              <h3>Vada Pav</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Vada Pav', 50)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Vada Pav', 50,require('./menu_images/vada.webp'))} />
              </div>
            </div>
            <div className="box">
              <span className="price" data-price="100">Rs.100</span>
              <img src={require('./index_images/p-1.jpg')} alt="" />
              <h3>Chicken burger</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Chicken Burger', 100)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Chicken Burger', 100,require('./index_images/p-1.jpg'))} />
              </div>
            </div>

            <div className="box">
              <span className="price" data-price="500">Rs.500</span>
              <img src={require('./index_images/p-2.jpg')} alt="" />
              <h3>Orange sponge cake</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Orange sponge cake', 500)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Orange sponge cake', 500,require('./index_images/p-2.jpg'))} />
              </div>
            </div>

            <div className="box">
              <span className="price" data-price="150">Rs.150</span>
              <img src={require('./index_images/p-3.jpg')} alt="" />
              <h3>Sweet Namkeen</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Sweet Namkeen', 150)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Sweet Namkeen', 150,require('./index_images/p-3.jpg'))} />
              </div>
            </div>

            <div className="box">
              <span className="price" data-price="50">Rs.50</span>
              <img src={require('./index_images/p-4.jpg')} alt="" />
              <h3>Tasty cupcakes</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Tasty Cupcakes', 50)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Tasty Cupcakes', 50,require('./index_images/p-4.jpg'))} />
              </div>
            </div>

            <div className="box">
              <span className="price" data-price="40">Rs.40</span>
              <img src={require('./index_images/p-5.jpg')} alt="" />
              <h3>Cold Drinks</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Cold Drinks', 40)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Cold Drinks', 40,require('./index_images/p-5.jpg'))} />
              </div>
            </div>
            
            <div className="box">
              <span className="price" data-price="60">Rs.60</span>
              <img src={require('./index_images/p-6.jpg')} alt="" />
              <h3>cold ice-cream</h3>
              <a href="#Order Now" className="btn1" onClick={() => orderNow('Cold Ice Cream', 60)}>Order Now</a>
              <div className="icon">
                <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%' }} onClick={() => addToCart('Cold Ice Cream', 60,require('./index_images/p-6.jpg'))} />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery section */}
        <section className="gallery" id="gallery">
          <h1 className="heading">Our Food <span>Gallery</span></h1>
          <div className="box-container">
            <div className="box">
              <img src={require('./index_images/g-1.jpg')} alt="" />
              <div className="content">
                <h3 className='gall'>Veg Cheese Burger</h3>
                <p>The chief ingredient in yummy food is love.</p>
                <a href="#Order Now" className="btn1" onClick={() => orderNow('Veg Cheese Burger', 110)}>Order Now</a>
                <div className="icon">
                  <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%', paddingTop: '5px' }} onClick={() => addToCart('Veg Cheese Burger', 110,require('./index_images/g-1.jpg'))} />
                </div>
              </div>
            </div>

            <div className="box">
              <img src={require('./index_images/g-2.jpg')} alt="" />
              <div className="content">
                <h3 className='gall'>Paneer sandwiches</h3>
                <p>The chief ingredient in yummy food is love.</p>
                <a href="#Order Now" className="btn1" onClick={() => orderNow('Paneer sandwich', 120)}>Order Now</a>
                <div className="icon">
                  <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%', paddingTop: '5px' }} onClick={() => addToCart('Paneer sandwich', 120,require('./index_images/g-2.jpg'))} />
                </div>
              </div>
            </div>

            {/* Add more boxes as needed */}
            {/* ... */}
            <div className="box">
              <img src={require('./index_images/g-3.jpg')} alt="" />
              <div className="content">
                <h3 className='gall'>Burrito</h3>
                <p>The chief ingredient in yummy food is love.</p>
                <a href="#Order Now" className="btn1" onClick={() => orderNow('Burrito', 300)}>Order Now</a>
                <div className="icon">
                  <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%', paddingTop: '5px' }} onClick={() => addToCart('Burrito', 300,require('./index_images/g-3.jpg'))} />
                </div>
              </div>
            </div>
            <div className="box">
              <img src={require('./index_images/g-4.jpg')} alt="" />
              <div className="content">
                <h3 className='gall'>Chocolate Cupcake</h3>
                <p>The chief ingredient in yummy food is love.</p>
                <a href="#Order Now" className="btn1" onClick={() => orderNow('Chocolate Cupcake', 50)}>Order Now</a>
                <div className="icon">
                  <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%', paddingTop: '5px' }} onClick={() => addToCart('Chocolate Cupcake', 50,require('./index_images/g-4.jpg'))} />
                </div>
              </div>
            </div>
            <div className="box">
              <img src={require('./index_images/g-5.jpg')} alt="" />
              <div className="content">
                <h3 className='gall'>Flavour barfi</h3>
                <p>The chief ingredient in yummy food is love.</p>
                <a href="#Order Now" className="btn1" onClick={() => orderNow('Flavour barfi', 150)}>Order Now</a>
                <div className="icon">
                  <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%', paddingTop: '5px' }} onClick={() => addToCart('Flavour barfi', 150,require('./index_images/g-5.jpg'))} />
                </div>
              </div>
            </div>
            <div className="box">
              <img src={require('./index_images/g-6.jpg')} alt="" />
              <div className="content">
                <h3 className='gall'>Crispy Fried Chicken</h3>
                <p>The chief ingredient in yummy food is love.</p>
                <a href="#Order Now" className="btn1" onClick={() => orderNow('Crispy Fried Chicken', 450)}>Order Now</a>
                <div className="icon">
                  <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%', paddingTop: '5px' }} onClick={() => addToCart('crispy Fried Chicken', 450,require('./index_images/g-6.jpg'))} />
                </div>
              </div>
            </div>
            <div className="box">
              <img src={require('./index_images/g-7.jpg')} alt="" />
              <div className="content">
                <h3 className='gall'>Egg Toast</h3>
                <p>The chief ingredient in yummy food is love.</p>
                <a href="#Order Now" className="btn1" onClick={() => orderNow('Egg Toast', 120)}>Order Now</a>
                <div className="icon">
                  <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%', paddingTop: '5px' }} onClick={() => addToCart('Egg Toast', 120,require('./index_images/g-7.jpg'))} />
                </div>
              </div>

            </div>
            <div className="box">
              <img src={require('./index_images/g-8.jpg')} alt="" />
              <div className="content">
                <h3 className='gall'>Chocolate</h3>
                <p>The chief ingredient in yummy food is love.</p>
                <a href="#Order Now" class="btn1" onClick={() => orderNow('Chocolate', 50)}>Order Now</a>
                <div className="icon">
                  <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%', paddingTop: '5px' }} onClick={() => addToCart('Chocolate', 50,require('./index_images/g-8.jpg'))} />
                </div>
              </div>
              </div>
              <div className="box">
              <img src={require('./index_images/samosa.jpg')} alt="" />
              <div className="content">
                <h3 className='gall'>Samosa</h3>
                <p>The chief ingredient in yummy food is love.</p>
                <a href="#Order Now" className="btn1" onClick={() => orderNow('Samosa', 40)}>Order Now</a>
                <div className="icon">
                  <img src={require('./index_images/cart.png')} alt="Add" style={{ width: '4.7rem', height: '4.7rem', borderRadius: '50%', paddingTop: '5px' }} onClick={() => addToCart('Samosa', 40,require('./index_images/samosa.jpg'))} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Healthy Tips section */}
        <section className="HealthyTips" id="HealthyTips">
          <h1 className="heading">
            <span>Healthy Tips</span>
          </h1>
          <div className="box-container">
            <div className="box">
              <img src={require('./index_images/ashok.jpg')} alt="ASHOK MITTAL" />
              <h3>ASHOK MITTAL</h3>
              <div className="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
              </div>
              <p>
                Start your morning off right with a big glass of water. After fasting all night, this first drink of water
                will help to hydrate your cells and wake you up.
              </p>
            </div>
            <div className="box">
              <img src={require('./index_images/rashmi.jpg')} alt="RASHMI MITTAL" />
              <h3>RASHMI MITTAL</h3>
              <div className="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
              </div>
              <p>Making your meals ahead of time will end up saving you plenty of time and stress in the long run!.</p>
            </div>
            <div className="box">
              <img src={require('./index_images/aman.jpg')} alt="Aman Mittal" />
              <h3>Aman Mittal</h3>
              <div className="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
              </div>
              <p>
                Sleep is an important part of health and if you don’t get enough of it, it can negatively impact your energy
                levels, motivation, concentration, and even appetite regulation.
              </p>
            </div>
          </div>
        </section>
        {/* Order Now Section */}
        <section className="Order Now" id="Order Now">
          <h1 className="heading">
            <span>Order</span> Now
          </h1>
          <div className="row">
            <div className="image">
              <img src={require('./index_images/order-img.jpg')} alt="" />
            </div>
            <form action="">
              <div className="inputBox">
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="email" />
              </div>
              <div className="inputBox">
                <input type="number" placeholder="Number" />
                <input type="text" placeholder="Food name"  value={foodNameInput}
                onChange={(e) => setFoodNameInput(e.target.value)} readOnly />
                <input type="text" placeholder="Price" value={priceInput} onChange={(e) => setPriceInput(e.target.value)}
                style={{ border: '2px solid green', color: 'green' }} readOnly />
              </div>
              <div className="inputBox">
                <input type="text" placeholder="Address" />
              </div>
              <button className="btn1" disabled={!isFormValid} 
              onClick={handlePaymentClick}>Pay</button>
            </form>
          </div>
        </section>


        {/* Footer section */}
        <section className="footer">
          <div className="share">
            <a href="https://www.instagram.com/pranav106/" className="btn1" target="_blank" rel="noreferrer">Pranav</a>
            <a href="https://www.linkedin.com/in/aman-srivastava-73113b222/" className="btn1" target="_blank" rel="noreferrer">Aman</a>
            <a href="https://instagram.com/i_m_priyanshu.09/" className="btn1" target="_blank" rel="noreferrer">Priyanshu</a>
            <a href="https://instagram.com/1up_gaurav/" className="btn1" target="_blank" rel="noreferrer">Gaurav</a>
            <a href="https://instagram.com/akshay_pratap_786/#" className="btn1" target="_blank" rel="noreferrer">Akshay</a>
          </div>
        </section>
        {/* Footer Section ends */}

      </div>
    </>
  );
}

export default Index1;
