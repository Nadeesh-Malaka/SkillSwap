import React, { useState } from "react";
import "./AdminSkills.css"; // Include styles for AdminSkills

const AdminSkills = () => {
  const [skills, setSkills] = useState([
    {
      id: 1,
      pic: "https://via.placeholder.com/50",
      name: "John Doe",
      skills: "JavaScript, HTML, CSS",
      status: "Approved",
    },
    {
      id: 2,
      pic: "https://via.placeholder.com/50",
      name: "Jane Smith",
      skills: "Python, Django",
      status: "Rejected",
    },
    {
      id: 3,
      pic: "https://via.placeholder.com/50",
      name: "Michael Brown",
      skills: "React, Node.js",
      status: "Pending",
    },
    {
      id: 4,
      pic: "https://via.placeholder.com/50",
      name: "Emily Johnson",
      skills: "Java, Spring Boot",
      status: "Approved",
    },
    {
      id: 5,
      pic: "https://via.placeholder.com/50",
      name: "Daniel Lee",
      skills: "PHP, Laravel",
      status: "Pending",
    },
  ]);

  const handleApprove = (id) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === id ? { ...skill, status: "Approved" } : skill
      )
    );
    alert(`User ID ${id} approved successfully!`);
  };

  const handleReject = (id) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === id ? { ...skill, status: "Rejected" } : skill
      )
    );
    alert(`User ID ${id} rejected successfully!`);
  };

  const handleDelete = (id) => {
    const filteredSkills = skills.filter((skill) => skill.id !== id);
    setSkills(filteredSkills);
    alert(`User ID ${id} deleted successfully!`);
  };

  return (
    <div className="admin-container">
      {/* Main Content */}
      <div className="admin-main-content">
        <h3>Skills</h3>
        <div className="table-container">
          <table id="skills-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pic</th>
                <th>Name</th>
                <th>Skills</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.id}</td>
                  <td>
                    <img
                      src={skill.pic}
                      alt={`${skill.name}'s Pic`}
                      className="profile-pic"
                    />
                  </td>
                  <td>{skill.name}</td>
                  <td>{skill.skills}</td>
                  <td>{skill.status}</td>
                  <td>
                    {skill.status !== "Approved" && (
                      <button
                        className="btn"
                        onClick={() => handleApprove(skill.id)}
                      >
                        Approve
                      </button>
                    )}
                    {skill.status !== "Rejected" && (
                      <button
                        className="btn"
                        onClick={() => handleReject(skill.id)}
                      >
                        Reject
                      </button>
                    )}
                    <button
                      className="btn"
                      onClick={() => handleDelete(skill.id)}
                    >
                      Delete
                    </button>
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

export default AdminSkills;
