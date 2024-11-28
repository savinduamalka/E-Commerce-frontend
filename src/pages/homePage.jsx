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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <header className="py-10 text-white bg-blue-600">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Why Choose AutoMobile SL?</h1>
          <div className="grid grid-cols-2 gap-6 mt-8 sm:grid-cols-4">
            {[
              "Quality Assurance",
              "Best Prices",
              "24/7 Support",
              "Secure Payment",
            ].map((feature) => (
              <div
                key={feature}
                className="p-6 text-blue-600 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
              >
                <p className="font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="container py-12 mx-auto">
        <h2 className="mb-10 text-3xl font-bold text-center text-gray-800">
          Available Categories
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="object-cover w-full h-40"
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

      <section className="py-8 bg-gray-200">
        <div className="container mx-auto">
          <h3 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Trusted Manufacturers
          </h3>
          <div className="flex space-x-10 overflow-x-auto">
            {manufacturers.map((manufacturer) => (
              <div key={manufacturer.name} className="flex-shrink-0">
                <img
                  src={manufacturer.logo}
                  alt={manufacturer.name}
                  className="object-contain h-16"
                />
                <p className="mt-2 text-center text-gray-700">
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
