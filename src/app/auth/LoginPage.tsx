import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // ваш контекст аутентификации
import { GITHUB_API_URL, GITHUB_TOKEN, GITREPO, GITREPOSITORY_OWNER } from '../../constants/globalVar';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth(); // используем login и статус аутентификации
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null); // Для обработки ошибок

  // Если пользователь уже авторизован, перенаправляем его
  if (isAuthenticated) {
    navigate('/'); // редирект на главную страницу
    return null; // возвращаем null, чтобы не рендерить компонент
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const owner = GITREPOSITORY_OWNER;
      const repo = GITREPO;
      const path = 'src/app/app-config.json';

      // Запрашиваем конфигурацию
      const response = await fetch(`${GITHUB_API_URL}/${owner}/${repo}/contents/${path}`, {
        method: 'GET',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        
      });

      if (!response.ok) {
        throw new Error(`Ошибка загрузки файла: ${response.statusText}`);
      }

      const data = await response.json();
      const configContent = atob(data.content); // Декодируем содержимое файла
      const config = JSON.parse(configContent); // Парсим JSON

      // Проверяем логин и пароль
      if (config.email_admin === email && config.password_admin === password) {
        await login(email, password); // Вызов функции login из AuthContext
        navigate('/'); // успешный вход, перенаправляем на главную
      } else {
        setError('Неверный email или пароль.'); // Устанавливаем ошибку
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      setError('Ошибка авторизации. Пожалуйста, попробуйте позже.'); // Устанавливаем ошибку
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Вход</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Отображение ошибок */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
