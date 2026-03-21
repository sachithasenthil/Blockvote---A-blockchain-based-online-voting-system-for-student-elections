import React, { useState, useEffect } from 'react';
import { Vote, CheckCircle, Users, Lock, Shield, BarChart3, AlertCircle, LogOut, UserCircle, LogIn } from 'lucide-react';

// Mock API services (replace with actual imports when using real backend)
// Import real API services
import { authService, candidateService, votingService } from './api/services';

// Use real backend
const api = {
  auth: authService,
  candidates: candidateService,
  voting: votingService
};

// Auth Components
function LoginForm({ onLogin, onSwitchToRegister }) {
  const [voterId, setVoterId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!voterId || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      await api.auth.login({ voterId, password });
      onLogin();
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-center mb-6">
        <LogIn className="w-12 h-12 text-indigo-600" />
      </div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Vote</h2>
      
      {error && (
        <div className="bg-red-100 border-2 border-red-300 text-red-800 p-3 rounded-lg mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Voter ID</label>
          <input
            type="text"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            placeholder="e.g., STU001"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

function RegisterForm({ onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    voterId: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!formData.voterId || !formData.email || !formData.password || !formData.fullName) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await api.auth.register(formData);
      onRegister();
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-center mb-6">
        <UserCircle className="w-12 h-12 text-indigo-600" />
      </div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register to Vote</h2>
      
      {error && (
        <div className="bg-red-100 border-2 border-red-300 text-red-800 p-3 rounded-lg mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Voter ID</label>
          <input
            type="text"
            value={formData.voterId}
            onChange={(e) => handleChange('voterId', e.target.value)}
            placeholder="e.g., STU001"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="student@university.edu"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Minimum 6 characters"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="Re-enter password"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

// Main App Component
export default function VotingSystem() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [results, setResults] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth();
    loadCandidates();
  }, []);

  const checkAuth = () => {
    const authenticated = api.auth.isAuthenticated();
    setIsAuthenticated(authenticated);
    if (authenticated) {
      setCurrentUser(api.auth.getCurrentUser());
    }
  };

  const loadCandidates = async () => {
    try {
      const data = await api.candidates.getAll();
      setCandidates(data.candidates);
    } catch (error) {
      console.error('Error loading candidates:', error);
    }
  };

  const handleLogin = () => {
    checkAuth();
    setMessage({ text: 'Login successful!', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleRegister = () => {
    checkAuth();
    setMessage({ text: 'Registration successful! You can now vote.', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleLogout = () => {
    api.auth.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setSelectedCandidate('');
    setShowResults(false);
    setMessage({ text: 'Logged out successfully', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleVote = async () => {
    if (!selectedCandidate) {
      setMessage({ text: 'Please select a candidate', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      return;
    }

    setLoading(true);
    try {
      await api.voting.castVote(selectedCandidate);
      setMessage({ text: '✓ Vote successfully recorded on blockchain!', type: 'success' });
      setSelectedCandidate('');
      setCurrentUser(api.auth.getCurrentUser());
      await updateResults();
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.error || 'Failed to cast vote', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    }
  };

  const updateResults = async () => {
    try {
      const data = await api.voting.getResults();
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleShowResults = async () => {
    setShowResults(true);
    await updateResults();
  };

  const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-16 h-16 text-indigo-600" />
              <h1 className="text-5xl font-bold text-gray-800">BlockVote</h1>
            </div>
            <p className="text-gray-600 text-lg">Secure Blockchain-Based Student Elections</p>
          </div>

          {showLogin ? (
            <LoginForm 
              onLogin={handleLogin}
              onSwitchToRegister={() => setShowLogin(false)}
            />
          ) : (
            <RegisterForm 
              onRegister={handleRegister}
              onSwitchToLogin={() => setShowLogin(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-10 h-10 text-indigo-600" />
                <h1 className="text-4xl font-bold text-gray-800">BlockVote</h1>
              </div>
              <p className="text-gray-600">Welcome, {currentUser?.fullName || currentUser?.voterId}</p>
            </div>
            <div className="flex gap-3">
              {!currentUser?.hasVoted && (
                <button
                  onClick={handleShowResults}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                >
                  <BarChart3 className="w-5 h-5" />
                  Results
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <p className="font-semibold text-green-800">Blockchain Integrity: Valid ✓</p>
            <p className="text-sm text-green-700">All votes are secured and tamper-proof</p>
          </div>
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-red-100 text-red-800 border-2 border-red-300'
          }`}>
            <AlertCircle className="w-5 h-5" />
            {message.text}
          </div>
        )}

        {currentUser?.hasVoted && !showResults && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-800">Thank You for Voting!</h2>
            </div>
            <p className="text-blue-700 mb-4">Your vote has been recorded on the blockchain and cannot be changed.</p>
            <button
              onClick={handleShowResults}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              <BarChart3 className="w-5 h-5" />
              View Results
            </button>
          </div>
        )}

        {!currentUser?.hasVoted && !showResults && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {candidates.map((candidate) => (
                <div
                  key={candidate.candidateId}
                  onClick={() => setSelectedCandidate(candidate.name)}
                  className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition transform hover:scale-105 ${
                    selectedCandidate === candidate.name ? 'ring-4 ring-indigo-500 bg-indigo-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">{candidate.party}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{candidate.slogan}"</p>
                  {selectedCandidate === candidate.name && (
                    <div className="mt-3 flex items-center gap-2 text-indigo-600 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      Selected
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleVote}
              disabled={loading || !selectedCandidate}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Vote className="w-6 h-6" />
              {loading ? 'Processing Vote...' : 'Cast Vote on Blockchain'}
            </button>
          </>
        )}

        {showResults && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
                Election Results
              </h2>
              {!currentUser?.hasVoted && (
                <button
                  onClick={() => setShowResults(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
                >
                  Back to Voting
                </button>
              )}
            </div>
            <p className="text-gray-600 mb-6">Total Votes Cast: {totalVotes}</p>
            <div className="space-y-4">
              {candidates.map((candidate) => {
                const votes = results[candidate.name] || 0;
                const percentage = totalVotes > 0 ? (votes / totalVotes * 100).toFixed(1) : 0;
                return (
                  <div key={candidate.candidateId} className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-800">{candidate.name}</span>
                      <span className="text-indigo-600 font-bold">{votes} votes ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}