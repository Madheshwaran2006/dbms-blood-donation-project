import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

function DonationRecord() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    d_name: "",
    u_email: "",
    p_name: "",
    d_email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/Donated`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage("✅ Donation record submitted successfully!");
        setFormData({
          d_name: "",
          u_email: "",
          p_name: "",
          d_email: ""
        });
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setMessage("❌ Failed to submit donation record. Please try again.");
      }
    } catch (error) {
      setMessage("❌ Error submitting donation record. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl text-white">📋</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-3">
              Record Your Donation
            </h1>
            <p className="text-gray-600">
              Thank you for saving lives! Please fill in your donation details.
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl text-center font-semibold ${
              message.includes("✅") 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-red-100 text-red-800 border border-red-200"
            }`}>
              {message}
            </div>
          )}

          {/* Donation Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donor Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donor Full Name *
              </label>
              <input
                type="text"
                name="d_name"
                value={formData.d_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Enter your full name"
              />
            </div>

            {/* User Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email Address *
              </label>
              <input
                type="email"
                name="u_email"
                value={formData.u_email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Patient Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name (Who received blood) *
              </label>
              <input
                type="text"
                name="p_name"
                value={formData.p_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Enter patient's name"
              />
            </div>

            {/* Donor Email (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donor Email (if different)
              </label>
              <input
                type="email"
                name="d_email"
                value={formData.d_email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Optional: donor's email"
              />
            </div>

            {/* Auto-filled Donation Date */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Date
              </label>
              <div className="text-gray-600 bg-white px-4 py-3 rounded-lg border border-gray-300">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Donation date is automatically recorded as today's date.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Donation Record"
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Back to Dashboard
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start">
              <span className="text-blue-500 text-lg mr-3">💡</span>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Why record your donation?</h3>
                <p className="text-blue-700 text-sm">
                  Recording your donation helps us track your contributions, maintain your donor history, 
                  and recognize your life-saving efforts. Your donation record also helps hospitals 
                  and patients in future emergencies.
                </p>
              </div>
            </div>
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

export default DonationRecord;