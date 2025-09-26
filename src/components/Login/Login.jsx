import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Box, Typography, Stack } from '@mui/material';

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
    const user = users.find((u) => u.email === form.email && u.password === form.password);

    if (!user) {
      setMessage('Неверный email или пароль');
      return;
    }
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

    // ✅ сохраняем текущего пользователя
    localStorage.setItem('currentUser', JSON.stringify(user));

    setMessage('Успешный вход!');
    setTimeout(() => navigate('/admin'), 1000);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
      <Grid item xs={10} sm={6} md={4}>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            p: 3,
            border: '1px solid #ddd',
            borderRadius: 2,
            boxShadow: 2,
            bgcolor: 'white',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              fullWidth
            />
            <Button type="submit" variant="contained">
              Войти
            </Button>
          </Stack>

          {message && (
            <Typography
              variant="body2"
              color={message.includes('успеш') ? 'green' : 'error'}
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
