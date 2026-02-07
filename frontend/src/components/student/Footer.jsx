import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <img src={assets.logo_dark} alt="Gurukshetra" className="h-8 w-auto mb-4" width="120" height="32" />
            <p className="text-sm leading-relaxed max-w-xs">
              Gurukshetra is a modern learning platform connecting students with expert educators worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/offered-course" className="hover:text-white transition-colors duration-200">Browse Courses</Link></li>
              <li><Link to="/my-enrollments" className="hover:text-white transition-colors duration-200">My Enrollments</Link></li>
              <li><Link to="/prof" className="hover:text-white transition-colors duration-200">Teach on Gurukshetra</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Follow Us</h4>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity duration-200">
                <img src={assets.facebook_icon} alt="Facebook" className="w-5 h-5" width="20" height="20" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity duration-200">
                <img src={assets.instagram_icon} alt="Instagram" className="w-5 h-5" width="20" height="20" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:opacity-80 transition-opacity duration-200">
                <img src={assets.twitter_icon} alt="Twitter" className="w-5 h-5" width="20" height="20" />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-800" />

        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Gurukshetra. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);