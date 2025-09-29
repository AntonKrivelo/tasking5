import { useState } from 'react';
import { Button, Grid, TextField, Typography, Box, Stack } from '@mui/material';

export default function Register() {
  // fetch('http://localhost:4000/register')
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => {
  //     console.log(res.data);
  //   });

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    fetch('http://localhost:4000/register', {
      method: 'POST', // Явно указываем метод POST
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .then((data) => {
        console.log(data);
        setMessage(
          'Registration successful! Check your email to verify your account.'
        );
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
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
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 3,
            border: '1px solid #ddd',
            borderRadius: 2,
            boxShadow: 2,
            bgcolor: 'white'
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Registration
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Name"
              value={form.name}
              onChange={handleChange('name')}
              fullWidth
            />
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
            <Typography
              variant="body2"
              color="primary"
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
