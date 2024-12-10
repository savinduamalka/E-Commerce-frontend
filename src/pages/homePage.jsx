import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../components/navbar";

function HomePage() {
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

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const scroll = () => {
      if (scrollContainer) {
        // Move the scroll position slightly to the right
        scrollContainer.scrollLeft += 1;

        // If the scroll position reaches the end, reset it to the beginning
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth / 2 // Reset when the first copy ends
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 20); // Smooth scrolling speed

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <header className="relative py-20 text-white bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-800 to-black"></div>
        <div className="container relative z-10 mx-auto text-center">
          <h1 className="mb-4 text-5xl font-extrabold leading-tight text-gray-100">
            Welcome to AutoMobile SL
          </h1>
          <p className="mb-12 text-xl text-gray-300">
            Discover premium vehicles with unbeatable quality and prices.
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              "Quality Assurance",
              "Best Prices",
              "24/7 Support",
              "Secure Payment",
            ].map((feature) => (
              <div
                key={feature}
                className="p-6 text-white transition-shadow duration-300 transform bg-gray-900 rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
              >
                <p className="text-lg font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section
        className="relative py-40 bg-center bg-cover"
        style={{
          backgroundImage: "url('/home-wallpaper.jpg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-transparent"></div>
        <div className="container relative z-10 mx-auto text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-100">
            Explore Our Exclusive Collection
          </h2>
          <p className="mb-6 text-lg text-gray-300">
            Browse a wide variety of vehicles from trusted manufacturers.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 text-lg font-semibold text-black bg-yellow-400 rounded hover:bg-yellow-500"
          >
            Shop Now
          </button>
        </div>
      </section>

      <section className="py-10 bg-black">
        <div className="container mx-auto text-center text-gray-100">
          <h3 className="mb-8 text-3xl font-semibold">Trusted Manufacturers</h3>
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden no-scrollbar whitespace-nowrap"
          >
            {[...manufacturers, ...manufacturers].map((manufacturer, index) => (
              <div
                key={index}
                className="inline-block px-6 text-center transition-transform duration-300 hover:scale-110"
              >
                <img
                  src={manufacturer.logo}
                  alt={manufacturer.name}
                  className="object-contain h-16 mx-auto mb-2"
                />
                <p className="text-lg">{manufacturer.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
