import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Navbar from "../components/navbar";
import { api } from "../lib/api";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function HomePage() {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(null); // Use a single state for alert
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const manufacturers = [
    { name: "Toyota", logo: "../toyota-logo.png" },
    { name: "Nissan", logo: "../nissan-logo.png" },
    { name: "Suzuki", logo: "../suzuki-logo.png" },
    { name: "BMW", logo: "../bmw-logo.png" },
    { name: "Benz", logo: "../benz-logo.png" },
    { name: "Mazda", logo: "../mazda-logo.png" },
    { name: "Honda", logo: "../honda-logo.png" },
    { name: "Ford", logo: "../ford-logo.png" },
    { name: "Mitsubishi", logo: "../mitsubishi-logo.png" },
    { name: "KIA", logo: "../kia-logo.png" },
  ];

  const scrollRef = useRef(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    
    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1;
        
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };
    
    const interval = setInterval(scroll, 20);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/subscribe', { email });
      setAlert({ message: response.data.message, severity: "success" });
      setEmail(''); 
    } catch (error) {
      setAlert({ message: 'Subscription failed', severity: "error" });
    }
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setAlert(null); // Clear the alert
  };

  const features = [
    { title: "Quality Assurance", icon: "✓" },
    { title: "Best Prices", icon: "💰" },
    { title: "24/7 Support", icon: "🕒" },
    { title: "Secure Payment", icon: "🔒" },
  ];

  return (
    <div
      className="flex flex-col min-h-screen text-white bg-black"
      style={{
        backgroundImage: "url('/home-wallpaper.jpg')",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative py-32 overflow-hidden bg-black bg-opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-black opacity-80"></div>
        <div className="absolute inset-0 bg-[url('/luxury-car-pattern.png')] opacity-5"></div>
        
        <div className="container relative z-10 px-4 mx-auto text-center">
          <h1 className="mb-6 text-6xl font-extrabold leading-none tracking-tight text-white">
            <span className="inline-block transition-transform duration-300 transform hover:scale-105">
              Welcome to <span className="text-yellow-400">AutoMobile</span> SL
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto mb-12 text-2xl leading-relaxed text-white">
            Discover premium vehicles with unbeatable quality and prices.
          </p>
          
          <div className="grid max-w-5xl grid-cols-2 gap-8 mx-auto sm:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-8 text-white transition-all duration-500 transform bg-black border border-white rounded-xl hover:translate-y-2 hover:shadow-2xl"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`text-4xl mb-4 transition-all duration-300 ${hoveredFeature === index ? 'text-yellow-400 scale-125' : 'text-white'}`}>
                  {feature.icon}
                </div>
                <p className="text-xl font-medium">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Featured Collection Section */}
      <section className="relative py-48 bg-black bg-opacity-70">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="max-w-3xl p-10 mx-auto bg-black border border-white backdrop-blur-sm bg-opacity-30 rounded-2xl border-opacity-20">
            <h2 className="mb-6 text-5xl font-bold text-white">
              Explore Our <span className="text-yellow-400">Exclusive</span> Collection
            </h2>
            <p className="mb-8 text-xl text-white">
              Browse a wide variety of vehicles from trusted manufacturers, handpicked for quality and performance.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-10 py-4 text-lg font-semibold text-black transition-all duration-300 transform bg-yellow-400 rounded-full hover:bg-yellow-500 hover:scale-105 hover:shadow-xl"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Manufacturers Section */}
      <section className="py-20 bg-black bg-opacity-70">
        <div className="container px-4 mx-auto text-center text-white">
          <h3 className="mb-4 text-4xl font-semibold">Trusted Manufacturers</h3>
          <div className="w-24 h-1 mx-auto mb-12 bg-yellow-400"></div>
          
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent"></div>
            <div className="absolute top-0 bottom-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent"></div>
            
            <div
              ref={scrollRef}
              className="flex overflow-x-hidden no-scrollbar whitespace-nowrap"
            >
              {[...manufacturers, ...manufacturers].map((manufacturer, index) => (
                <div
                  key={index}
                  className="inline-block px-8 text-center transition-all duration-500 hover:scale-110 hover:text-yellow-400"
                >
                  <div className="flex items-center justify-center w-32 h-20 p-2 mb-3 bg-black border border-white rounded-lg border-opacity-20">
                    <img
                      src={manufacturer.logo}
                      alt={manufacturer.name}
                      className="object-contain h-16 mx-auto transition-all duration-300 filter grayscale hover:grayscale-0"
                    />
                  </div>
                  <p className="text-lg font-medium">{manufacturer.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-black border-t border-white bg-opacity-70 border-opacity-10">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="mb-6 text-3xl font-bold text-white">Stay Updated</h3>
            <p className="mb-8 text-lg text-white">
              Subscribe to our newsletter for exclusive offers and updates on new arrivals.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow max-w-md px-6 py-3 text-white bg-black border border-white rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 border-opacity-20"
              />
              <button type="submit" className="px-8 py-3 font-semibold text-black transition-all duration-300 bg-yellow-400 rounded-full hover:bg-yellow-500">
                Subscribe
              </button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              {alert && (
                <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
                  {alert.message}
                </Alert>
              )}
            </Snackbar>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-black bg-opacity-70">
        <div className="container px-4 mx-auto">
          <h3 className="mb-4 text-4xl font-semibold text-center text-white">Our Customers Say</h3>
          <div className="w-24 h-1 mx-auto mb-12 bg-yellow-400"></div>
          
          <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-6 transition-all duration-300 border border-white border-opacity-20 rounded-xl hover:border-yellow-400">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 bg-white rounded-full">
                    <span className="font-bold text-black">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">John Doe</h4>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic text-white">"Exceptional service! Found my dream car at a great price. The team was professional and made the process seamless."</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
