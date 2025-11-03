import { useState } from 'react';
import { supabase } from '../lib/supabase';
import AdminUpload from './AdminUpload';
import AdminUpdateProducts from './AdminUpdateProducts';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('upload');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="admin-dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload Images
        </button>
        <button
          className={`tab-button ${activeTab === 'update' ? 'active' : ''}`}
          onClick={() => setActiveTab('update')}
        >
          Update Products
        </button>
      </div>

      <div className="admin-dashboard-content">
        {activeTab === 'upload' && <AdminUpload />}
        {activeTab === 'update' && <AdminUpdateProducts />}
      </div>
    </div>
  );
}
