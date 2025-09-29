import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(
      (u) => u.email === form.email && u.password === form.password
    );

    if (userIndex === -1) {
      setMessage('Неверный email или пароль');
      return;
    }

    const user = users[userIndex];

    if (user.status === 'unverified') {
      setMessage('Подтвердите email перед входом.');
      return;
    }
    if (user.status === 'blocked') {
      setMessage('Ваш аккаунт заблокирован.');
      return;
    }
    if (user.deleted) {
      setMessage('Аккаунт удалён, зарегистрируйтесь заново.');
      return;
    }

    const now = new Date().toLocaleString();
    users[userIndex] = { ...user, lastSeen: now };
    localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));

    setMessage('Успешный вход!');
    navigate('/admin');
  };

  const handleRegister = async (formData) => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error');
      }

      const data = await response.json();
      console.log('success:', data);

      setMessage('Успешный вход!');
      navigate('/admin');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = (data) => {
    handleRegister(data);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid item xs={10} sm={6} md={4}>
        <Box
          component="div"
          onSubmit={handleLogin}
          sx={{
            p: 3,
            border: '1px solid #ddd',
            borderRadius: 2,
            boxShadow: 2,
            bgcolor: 'white'
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('email', { required: 'is required' })}
              id="outlined-email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
            />

            <TextField
              {...register('password', { required: 'is required' })}
              id="outlined-password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 2, py: 1.2, fontSize: '16px', fontWeight: 'bold' }}
            >
              Submit
            </Button>
          </form>

          {message && (
            <Typography
              variant="body2"
              color={message.includes('успешно') ? 'green' : 'error'}
              align="center"
              sx={{ mt: 2 }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
