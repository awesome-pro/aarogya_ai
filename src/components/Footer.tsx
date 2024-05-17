import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-blue-400 text-lg mb-4">Medical App</h2>
            <p className="text-gray-400">
              <strong>Phone:</strong> +1 232 2321 4543<br />
              <strong>Email:</strong> info@medical.com
            </p>
          </div>

          <div>
            <h2 className="text-lg text-gray-400 mb-4">Quick Links</h2>
            <ul className="text-gray-400">
              <li className="pb-2"><a href="#" className="hover:text-white">About Us</a></li>
              <li className="pb-2"><a href="#" className="hover:text-white">Our Pricing</a></li>
              <li className="pb-2"><a href="#" className="hover:text-white">Our Gallery</a></li>
              <li className="pb-2"><a href="#" className="hover:text-white">Appointment</a></li>
              <li className="pb-2"><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-gray-400 mb-4">Specialties</h2>
            <ul className="text-gray-400">
              <li className="pb-2"><a href="#" className="hover:text-white">Orthology</a></li>
              <li className="pb-2"><a href="#" className="hover:text-white">Neurology</a></li>
              <li className="pb-2"><a href="#" className="hover:text-white">Dental Care</a></li>
              <li className="pb-2"><a href="#" className="hover:text-white">Opthalmology</a></li>
              <li className="pb-2"><a href="#" className="hover:text-white">Cardiology</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-gray-400 mb-4">Connect With Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:bg-gray-300 rounded-full p-2"><i className="fa fa-twitter"></i></a>
              <a href="#" className="text-white hover:bg-gray-300 rounded-full p-2"><i className="fa fa-instagram"></i></a>
              <a href="#" className="text-white hover:bg-gray-300 rounded-full p-2"><i className="fa fa-facebook"></i></a>
              <a href="#" className="text-white hover:bg-gray-300 rounded-full p-2"><i className="fa fa-youtube"></i></a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">Copyright <strong>Medical Application</strong>. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
