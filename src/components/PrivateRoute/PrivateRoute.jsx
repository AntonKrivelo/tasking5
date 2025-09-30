import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (!user || user.status !== 'active') {
    return <Navigate to="/login" replace />;
  }

  return children;
}
