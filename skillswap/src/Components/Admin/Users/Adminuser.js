import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";

import { API_BASE_URL } from "../../../config";
const Adminuser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [formState, setFormState] = useState({
    id: null,
    profilePic: null,
    name: "",
    email: "",
    phone: "",
    university: "",
    bio: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formState.id) {
        const updatedUser = {
          fullName: formState.name,
          contact_Num: formState.phone,
          uni_Name: formState.university,
          bio: formState.bio,
        };
        await axios.put(`${API_BASE_URL}/api/users/${formState.id}`, updatedUser);
        if (formState.profilePic) {
          const formData = new FormData();
          formData.append("profile_pic", formState.profilePic);
          await axios.put(`${API_BASE_URL}/api/users/${formState.id}/profile-pic`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        }
      } else {
        const newUser = {
          email: formState.email,
          password: "password123",
          fullName: formState.name,
          contact_Num: formState.phone,
          uni_Name: formState.university,
          bio: formState.bio,
        };
        const response = await axios.post(`${API_BASE_URL}/api/users/register`, newUser);
        if (formState.profilePic) {
          const formData = new FormData();
          formData.append("profile_pic", formState.profilePic);
          await axios.put(`${API_BASE_URL}/api/users/${response.data.user._id}/profile-pic`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        }
      }
      fetchUsers();
      setFormState({ id: null, profilePic: null, name: "", email: "", phone: "", university: "", bio: "" });
      setPreviewImage(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user.");
    }
  };

  const handleEdit = (user) => {
    setFormState({
      id: user._id,
      profilePic: null,
      name: user.fullName,
      email: user.email,
      phone: user.contact_Num,
      university: user.uni_Name,
      bio: user.bio,
    });
    setPreviewImage(`${API_BASE_URL}/${user.profile_pic}`);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormState({ ...formState, profilePic: file });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {showForm && (
        <div className="admin-section-card" style={{padding: 24, marginBottom: 28}}>
          <h3 style={{marginBottom: 20, fontSize: "1.125rem", fontWeight: 700}}>
            {formState.id ? "Edit User" : "Add New User"}
          </h3>
          <form onSubmit={handleFormSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px'}}>
              <div style={{marginBottom: 16}}>
                <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: 6}}>Full Name</label>
                <input type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} required style={{width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', outline: 'none'}} />
              </div>
              <div style={{marginBottom: 16}}>
                <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: 6}}>Email</label>
                <input type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} required disabled={!!formState.id} style={{width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', outline: 'none', background: formState.id ? 'var(--bg)' : '#fff'}} />
              </div>
              <div style={{marginBottom: 16}}>
                <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: 6}}>Phone Number</label>
                <input type="text" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} required style={{width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', outline: 'none'}} />
              </div>
              <div style={{marginBottom: 16}}>
                <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: 6}}>University</label>
                <input type="text" value={formState.university} onChange={(e) => setFormState({ ...formState, university: e.target.value })} required style={{width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', outline: 'none'}} />
              </div>
            </div>
            
            <div style={{marginBottom: 16}}>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: 6}}>Bio</label>
              <textarea value={formState.bio} onChange={(e) => setFormState({ ...formState, bio: e.target.value })} style={{width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', outline: 'none', minHeight: 80, resize: 'vertical'}} />
            </div>

            <div style={{marginBottom: 24}}>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: 6}}>Profile Picture</label>
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                {previewImage && <img src={previewImage} alt="Preview" style={{width: 48, height: 48, borderRadius: '50%', objectFit: 'cover'}} />}
                <input type="file" onChange={handleFileChange} accept="image/*" />
              </div>
            </div>

            <div style={{display: 'flex', gap: 12}}>
              <button type="submit" className="btn btn-primary">{formState.id ? "Update User" : "Add User"}</button>
              <button type="button" className="btn" style={{border: '1.5px solid var(--border)'}} onClick={() => {setShowForm(false); setFormState({ id: null, profilePic: null, name: "", email: "", phone: "", university: "", bio: "" }); setPreviewImage(null);}}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-section-card">
        <div className="admin-section-header">
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div className="admin-search" style={{padding: 0, border: 'none'}}>
              <div style={{position: 'relative'}}>
                <Search size={16} color="var(--text-secondary)" style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)'}} />
                <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{paddingLeft: 34}} />
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => {setShowForm(true); setFormState({ id: null, profilePic: null, name: "", email: "", phone: "", university: "", bio: "" }); setPreviewImage(null);}}>
            <Plus size={16} style={{marginRight: 4}} /> Add User
          </button>
        </div>

        <div style={{overflowX: 'auto'}}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>University</th>
                <th>Phone</th>
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
                      style={{width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)'}}
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
                    <div style={{display: 'flex', gap: 8}}>
                      <button className="btn" style={{padding: '4px 8px', color: 'var(--primary)', borderColor: 'var(--primary)'}} onClick={() => handleEdit(user)}>
                        <Edit2 size={14} />
                      </button>
                      <button className="btn btn-danger" style={{padding: '4px 8px'}} onClick={() => handleDelete(user._id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adminuser;




