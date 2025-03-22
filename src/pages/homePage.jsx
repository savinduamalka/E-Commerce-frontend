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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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

  // Sri Lankan testimonials data
  const testimonials = [
    { 
      initials: "RK", 
      name: "Ravindu Karunanayake", 
      location: "Colombo",
      rating: 5, 
      text: "Found a perfect Toyota Prius at an unbeatable price. The staff was very helpful throughout the process and even assisted with leasing options. Highly recommended!" 
    },
    { 
      initials: "SP", 
      name: "Samanthi Perera", 
      location: "Kandy",
      rating: 5, 
      text: "Being a first-time car buyer, I was nervous about making the right choice. The team at AutoMobile SL guided me to a reliable Suzuki that fits my budget perfectly." 
    },
    { 
      initials: "MA", 
      name: "Mohammed Anwar", 
      location: "Galle",
      rating: 4, 
      text: "I was looking for a family vehicle with good fuel efficiency for my drives between Galle and Colombo. Found an excellent Honda that has been serving me well for months now." 
    },
    { 
      initials: "DW", 
      name: "Dilshan Weerasinghe", 
      location: "Negombo",
      rating: 5, 
      text: "After searching for weeks, I finally found my dream BMW through AutoMobile SL. The import process was smooth, and they handled all the customs clearance professionally." 
    },
    { 
      initials: "TS", 
      name: "Tharushi Silva", 
      location: "Matara",
      rating: 4, 
      text: "I had specific requirements for a fuel-efficient hybrid, and the staff at AutoMobile SL found me the perfect Nissan Leaf. The buying process was hassle-free!" 
    },
    { 
      initials: "VK", 
      name: "Vishal Kumar", 
      location: "Jaffna",
      rating: 5, 
      text: "Needed a commercial van for my business, and AutoMobile SL helped me get a great deal on a Toyota HiAce. Excellent service and quick documentation!" 
    },
    { 
      initials: "AS", 
      name: "Amali Senanayake", 
      location: "Kurunegala",
      rating: 5, 
      text: "Fantastic experience! Bought a Honda Civic, and the team handled everything from financing to insurance. Highly satisfied with their service." 
    },
    { 
      initials: "NP", 
      name: "Nuwan Perera", 
      location: "Anuradhapura",
      rating: 4, 
      text: "AutoMobile SL has a great selection of vehicles. Found a reliable Toyota Axio that’s been perfect for my daily commute. Would definitely recommend!" 
    }
];


  const scrollRef = useRef(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Auto-scroll for manufacturers
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/subscribe", { email });
      setAlert({ message: response.data.message, severity: "success" });
      setEmail('');
    } catch (error) {
      setAlert({ message: 'Subscription failed', severity: "error" });
      console.log(error);
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

      {/* Testimonials Section with Slider */}
      <section className="py-16 bg-black bg-opacity-70">
        <div className="container px-4 mx-auto">
          <h3 className="mb-4 text-4xl font-semibold text-center text-white">Our Customers Say</h3>
          <div className="w-24 h-1 mx-auto mb-12 bg-yellow-400"></div>

          <div className="relative max-w-4xl mx-auto overflow-hidden">
            {/* Slider controls */}
            <div className="absolute inset-y-0 left-0 z-10 flex items-center">
              <button 
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="flex items-center justify-center w-10 h-10 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 focus:outline-none"
                aria-label="Previous testimonial"
              >
                &#10094;
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 z-10 flex items-center">
              <button 
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="flex items-center justify-center w-10 h-10 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 focus:outline-none"
                aria-label="Next testimonial"
              >
                &#10095;
              </button>
            </div>

            {/* Slider */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="min-w-full px-4"
                  >
                    <div className="max-w-lg p-6 mx-auto transition-all duration-300 border border-white border-opacity-20 rounded-xl hover:border-yellow-400">
                      <div className="flex items-center mb-4">
                        <div className="flex items-center justify-center w-12 h-12 mr-4 bg-white rounded-full">
                          <span className="font-bold text-black">{testimonial.initials}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{testimonial.name}</h4>
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, star) => (
                              <span key={star} className="text-yellow-400">★</span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-300">{testimonial.location}</p>
                        </div>
                      </div>
                      <p className="italic text-white">"{testimonial.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full focus:outline-none ${
                    currentTestimonial === index ? 'bg-yellow-400' : 'bg-white bg-opacity-30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
