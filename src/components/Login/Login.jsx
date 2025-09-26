import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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

    setMessage('Успешный вход!');
    navigate('/admin');
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br />
        <button type="submit">Войти</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
