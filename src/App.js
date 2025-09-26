import { Routes, Route, NavLink } from 'react-router-dom';
import DataTable from './components/DataTable/DataTable';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Verify from './components/Verify/Verify';

export default function App() {
  return (
    <div>
      <nav style={{ padding: '10px', background: '#f5f5f5' }}>
        <NavLink to="/register">Register</NavLink> | <NavLink to="/login">Login</NavLink> |{' '}
        <NavLink to="/admin">Admin Panel</NavLink>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/admin" element={<DataTable />} />
      </Routes>
    </div>
  );
}
