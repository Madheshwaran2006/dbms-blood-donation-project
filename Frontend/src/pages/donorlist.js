import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
<<<<<<< HEAD
import API_BASE_URL from "../api";
=======
>>>>>>> 225c65f905a4f8eb2552160748d31ad2abaa882a

function DonorList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifying, setNotifying] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState("");
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useState({
    bloodGroup: "",
    location: ""
  });

  useEffect(() => {
    const storedData = localStorage.getItem("bloodRequestData");
    
    if (location.state) {
      setSearchParams({
        bloodGroup: location.state.bloodGroup,
        location: location.state.location
      });
      fetchDonors(location.state.bloodGroup, location.state.location);
    } else if (storedData) {
      const requestData = JSON.parse(storedData);
      setSearchParams({
        bloodGroup: requestData.bloodGroup,
        location: requestData.location
      });
      fetchDonors(requestData.bloodGroup, requestData.location);
    } else {
      setError("No search parameters found. Please submit a blood request first.");
      setLoading(false);
    }
  }, [location]);

  const fetchDonors = async (bloodGroup, location) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
<<<<<<< HEAD
        `${API_BASE_URL}/api/DonorList/${bloodGroup}/${location}`,
=======
        `http://localhost:8080/api/DonorList/${bloodGroup}/${location}`,
>>>>>>> 225c65f905a4f8eb2552160748d31ad2abaa882a
        { timeout: 10000 }
      );
      setDonors(response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
      setError("Failed to fetch donors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNotifyDonors = async () => {
    try {
      setNotifying(true);
      setNotificationStatus("📧 Sending email notifications to all donors...");
      
      const storedData = localStorage.getItem("bloodRequestData");
      if (!storedData) {
        throw new Error("No request data found. Please submit a blood request first.");
      }

      const requestData = JSON.parse(storedData);
      
      // Prepare the notification request EXACTLY as your backend expects
      const notifyRequest = {
        bloodGroup: searchParams.bloodGroup, // Search blood group (e.g., "A+")
        location: searchParams.location,     // Search location (e.g., "Chrompet")
        requestDetails: {
          patientName: requestData.patientName,
          patientAge: requestData.patientAge,
          bloodGroup: requestData.bloodGroup, // Original request blood group
          unitsRequired: requestData.unitsRequired,
          hospitalName: requestData.hospitalName,
          hospitalAddress: requestData.hospitalAddress,
          location: requestData.location,     // Original request location
          requiredDate: requestData.requiredDate,
          requesterName: requestData.requesterName,
          requesterPhone: requestData.requesterPhone
        }
      };

      console.log("Sending notification request:", notifyRequest);

      // Call your backend notification endpoint
      const response = await axios.post(
<<<<<<< HEAD
        `${API_BASE_URL}/api/NotifyDonors`,
=======
        "http://localhost:8080/api/NotifyDonors",
>>>>>>> 225c65f905a4f8eb2552160748d31ad2abaa882a
        notifyRequest,
        {
          timeout: 60000,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("Backend response:", response.data);

      if (response.data.message) {
        setNotificationStatus(`✅ ${response.data.message}`);
      } else {
        throw new Error("Notification failed");
      }
      
    } catch (error) {
      console.error("Error notifying donors:", error);
      if (error.code === 'ECONNABORTED') {
        setNotificationStatus("⚠️ Email sending is taking longer than expected.");
      } else if (error.response && error.response.data) {
        setNotificationStatus(`❌ ${error.response.data.error || error.response.data}`);
      } else {
        setNotificationStatus(`❌ ${error.message}`);
      }
    } finally {
      setNotifying(false);
      setTimeout(() => setNotificationStatus(""), 8000);
    }
  };

  const handleSearchManual = (e) => {
    e.preventDefault();
    if (searchParams.bloodGroup && searchParams.location) {
      fetchDonors(searchParams.bloodGroup, searchParams.location);
    }
  };

  const handleCallDonor = (phone) => {
    window.open(`tel:${phone}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Finding available donors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Available Donors</h1>
              <p className="text-gray-600 mt-2">
                Blood Group: <span className="font-semibold text-red-600">{searchParams.bloodGroup}</span> | 
                Location: <span className="font-semibold text-blue-600">{searchParams.location}</span>
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Found {donors.length} donor{donors.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleNotifyDonors}
                disabled={notifying || donors.length === 0}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition duration-300 ${
                  notifying || donors.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {notifying ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Emails...
                  </span>
                ) : (
                  `📧 Notify All Donors (${donors.length})`
                )}
              </button>
              
              <button
                onClick={() => navigate("/request-blood")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                New Request
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
              >
                Dashboard
              </button>
            </div>
          </div>

          {notificationStatus && (
            <div className={`mt-4 p-4 rounded-lg ${
              notificationStatus.includes("❌") || notificationStatus.includes("Failed")
                ? "bg-red-50 border border-red-200 text-red-700"
                : "bg-green-50 border border-green-200 text-green-700"
            }`}>
              {notificationStatus}
            </div>
          )}
        </div>

        {/* Manual Search */}
        {/* <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Donors Manually</h3>
          <form onSubmit={handleSearchManual} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              <select
                value={searchParams.bloodGroup}
                onChange={(e) => setSearchParams(prev => ({...prev, bloodGroup: e.target.value}))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={searchParams.location}
                onChange={(e) => setSearchParams(prev => ({...prev, location: e.target.value}))}
                placeholder="Enter location"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300"
              >
                Search Donors
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )} */}

        {/* Donors List */}
        {donors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((donor, index) => (
              <div key={donor.id || index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{donor.name || "Unknown Donor"}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      donor.availabilityStatus 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {donor.availabilityStatus ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Blood Group:</span>
                      <span className="font-semibold text-red-600">{donor.bloodGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Age:</span>
                      <span>{donor.age || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gender:</span>
                      <span>{donor.gender || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-medium">{donor.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-medium">{donor.phone || donor.phone_no}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="text-blue-600 truncate">{donor.email}</span>
                    </div>
                    {donor.lastDonationDate && (
                      <div className="flex justify-between">
                        <span>Last Donation:</span>
                        <span>{new Date(donor.lastDonationDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleCallDonor(donor.phone || donor.phone_no)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                    >
                      📞 Call Donor
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Donors Found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any donors matching your criteria in {searchParams.location}.
            </p>
            <p className="text-gray-500 text-sm">
              Try searching in a nearby location or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DonorList;