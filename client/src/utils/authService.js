import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import axios from 'axios';

// Set up axios interceptor for auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  // Sign up new user
  async signUp(email, password, userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with name
      if (userData.name) {
        await updateProfile(user, { displayName: userData.name });
      }
      
      // Get ID token
      const token = await user.getIdToken();
      
      // Store token in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userType', userData.userType);
      
      return { user, token };
    } catch (error) {
      throw error;
    }
  },

  // Sign in existing user
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get ID token
      const token = await user.getIdToken();
      
      // Store token in localStorage
      localStorage.setItem('authToken', token);
      
      return { user, token };
    } catch (error) {
      throw error;
    }
  },

  // Sign out user
  async signOut() {
    try {
      await signOut(auth);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
    } catch (error) {
      throw error;
    }
  },

  // Get current auth token
  getToken() {
    return localStorage.getItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }
};

