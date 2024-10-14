import React, { useState, useEffect } from 'react';
import { getFileContent } from '../utils/useGetFileContent';
import { updateFileContent } from '../utils/useUpdateFileContent';
import { GITREPO, GITREPOSITORY_OWNER } from '../../../constants/globalVar';


const owner = GITREPOSITORY_OWNER; // Замените на имя владельца репозитория
const repo = GITREPO;   // Замените на название репозитория
const path = 'README.md';   // Путь к файлу в репозитории

const GitFileEditorReadme: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>(''); // Содержимое файла
  const [sha, setSha] = useState<string>('');                 // SHA для коммита
  const [error, setError] = useState<string | null>(null);     // Ошибки

  useEffect(() => {
    // Получение содержимого файла при загрузке компонента
    const fetchFile = async () => {
      try {
        const data = await getFileContent(owner, repo, path);
        setFileContent(atob(data.content)); // Декодируем содержимое Base64
        setSha(data.sha);                   // Сохраняем SHA файла
      } catch (err) {
        setError('Ошибка при загрузке файла');
        console.error(err);
      }
    };

    fetchFile();
  }, []);

  const handleUpdate = async () => {
    const encodedContent = btoa(fileContent); // Кодирование содержимого в Base64
    const payload = {
      message: 'Update file via API',
      content: encodedContent,
      sha: sha,
    };

    try {
      await updateFileContent(owner, repo, path, payload);
      alert('Файл успешно обновлен!');
    } catch (err) {
      setError('Ошибка при обновлении файла');
      console.error(err);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <textarea
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={handleUpdate}>Подтвердить изменение и коммит</button>
    </div>
  );
};

export default GitFileEditorReadme;
