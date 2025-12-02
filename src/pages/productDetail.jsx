import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { api } from '../lib/api';
import { toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaArrowLeft } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        console.log('Fetched product detail:', response.data);
        // Handle response structure where data might be wrapped in a 'data' property
        const data = response.data.data || response.data;
        setProduct(data);
        // Set the main image as the initial selected image
        setSelectedImage(data.image);
      } catch (error) {
        console.error('Error fetching product details:', error);
        toast.error('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      toast.error('You need to log in to continue.', {
        style: {
          background: '#dc3545',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
      return;
    }

    try {
      await api.post('/cart', {
        items: [{ product_id: product.id, quantity: 1 }],
      });
      toast.success('Product added to cart successfully!', {
        style: {
          background: '#28a745',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart.', {
        style: {
          background: '#dc3545',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    }
  };

  const formatLKR = (amount) => {
    return `LKR ${Number(amount).toFixed(1)} M`;
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <div className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <Skeleton
                height={400}
                baseColor="#202020"
                highlightColor="#444"
              />
              <div className="flex mt-4 space-x-4">
                <Skeleton
                  width={100}
                  height={100}
                  baseColor="#202020"
                  highlightColor="#444"
                />
                <Skeleton
                  width={100}
                  height={100}
                  baseColor="#202020"
                  highlightColor="#444"
                />
                <Skeleton
                  width={100}
                  height={100}
                  baseColor="#202020"
                  highlightColor="#444"
                />
              </div>
            </div>
            <div className="text-gray-100">
              <Skeleton
                height={40}
                width="80%"
                baseColor="#202020"
                highlightColor="#444"
              />
              <Skeleton
                height={20}
                width="40%"
                className="mt-4"
                baseColor="#202020"
                highlightColor="#444"
              />
              <Skeleton
                height={100}
                className="mt-4"
                baseColor="#202020"
                highlightColor="#444"
              />
              <Skeleton
                height={50}
                width="30%"
                className="mt-8"
                baseColor="#202020"
                highlightColor="#444"
              />
              <Skeleton
                height={50}
                width="100%"
                className="mt-8"
                baseColor="#202020"
                highlightColor="#444"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <div className="container px-4 py-12 mx-auto text-center text-white">
          <h2 className="text-2xl">Product not found</h2>
        </div>
      </div>
    );
  }

  // Collect all images: main image + additional images
  // Assuming product.images is an array of objects with image_path or just strings
  // Based on seeder: ProductImage::create(['image_path' => $img])
  // So API likely returns array of objects: [{ id: 1, image_path: 'url', ... }]
  // Or maybe the API resource flattens it. I'll assume it might be an array of objects.
  // Let's handle both cases (array of strings or array of objects with image_path)

  const additionalImages = product.images || [];
  const allImages = [
    product.image,
    ...additionalImages.map((img) =>
      typeof img === 'string' ? img : img.image_path
    ),
  ].filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <div className="container px-4 py-12 mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-6 text-gray-400 transition-colors hover:text-white"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Image Gallery */}
          <div>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={selectedImage || 'https://via.placeholder.com/600'}
                alt={product.name}
                className="object-cover w-full h-96"
              />
            </div>
            <div className="flex mt-4 space-x-4 overflow-x-auto">
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product thumbnail ${index + 1}`}
                  className={`object-cover w-24 h-24 rounded-lg cursor-pointer border-2 ${
                    selectedImage === img
                      ? 'border-yellow-500'
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="text-gray-100">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="mt-2 text-sm text-gray-400">
              Category: {product.category?.name || 'Uncategorized'}
            </p>

            <div className="mt-6">
              {(product.discountedPrice || product.discounted_price) &&
              (product.discountedPrice > 0 || product.discounted_price > 0) ? (
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-yellow-400">
                    {formatLKR(
                      product.discountedPrice || product.discounted_price
                    )}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    {formatLKR(product.price)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-yellow-400">
                  {formatLKR(product.price)}
                </span>
              )}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold">Description</h3>
              <p className="mt-4 text-gray-300 whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="mt-8">
              {product.stock > 0 ? (
                <span className="px-3 py-1 text-sm font-semibold text-green-500 border border-green-500 rounded-lg">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="px-3 py-1 text-sm font-semibold text-red-500 border border-red-500 rounded-lg">
                  Out of Stock
                </span>
              )}
            </div>

            <button
              onClick={addToCart}
              className="w-full py-4 mt-8 text-lg font-bold text-black transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
