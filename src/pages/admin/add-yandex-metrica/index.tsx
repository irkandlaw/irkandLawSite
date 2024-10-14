import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GITHUB_API_URL, GITHUB_TOKEN, GITREPO, GITREPOSITORY_OWNER } from '../../../constants/globalVar';

const AddYandexMetrica: React.FC = () => {
  const [metricaCode, setMetricaCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentMetricaCode = async () => {
      try {
        const owner = GITREPOSITORY_OWNER;
        const repo = GITREPO;
        const path = 'index.html';

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
        // Используем TextDecoder для декодирования содержимого
        const decoder = new TextDecoder("utf-8");
        const fileContent = decoder.decode(Uint8Array.from(atob(data.content), c => c.charCodeAt(0)));

        // Паттерны для поиска кода метрики
        const startComment = '<!-- Yandex.Metrika counter -->';
        const endComment = '<!-- /Yandex.Metrika counter -->';
        const metricaSectionRegex = new RegExp(`${startComment}[\\s\\S]*?${endComment}`, 'g');

        const match = fileContent.match(metricaSectionRegex);
        if (match) {
          // Устанавливаем текущее значение кода метрики в состояние
          setMetricaCode(match[0].replace(startComment, '').replace(endComment, '').trim());
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchCurrentMetricaCode();
  }, []);

  const handleSave = async () => {
    try {
      const owner = GITREPOSITORY_OWNER;
      const repo = GITREPO;
      const path = 'index.html';
      setLoading(true);

      // Загружаем текущее содержимое файла и получаем SHA для обновления
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
      const sha = data.sha;

      // Декодируем содержимое из Base64
      const decoder = new TextDecoder("utf-8");
      let fileContent = decoder.decode(Uint8Array.from(atob(data.content), c => c.charCodeAt(0)));

      // Паттерны для поиска кода метрики
      const startComment = '<!-- Yandex.Metrika counter -->';
      const endComment = '<!-- /Yandex.Metrika counter -->';
      const metricaSectionRegex = new RegExp(`${startComment}[\\s\\S]*?${endComment}`, 'g');

      // Проверка, есть ли уже код в файле
      if (fileContent.match(metricaSectionRegex)) {
        // Если код уже есть, заменяем его
        fileContent = fileContent.replace(metricaSectionRegex, `${startComment}\n${metricaCode}\n${endComment}`);
      } else {
        // Если кода нет, добавляем его в <body>
        const bodyTag = '<body>';

        // Проверяем наличие тега <body> и добавляем метрику в начало этого тега
        if (fileContent.includes(bodyTag)) {
          fileContent = fileContent.replace(bodyTag, `${bodyTag}\n${startComment}\n${metricaCode}\n${endComment}`);
        } else {
          // Если <body> отсутствует, добавляем в конец
          fileContent += `\n${startComment}\n${metricaCode}\n${endComment}`;
        }
      }

      // Кодируем содержимое обратно в Base64
      const encoder = new TextEncoder();
      const encodedContent = btoa(String.fromCharCode(...encoder.encode(fileContent)));

      const updatedContent = {
        message: 'Добавление или обновление кода Яндекс.Метрики',
        content: encodedContent,
        sha: sha,
      };

      await fetch(`${GITHUB_API_URL}/${owner}/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContent),
      });

      setLoading(false);
      alert('Код Яндекс.Метрики успешно добавлен!');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Добавление Яндекс.Метрики</h1>
      <Link
        to="/"
        className=" fixed top-4 right-20 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        На главную
      </Link>
      <textarea
        value={metricaCode}
        onChange={(e) => setMetricaCode(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Введите код Яндекс.Метрики"
        rows={6}
      />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        disabled={loading}
      >
        {loading ? 'Сохранение...' : 'Сохранить код'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AddYandexMetrica;
