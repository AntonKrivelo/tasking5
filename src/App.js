import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import DataTable from './components/DataTable/DataTable';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Verify from './components/Verify/Verify';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export default function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button
            color="inherit"
            component={NavLink}
            to="/register"
            sx={{ mr: 2 }}
          >
            Registration
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/login"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button color="inherit" component={NavLink} to="/admin">
            Admin Panel
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
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
      </Container>
    </Box>
  );
}
