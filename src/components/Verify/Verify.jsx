import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const [msg, setMsg] = useState('Проверяем...');
  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setMsg('Нет токена');
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/verify?token=${token}`)
      .then((res) => res.text())
      .then(setMsg)
      .catch(() => setMsg('Ошибка верификации'));
  }, [searchParams]);
  return <div>{msg}</div>;
}
