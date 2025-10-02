import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';

export default function Login() {
  const navigate = useNavigate();
  const [submitingError, setSubmittingError] = useState(null);

  const handleLogin = async (formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (!response.ok || responseData.error) {
        throw new Error(responseData.error);
      }

      localStorage.setItem('token', responseData.token);
      localStorage.setItem('user', JSON.stringify(responseData.user));

      navigate('/admin');
    } catch (error) {
      setSubmittingError(error.message);
      console.error('Error:', error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = (data) => {
    handleLogin(data);
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
          {!isSubmitting ? (
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
          ) : (
            <>Loading</>
          )}
          {submitingError && (
            <Typography
              variant="body2"
              color={'error'}
              align="center"
              sx={{ mt: 2 }}
            >
              {submitingError}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
