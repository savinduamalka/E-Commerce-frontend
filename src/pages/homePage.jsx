import React from "react";
import Navbar from "../components/navbar";

function HomePage() {
  const manufacturers = [
    { name: "Toyota", logo: "../toyota-logo.png" },
    { name: "Nissan", logo: "../nissan-logo.png" },
    { name: "Suzuki", logo: "../suzuki-logo.png" },
    { name: "BMW", logo: "../bmw-logo.png" },
    { name: "Benz", logo: "../benz-logo.png" },
    { name: "Mazda", logo: "../mazda-logo.png" },
    { name: "Honda", logo: "../honda-logo.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Gradient Overlay */}
      <header className="relative py-20 text-white bg-blue-600">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="container relative z-10 mx-auto text-center">
          <h1 className="mb-4 text-5xl font-extrabold leading-tight">
            Why Choose AutoMobile SL?
          </h1>
          <p className="mb-12 text-xl">
            The best place to find reliable vehicles at the most competitive prices with exceptional service.
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {["Quality Assurance", "Best Prices", "24/7 Support", "Secure Payment"].map((feature) => (
              <div
                key={feature}
                className="p-6 text-blue-600 transition-shadow duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
              >
                <p className="text-lg font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Wallpaper Section with Gradual Blue Mix and Smooth Transition */}
      <section
        className="relative py-40 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/home-wallpaper.jpg')",
          backgroundPosition: "center center",
          backgroundSize: "cover", // Ensures wallpaper is always fully visible
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-700 to-transparent opacity-80"></div>
        <div className="container relative z-10 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-semibold text-white">
            Browse Our Exclusive Collection
          </h2>
          <p className="mb-6 text-lg text-white">
            Explore a wide variety of vehicles from trusted manufacturers.
          </p>
        </div>
      </section>

      {/* Trusted Manufacturers Section with Beautiful Gradient Blue Background */}
      <section className="py-6 bg-gradient-to-r from-blue-500 to-blue-700">
        <div className="container mx-auto text-center text-white">
          <h3 className="mb-4 text-3xl font-semibold">Trusted Manufacturers</h3>
          <div className="flex pb-4 space-x-10 overflow-x-auto">
            {manufacturers.map((manufacturer) => (
              <div key={manufacturer.name} className="flex-shrink-0 px-4">
                <img
                  src={manufacturer.logo}
                  alt={manufacturer.name}
                  className="object-contain h-16 transition-transform duration-300 hover:scale-110"
                />
                <p className="mt-2 font-medium text-white">{manufacturer.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
