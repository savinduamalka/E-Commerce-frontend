import React from "react";
import Navbar from "../components/navbar";

function HomePage() {
  const categories = [
    { name: "SUV", image: "../suv.jpg" },
    { name: "Kei Car", image: "../keicar.jpg" },
    { name: "Sedan", image: "../sedan.jpg" },
    { name: "Hatchback", image: "../hatchback.jpg" },
  ];

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <header className="bg-blue-600 text-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Why Choose AutoMobile SL?</h1>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              "Quality Assurance",
              "Best Prices",
              "24/7 Support",
              "Secure Payment",
            ].map((feature) => (
              <div
                key={feature}
                className="p-6 bg-white text-blue-600 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <p className="font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Available Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-200 py-8">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Trusted Manufacturers
          </h3>
          <div className="flex space-x-10 overflow-x-auto">
            {manufacturers.map((manufacturer) => (
              <div key={manufacturer.name} className="flex-shrink-0">
                <img
                  src={manufacturer.logo}
                  alt={manufacturer.name}
                  className="h-16 object-contain"
                />
                <p className="text-center mt-2 text-gray-700">
                  {manufacturer.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
