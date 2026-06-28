import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

function RegisterDonor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    gender: "",
    phone_no: "",
    email: "",
    location: "",
    lastDonationDate: "",
    dob: "",
    availabilityStatus: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState("");

  // Load logged-in user from localStorage
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (!user_id) {
      setApiError("Please log in to register as donor.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    setCurrentUser({
      userId: user_id,
      username,
      email
    });

    // Pre-fill name and email with user data
    if (username) {
      setFormData(prev => ({
        ...prev,
        name: username,
        email: email || ""
      }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate required fields
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name required";
    if (!formData.bloodGroup) errors.bloodGroup = "Blood group required";
    if (!formData.gender) errors.gender = "Gender required";
    if (!formData.phone_no || !/^\d{10}$/.test(formData.phone_no)) {
      errors.phone_no = "Valid 10-digit phone number required";
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Valid email address required";
    }
    if (!formData.location.trim()) errors.location = "Location required";
    if (!formData.dob) errors.dob = "Date of birth required";
    
    // Age validation
    if (formData.dob) {
      const age = calculateAge(formData.dob);
      if (age < 18) errors.dob = "You must be 18+ to register as donor";
      if (age > 65) errors.dob = "Maximum age for donation is 65 years";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateAge = (dob) => {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!currentUser || !currentUser.userId) {
      setApiError("Please log in to register.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const donorData = {
        // Match the field names expected by your backend donors entity
        name: formData.name,
        bloodGroup: formData.bloodGroup,
        gender: formData.gender,
        phone_no: formData.phone_no.replace(/\D/g, ""),
        email: formData.email,
        location: formData.location,
        lastDonationDate: formData.lastDonationDate || null,
        dob: formData.dob,
        availabilityStatus: formData.availabilityStatus
      };

      console.log("Sending donor data:", donorData);
      console.log("User ID:", currentUser.userId);

      const response = await axios.post(
        `${API_BASE_URL}/api/Donors/${currentUser.userId}`,
        donorData, 
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("Response received:", response.data);

      if (response.data.message === "Donor registered successfully") {
        setShowSuccess(true);
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data) {
        setApiError(error.response.data.message || "Registration failed");
      } else if (error.message) {
        setApiError(error.message);
      } else if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
        setApiError("Cannot connect to server. Please make sure backend is running on localhost:8080");
      } else {
        setApiError("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 py-8 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="bg-green-600 p-8 text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Registration Completed!</h2>
              <p className="text-green-100">Thank you for registering as a blood donor.</p>
            </div>
            
            <div className="p-8 text-center">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Donor Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blood Group:</span>
                    <span className="font-medium text-red-600">{formData.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{formData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">Active Donor</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleBackToDashboard}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-300"
                >
                  Back to Dashboard
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Thank you!</strong> You can now be contacted by people in need of {formData.bloodGroup} blood in {formData.location}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white py-8 px-4">
      <div className="p-8 w-full max-w-2xl bg-white rounded-3xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Donor Registration</h1>
          <p className="text-gray-600">Complete your donor profile</p>
          <p className="text-sm text-gray-500 mt-1">
            Registered as: {currentUser.username}
          </p>
        </div>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Full Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  formErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Date of Birth *</label>
              <input 
                type="date" 
                name="dob" 
                value={formData.dob} 
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  formErrors.dob ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.dob && <p className="text-red-500 text-sm mt-1">{formErrors.dob}</p>}
              {formData.dob && !formErrors.dob && (
                <p className="text-gray-500 text-sm mt-1">Age: {calculateAge(formData.dob)} years</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Blood Group *</label>
              <select 
                name="bloodGroup" 
                value={formData.bloodGroup} 
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  formErrors.bloodGroup ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
              {formErrors.bloodGroup && <p className="text-red-500 text-sm mt-1">{formErrors.bloodGroup}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Gender *</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  formErrors.gender ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.gender && <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number *</label>
              <input 
                type="tel" 
                name="phone_no" 
                value={formData.phone_no} 
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  formErrors.phone_no ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.phone_no && <p className="text-red-500 text-sm mt-1">{formErrors.phone_no}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email Address *</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Location *</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange}
              placeholder="Enter your city and state"
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                formErrors.location ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.location && <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Last Donation Date (if any)</label>
            <input 
              type="date" 
              name="lastDonationDate" 
              value={formData.lastDonationDate} 
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <p className="text-gray-500 text-sm mt-1">Leave blank if you haven't donated before</p>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <input 
              type="checkbox" 
              name="availabilityStatus" 
              checked={formData.availabilityStatus}
              onChange={handleChange}
              className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
            />
            <span className="text-gray-700 font-medium">I am currently available for blood donation</span>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-300 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              'Register as Donor'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterDonor;