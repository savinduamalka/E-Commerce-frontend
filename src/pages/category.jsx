import React from 'react';
import Navbar from '../components/navbar';
import { api } from '../lib/api';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useQuery } from '@tanstack/react-query';

function Category() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then((res) => res.data),
    staleTime: 300000, // 5 minutes
  });

  const categories = data?.data || [];

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <div
        className="container px-4 py-12 mx-auto"
        style={{
          backgroundImage: 'url("/home-wallpaper.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-100">
          Categories
        </h1>

        {isPending && (
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden bg-gray-900 rounded-lg shadow-lg"
                >
                  <Skeleton height={160} />
                  <div className="p-4">
                    <Skeleton height={24} width="80%" />
                    <Skeleton height={16} width="60%" className="mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </SkeletonTheme>
        )}

        {isError && (
          <p className="text-center text-red-500">
            Failed to load categories. Please try again later.
          </p>
        )}

        {!isPending && categories.length === 0 && (
          <p className="text-center text-gray-300">No categories found.</p>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="overflow-hidden transition-transform duration-300 bg-gray-900 rounded-lg shadow-lg hover:scale-105"
            >
              <img
                src={category.image || 'https://via.placeholder.com/150'}
                alt={category.name}
                className="object-cover w-full h-40"
              />
              <div className="p-4 text-gray-100">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="mt-2 text-gray-400">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
