import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

   useEffect(() => {
    if (!user) return;

    if (user.role === 'admin') {
      navigate('/admin'); // ✅ Redirect if admin tries to open user dashboard
    } else {
      setMessage(`Welcome back, ${user.name}!`);
    }
  }, [user, navigate]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{message}</h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white rounded-md"
      >
        Logout
      </button>
    </div>
  );
}