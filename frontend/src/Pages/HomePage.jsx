import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="">
      {/* Header Section */}


      {/* Hero Section */}
      <section className="relative py-20 ">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Transform Your Links. Analyze Your Data.
          </h1>
          <p className="text-lg mb-8">
            Shorten your long URLs, share effortlessly, and track every click
            with advanced analytics.
          </p>
          

        </div>
        {/* Hero Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://cdn.pixabay.com/photo/2022/04/11/05/24/blockchain-7124810_640.png"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <div className="text-center">

      <Link
            to="/login"
            className="bg-black text-center text-white px-8 py-4 text-xl font-semibold rounded shadow-lg hover:bg-gray-600 transition cursor-pointer"
          >
            Get Started
          </Link>
      </div>
      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white shadow-md rounded p-6">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/21/23/25/link-1271843_1280.png"
                alt="Short Links"
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Shorten Links</h3>
              <p>
                Generate short and shareable URLs instantly with our fast and
                reliable service.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white shadow-md rounded p-6">
              <img
                src="https://cdn.pixabay.com/photo/2024/09/04/06/55/ai-generated-9020931_640.png"
                alt="Analytics"
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Track Analytics</h3>
              <p>
                Monitor link clicks, unique visitors, and geographic locations
                in real time.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white shadow-md rounded p-6">
              <img
                src="https://cdn.pixabay.com/photo/2022/01/19/09/47/cybersecurity-6949298_640.png"
                alt="Security"
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Secure & Reliable</h3>
              <p>
                Your links are encrypted and protected with top-notch security
                features.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default HomePage;
