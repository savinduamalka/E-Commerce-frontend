import React from "react";
import Navbar from "../components/navbar";

function Category() {
  const categories = [
    { name: "SUV", image: "../suv.jpg" },
    { name: "Kei Car", image: "../keicar.jpg" },
    { name: "Sedan", image: "../sedan.jpg" },
    { name: "Hatchback", image: "../hatchback.jpg" },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-12">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          Categories
        </h1>
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
      </div>
    </>
  );
}

export default Category;