import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import API_BASE_URL from "../api";
=======
>>>>>>> 225c65f905a4f8eb2552160748d31ad2abaa882a

function RequestBlood() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    requesterName: "",
    requesterPhone: "",
    requesterEmail: "",
    patientName: "",
    patientAge: "",
    patientGender: "",
    bloodGroup: "",
    unitsRequired: 1,
    requiredDate: "",
    hospitalName: "",
    hospitalAddress: "",
    location: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.requesterName.trim()) errors.requesterName = "Requester name required";
    if (!formData.requesterPhone || !/^\d{10}$/.test(formData.requesterPhone)) {
      errors.requesterPhone = "Valid 10-digit phone number required";
    }
    if (!formData.patientName.trim()) errors.patientName = "Patient name required";
    if (!formData.patientAge || formData.patientAge < 0 || formData.patientAge > 120) {
      errors.patientAge = "Valid patient age required (0-120)";
    }
    if (!formData.patientGender) errors.patientGender = "Patient gender required";
    if (!formData.bloodGroup) errors.bloodGroup = "Blood group required";
    if (!formData.unitsRequired || formData.unitsRequired < 1) {
      errors.unitsRequired = "At least 1 unit required";
    }
    if (!formData.requiredDate) errors.requiredDate = "Required date is mandatory";
    if (!formData.hospitalName.trim()) errors.hospitalName = "Hospital name required";
    if (!formData.hospitalAddress.trim()) errors.hospitalAddress = "Hospital address required";
    if (!formData.location.trim()) errors.location = "Location required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const requestData = {
        requesterName: formData.requesterName,
        requesterPhone: formData.requesterPhone,
        requesterEmail: formData.requesterEmail || "",
        patientName: formData.patientName,
        patientAge: parseInt(formData.patientAge),
        patientGender: formData.patientGender,
        bloodGroup: formData.bloodGroup,
        unitsRequired: parseInt(formData.unitsRequired),
        requiredDate: formData.requiredDate,
        hospitalName: formData.hospitalName,
        hospitalAddress: formData.hospitalAddress,
        location: formData.location,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      const response = await axios.post(
<<<<<<< HEAD
        `${API_BASE_URL}/api/Requester`,
=======
        "http://localhost:8080/api/Requester",
>>>>>>> 225c65f905a4f8eb2552160748d31ad2abaa882a
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data === "Registered and notified") {
        // Store COMPLETE data for donor list page and notifications
        const storageData = {
          // All fields needed for notifications
          requesterName: formData.requesterName,
          requesterPhone: formData.requesterPhone,
          requesterEmail: formData.requesterEmail || "",
          patientName: formData.patientName,
          patientAge: formData.patientAge,
          patientGender: formData.patientGender,
          bloodGroup: formData.bloodGroup,
          unitsRequired: formData.unitsRequired,
          requiredDate: formData.requiredDate,
          hospitalName: formData.hospitalName,
          hospitalAddress: formData.hospitalAddress,
          location: formData.location,
          searchTimestamp: new Date().getTime()
        };

        console.log("Storing in localStorage:", storageData);
        localStorage.setItem("bloodRequestData", JSON.stringify(storageData));
        
        // Navigate directly to donor list page
        navigate("/donor-list", { 
          state: { 
            bloodGroup: formData.bloodGroup, 
            location: formData.location,
            fromRequest: true
          }
        });
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Request error:", error);
      if (error.response && error.response.data) {
        setApiError(error.response.data.message || "Request failed");
      } else if (error.message) {
        setApiError(error.message);
      } else if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
        setApiError("Cannot connect to server. Please make sure backend is running.");
      } else {
        setApiError("Request failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="bg-red-600 p-6 text-center">
            <h2 className="text-3xl font-bold text-white">Blood Request Form</h2>
            <p className="text-red-100 mt-2">Submit your blood requirement details</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {apiError}
              </div>
            )}

            {/* Requester Details Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Requester Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Requester Name *
                  </label>
                  <input
                    type="text"
                    name="requesterName"
                    value={formData.requesterName}
                    onChange={handleChange}
                    placeholder="Enter requester's full name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formErrors.requesterName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.requesterName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.requesterName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="requesterPhone"
                    value={formData.requesterPhone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formErrors.requesterPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.requesterPhone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.requesterPhone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="requesterEmail"
                    value={formData.requesterEmail}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Patient Details Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient's full name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formErrors.patientName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.patientName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.patientName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Patient Age *
                  </label>
                  <input
                    type="number"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleChange}
                    placeholder="Enter age"
                    min="0"
                    max="120"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formErrors.patientAge ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.patientAge && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.patientAge}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Patient Gender *
                  </label>
                  <select
                    name="patientGender"
                    value={formData.patientGender}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formErrors.patientGender ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.patientGender && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.patientGender}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Blood Group Required *
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formErrors.bloodGroup ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                  {formErrors.bloodGroup && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.bloodGroup}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Units Required *
                  </label>
                  <input
                    type="number"
                    name="unitsRequired"
                    value={formData.unitsRequired}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formErrors.unitsRequired ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.unitsRequired && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.unitsRequired}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Required By Date *
                  </label>
                  <input
                    type="date"
                    name="requiredDate"
                    value={formData.requiredDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formErrors.requiredDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.requiredDate && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.requiredDate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Hospital Details Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Hospital Details</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    placeholder="Enter hospital name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formErrors.hospitalName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.hospitalName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.hospitalName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Hospital Address *
                  </label>
                  <textarea
                    name="hospitalAddress"
                    value={formData.hospitalAddress}
                    onChange={handleChange}
                    placeholder="Enter complete hospital address"
                    rows="3"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formErrors.hospitalAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.hospitalAddress && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.hospitalAddress}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Location/City *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter city or area"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formErrors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.location && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-4 rounded-lg font-semibold text-white transition duration-300 ${
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
                  Submitting Request...
                </span>
              ) : (
                'Submit Blood Request'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestBlood;