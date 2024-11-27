import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Navbar from "../components/navbar";

function Contact() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="py-10 text-white bg-blue-600">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">We’d love to hear from you!</p>
        </div>
      </header>

      <section className="container px-6 py-12 mx-auto lg:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-blue-600">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-xl text-blue-600" />
                <span className="text-lg text-gray-700">+94 77 123 4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-xl text-blue-600" />
                <span className="text-lg text-gray-700">
                  support@automobilesl.com
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-xl text-blue-600" />
                <span className="text-lg text-gray-700">
                13, 17 CDL Fernando Mawatha, Katugastota
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <FaFacebookF className="text-xl text-blue-600" />
                <a
                  href="https://www.facebook.com/autolankakandy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Follow us on Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31658.908227994318!2d80.60691863669453!3d7.312995699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae36876015d7fad%3A0x6955c4f5b78ddb64!2sAUTO%20LANKA%20(PVT)%20LTD.!5e0!3m2!1sen!2slk!4v1732730356553!5m2!1sen!2slk"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      <footer className="py-6 text-white bg-blue-600">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} AutoMobile SL. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}

export default Contact;
