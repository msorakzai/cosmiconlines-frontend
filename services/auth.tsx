import API from '../utils/api';

// ✅ User register karne ke liye
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (err) {
    console.error('Register error:', err.response || err);
    throw err.response?.data || { message: 'Registration failed' };
  }
};

// ✅ User login karne ke liye
export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (err) {
    console.error('Login error:', err.response || err);
    throw err.response?.data || { message: 'Login failed' };
  }
};
