import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField, Typography, Box, Stack } from '@mui/material';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // удалённые могут регистрироваться заново
    users = users.filter((u) => !(u.email === form.email && u.deleted));

    if (users.some((u) => u.email === form.email)) {
      setMessage('Пользователь с таким email уже существует!');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      password: form.password,
      status: 'unverified',
      deleted: false,
    };

    const updatedUsers = [...users, newUser]; // ✅ без мутации
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setMessage('Регистрация успешна! Подтвердите email (ссылка в консоли).');

    // имитация письма
    console.log(`Письмо отправлено: http://localhost:3000/verify/${newUser.id}`);

    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
      <Grid item xs={10} sm={6} md={4}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 3,
            border: '1px solid #ddd',
            borderRadius: 2,
            boxShadow: 2,
            bgcolor: 'white',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Registration
          </Typography>

          <Stack spacing={2}>
            <TextField label="Name" value={form.name} onChange={handleChange('name')} fullWidth />
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
              Register
            </Button>
          </Stack>

          {message && (
            <Typography variant="body2" color="primary" align="center" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
