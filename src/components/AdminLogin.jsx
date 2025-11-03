import { useState } from 'react';
import { supabase } from '../lib/supabase';
import './AdminLogin.css';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        onLoginSuccess();
      }
    } catch (error) {
      setError(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setSuccessMessage('Account created! You can now login.');
        setIsSignup(false);
        setPassword('');
      }
    } catch (error) {
      setError(error.message || 'Could not create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h2>{isSignup ? 'Create Admin Account' : 'Admin Access'}</h2>
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={6}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          <button type="submit" disabled={loading} className="login-button">
            {loading ? (isSignup ? 'Creating account...' : 'Logging in...') : (isSignup ? 'Create Account' : 'Login')}
          </button>
        </form>
        <button
          type="button"
          onClick={() => {
            setIsSignup(!isSignup);
            setError('');
            setSuccessMessage('');
          }}
          className="toggle-mode"
        >
          {isSignup ? 'Already have an account? Login' : 'Need an account? Sign up'}
        </button>
      </div>
    </div>
  );
}
