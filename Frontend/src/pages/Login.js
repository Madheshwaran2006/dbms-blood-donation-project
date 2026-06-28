import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
<<<<<<< HEAD
import API_BASE_URL from "../api";
=======
>>>>>>> 225c65f905a4f8eb2552160748d31ad2abaa882a

function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
<<<<<<< HEAD
      const res = await axios.post(`${API_BASE_URL}/api/Login`, {
=======
      const res = await axios.post("http://localhost:8080/api/Login", {
>>>>>>> 225c65f905a4f8eb2552160748d31ad2abaa882a
        email: email,
        password: password
      });

      if (res.data.message === "Login Successful" && res.data.user_id) {
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("email", res.data.email);

        setAuth(true);
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Login Failed");
      } else if (error.request) {
        alert("Network error. Please check your connection.");
      } else {
        alert("Login Failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        // backgroundImage: "url('/Motion Made - Free Cardiogram heartbeat heat pulse glowing red neon light loop animated background.jpeg')", // Your background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Dark overlay for better readability */}
      {/* <div className="absolute inset-0 bg-black/40"></div>
       */}
      {/* Login form container */}
      <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-red-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-red-100 mt-2">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-300 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="text-center pt-4">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-red-600 hover:text-red-700 font-medium transition duration-300"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

