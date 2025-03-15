import React, { useState, useEffect } from 'react';
import './PersonList.css'; // Optional styling

const PersonList = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/persons')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then((data) => {
        setPersons(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="person-list">
      <h2>Team Members</h2>
      <div className="persons-container">
        {persons.map((person) => (
          <div key={person.id} className="person-card">
            <h3>{person.name}</h3>
            <p>Email: {person.email}</p>
            <p>Role: {person.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonList;