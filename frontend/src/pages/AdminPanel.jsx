import { useEffect, useState } from 'react';
import API from '../utils/axios';
import { useNavigate } from 'react-router-dom';


export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/auth/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Failed to fetch users', err));
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <h2 className="text-xl mb-2">All Registered Users:</h2>
      <ul className="space-y-1">
        {users.map((user) => (
          <li key={user._id}>
            {user.name} — {user.email} — Role: {user.role}
          </li>
        ))}
      </ul>

      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white rounded-md"
      >
        Logout
      </button>
    </div>
  );
}