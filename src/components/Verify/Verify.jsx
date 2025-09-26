import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';

export default function Verify() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Подтверждение...');

  useEffect(() => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex !== -1) {
      users[userIndex].status = 'active';
      localStorage.setItem('users', JSON.stringify(users));
      setMessage('✅ Email успешно подтверждён! Сейчас вы будете перенаправлены на вход...');
      setTimeout(() => navigate('/login'), 2500);
    } else {
      setMessage('❌ Пользователь не найден или ссылка недействительна.');
    }
  }, [id, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        textAlign: 'center',
      }}
    >
      {message.includes('Подтверждение') ? (
        <CircularProgress />
      ) : (
        <Typography variant="h6">{message}</Typography>
      )}
    </Box>
  );
}
