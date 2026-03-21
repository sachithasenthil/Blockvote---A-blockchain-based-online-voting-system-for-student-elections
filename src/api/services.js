import api from './axios';

// Authentication Services
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Candidate Services
export const candidateService = {
  getAll: async () => {
    const response = await api.get('/candidates');
    return response.data;
  },

  add: async (candidateData) => {
    const response = await api.post('/candidates', candidateData);
    return response.data;
  }
};

// Voting Services
export const votingService = {
  castVote: async (candidate) => {
    const response = await api.post('/voting/vote', { candidate });
    return response.data;
  },

  getResults: async () => {
    const response = await api.get('/voting/results');
    return response.data;
  },

  getBlockchain: async () => {
    const response = await api.get('/voting/blockchain');
    return response.data;
  },

  validateChain: async () => {
    const response = await api.get('/voting/validate');
    return response.data;
  }
};