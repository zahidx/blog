'use client';

import React from 'react';

const MapPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      {/* Map Section */}
      <section className="w-full max-w-5xl p-4 sm:p-6 md:p-10">
        <div className="bg-gradient-to-r from-[#0E1628] to-[#380643] dark:bg-gradient-to-r dark:from-[#0f2027] dark:to-[#2c5364] p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl transition-all duration-300 animate__animated animate__fadeInRight">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-500 dark:text-yellow-400 text-center mb-4 sm:mb-6">
            Find Me Here
          </h2>
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.46959398565!2d90.10782883625214!3d23.7805273185772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1737992497326!5m2!1sen!2sus"
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] border-none"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MapPage;
