import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, googleSignIn, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setError('');
    
    try {
      setLoading(true);
      await login(email, password);
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      navigate('/'); // Redirect to home page after successful Google sign-in
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-[#121723]">
      <div className="max-w-60% w-80% mx-auto bg-[#1a202e] rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Sign In to WatchWise
        </h2>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-6 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full">
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#232b3e] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          
          <div className="w-full">
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#232b3e] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              {/* <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-600 rounded"
              /> */}
              {/* <label htmlFor="remember-me" className="mr-10 block text-center text-gray-300">
                Remember me
              </label> */}
            </div>
            
            <div className="text-sm">
              <Link to="/forgot-password" className="text-blue-500 text-center hover:text-blue-400">
                Forgot password?
              </Link>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-md transition-colors"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="flex items-center my-6 w-full">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-4 text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>
        
        <button 
          onClick={handleGoogleSignIn} 
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-md transition-colors flex items-center justify-center"
          disabled={loading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>
        
        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;