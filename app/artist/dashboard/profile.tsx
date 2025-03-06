import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('DJ Crypto');
  const [role, setRole] = useState('Electronic Music Producer');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log('Updated Profile:', { name, role });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center p-5 border border-gray-300 rounded-lg shadow-md">
      {isEditing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="mb-2 p-2 border rounded"
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
            className="mb-2 p-2 border rounded"
          />
          <div className="mt-3 flex gap-2">
            <button onClick={handleSaveClick} className="px-4 py-2 bg-green-500 text-white rounded">
              Save
            </button>
            <button onClick={handleCancelClick} className="px-4 py-2 bg-gray-500 text-white rounded">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mt-2">{name}</h2>
          <p className="text-gray-600">{role}</p>
          <button onClick={handleEditClick} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
