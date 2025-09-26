import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import DataTable from './components/DataTable/DataTable';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Verify from './components/Verify/Verify';

function PrivateRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  if (currentUser.status !== 'active') {
    return <Navigate to="/login" />;
  }
  if (currentUser.deleted || currentUser.status === 'blocked') {
    return <Navigate to="/login" />;
  }

  return children;
}

export default function App() {
  return (
    <div>
      <nav style={{ padding: '10px', background: '#f5f5f5' }}>
        <NavLink to="/register" style={{ marginRight: '10px' }}>
          Register
        </NavLink>
        <NavLink to="/login" style={{ marginRight: '10px' }}>
          Login
        </NavLink>
        <NavLink to="/admin">Admin Panel</NavLink>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <DataTable />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}
