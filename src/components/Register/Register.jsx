import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem('users')) || [];

    users = users.filter((u) => !(u.email === form.email && u.deleted));

    if (users.find((u) => u.email === form.email)) {
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

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setMessage('Регистрация успешна! Подтвердите email (ссылка в консоли).');

    // имитация письма
    console.log(`Письмо отправлено: http://localhost:3000/verify/${newUser.id}`);

    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Имя"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br />
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
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
