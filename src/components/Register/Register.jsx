import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Grid, TextField, Typography, Box, Stack } from '@mui/material';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      setMessage(data.message);
      navigate('login');
    } catch (err) {
      setError(err.message);
    }
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

          {error && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ mt: 2 }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
