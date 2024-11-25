import React from "react";
import Navbar from "../components/navbar";

function HomePage() {
  const categories = [
    { name: "SUV", image: "https://via.placeholder.com/150" },
    { name: "Kei Car", image: "https://via.placeholder.com/150" },
    { name: "Sedan", image: "https://via.placeholder.com/150" },
    { name: "Hatchback", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <header className="bg-blue-600 text-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">
            Why Choose AutoMobile SL?
          </h1>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {["Quality Assurance", "Best Prices", "24/7 Support", "Secure Payment"].map((feature) => (
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
    </div>
  );
}

export default HomePage;
