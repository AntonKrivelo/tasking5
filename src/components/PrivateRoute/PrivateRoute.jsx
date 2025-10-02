import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token || !(user.status === 'active' || user.status === 'unverified')) {
    return <Navigate to="/login" />;
  }

  return children;
}
