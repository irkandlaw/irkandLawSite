import React, { useState, useEffect } from "react";
import { GITHUB_API_URL, GITHUB_TOKEN, GITREPO, GITREPOSITORY_OWNER } from '../../../constants/globalVar';

const EditRobotsTXT: React.FC = () => {
  const [robotsContent, setRobotsContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRobotsTXT = async () => {
      try {
        const owner = GITREPOSITORY_OWNER;
        const repo = GITREPO;
        const path = 'public/robots.txt';

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
        const fileContent = atob(data.content);
        setRobotsContent(fileContent);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchRobotsTXT();
  }, []);

  const handleSave = async () => {
    try {
      const owner = GITREPOSITORY_OWNER;
      const repo = GITREPO;
      const path = 'public/robots.txt';
      setLoading(true);

      // Fetch the current file contents and get its SHA for updating
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

      // Декодируйте контент из Base64
      let fileContent = atob(data.content);

      // Обновляем контент файла robots.txt
      fileContent = robotsContent;

      const encoder = new TextEncoder();
      const encodedContent = btoa(String.fromCharCode(...encoder.encode(fileContent)));
      
      const updatedContent = {
        message: 'Обновление файла robots.txt',
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
      alert('Файл robots.txt успешно обновлен!');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Редактирование файла robots.txt</h1>
   
      <textarea
        value={robotsContent}
        onChange={(e) => setRobotsContent(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Введите содержимое файла robots.txt"
        rows={10}
      />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        disabled={loading}
      >
        {loading ? 'Сохранение...' : 'Сохранить изменения'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default EditRobotsTXT;
