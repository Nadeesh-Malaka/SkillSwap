import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import "./styles.css";

import { API_BASE_URL } from "../../config";
const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <AdminNav />
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-topbar-title">Manage Users</div>
        </div>
        
        <div className="admin-content">
          <div className="admin-section-card">
            <div className="admin-search">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{overflowX: 'auto'}}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>University</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <img 
                          src={user.profile_pic ? (user.profile_pic.startsWith('data:') ? user.profile_pic : `${API_BASE_URL}/${user.profile_pic}`) : "https://via.placeholder.com/40"} 
                          alt="Profile" 
                          style={{width: 32, height: 32, borderRadius: '50%', objectFit: 'cover'}}
                        />
                      </td>
                      <td style={{fontWeight: 500}}>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.uni_Name || '-'}</td>
                      <td>{user.contact_Num || '-'}</td>
                      <td>
                        <span style={{
                          background: user.role === 'admin' ? 'var(--danger-light)' : 'var(--primary-light)',
                          color: user.role === 'admin' ? 'var(--danger)' : 'var(--primary)',
                          padding: '2px 8px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600
                        }}>{user.role}</span>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;




