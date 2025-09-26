import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Verify() {
  const { id } = useParams();
  const [status, setStatus] = useState('Идёт подтверждение...');

  useEffect(() => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map((u) => (u.id === id ? { ...u, status: 'active' } : u));
    localStorage.setItem('users', JSON.stringify(users));
    setStatus('Email подтверждён! Теперь можно войти.');
  }, [id]);

  return (
    <div>
      <h2>{status}</h2>
    </div>
  );
}
