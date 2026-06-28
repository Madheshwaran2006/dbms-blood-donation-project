import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    navigate("/");
  };

  // Function to handle donation record
  const handleDonationRecord = () => {
    // You can navigate to a donation record form or open a modal
    navigate("/donation-record");
    
    // Alternatively, you could open a modal or form directly here
    // For now, I'll assume you want to navigate to a new page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Floating Blood Cells Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + i * 5}s`
            }}
          >
            <div className="w-4 h-4 bg-red-200 rounded-full opacity-60"></div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-4xl border border-white/20">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl text-white">🩸</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
              LifeFlow Dashboard
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Join us in saving lives. Every donation matters, every request counts.
            </p>
          </div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Request Blood Card */}
            <div
              onClick={() => navigate("/request-blood")}
              className="group cursor-pointer relative bg-gradient-to-br from-white to-red-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-red-100 hover:border-red-200"
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              {/* Icon Container */}
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300 shadow-md">
                <span className="text-3xl text-red-600 group-hover:scale-110 transition-transform duration-300">🩸</span>
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-700 transition-colors duration-300">
                  Request Blood
                </h2>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Submit a blood request and connect with verified donors in your area quickly and securely.
                </p>
                
                {/* Action Button */}
                <div className="mt-6 inline-flex items-center space-x-2 text-red-600 font-semibold group-hover:text-red-700 transition-colors duration-300">
                  <span>Get Started</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </div>

            {/* Register as Donor Card */}
            <div
              onClick={() => navigate("/register-donor")}
              className="group cursor-pointer relative bg-gradient-to-br from-white to-red-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-red-100 hover:border-red-200"
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              {/* Icon Container */}
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300 shadow-md">
                <span className="text-3xl text-red-600 group-hover:scale-110 transition-transform duration-300">💉</span>
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-700 transition-colors duration-300">
                  Become a Donor
                </h2>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Join our community of life-savers and help patients in critical need of blood donations.
                </p>
                
                {/* Action Button */}
                <div className="mt-6 inline-flex items-center space-x-2 text-red-600 font-semibold group-hover:text-red-700 transition-colors duration-300">
                  <span>Register Now</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </div>

            {/* Donation Record Card - NEW */}
            <div
              onClick={handleDonationRecord}
              className="group cursor-pointer relative bg-gradient-to-br from-white to-red-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-red-100 hover:border-red-200"
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              {/* Icon Container */}
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300 shadow-md">
                <span className="text-3xl text-red-600 group-hover:scale-110 transition-transform duration-300">📋</span>
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-700 transition-colors duration-300">
                  Donation Record
                </h2>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Record your blood donation to help us track your contributions and maintain your donor history.
                </p>
                
                {/* Action Button */}
                <div className="mt-6 inline-flex items-center space-x-2 text-red-600 font-semibold group-hover:text-red-700 transition-colors duration-300">
                  <span>Record Now</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600">50K+</div>
                <div className="text-sm text-gray-500">Lives Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">25K+</div>
                <div className="text-sm text-gray-500">Active Donors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">100+</div>
                <div className="text-sm text-gray-500">Cities</div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Add CSS for the floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;