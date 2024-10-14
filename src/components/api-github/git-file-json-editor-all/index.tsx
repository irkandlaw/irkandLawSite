import React, { useState, useEffect } from 'react';
import { getFileContent } from '../utils/useGetFileContent';
import { updateFileContent } from '../utils/useUpdateFileContent';
import { GITREPO, GITREPOSITORY_OWNER } from '../../../constants/globalVar';

const owner = GITREPOSITORY_OWNER; // Замените на имя владельца репозитория
const repo = GITREPO; // Замените на название репозитория
const path = 'src/locale/texts-site-ru.json'; // Путь к вашему JSON-файлу в репозитории

const GitFileJsonEditor: React.FC = () => {
  const [fileContent, setFileContent] = useState<any>({}); // Содержимое файла
  const [sha, setSha] = useState<string>(''); // SHA для коммита
  const [error, setError] = useState<string | null>(null); // Ошибки

  useEffect(() => {
    // Получение содержимого файла при загрузке компонента
    const fetchFile = async () => {
      try {
        const data = await getFileContent(owner, repo, path);
        const jsonContent = JSON.parse(decodeURIComponent(escape(atob(data.content)))); // Декодируем и парсим JSON
        setFileContent(jsonContent); // Устанавливаем содержимое
        setSha(data.sha); // Сохраняем SHA файла
      } catch (err) {
        setError('Ошибка при загрузке файла');
        console.error(err);
      }
    };

    fetchFile();
  }, []);

  const handleChange = (key: string, value: any) => {
    setFileContent((prevContent: any) => ({
      ...prevContent,
      [key]: value, // Обновляем значение по ключу
    }));
  };

  const handleNestedChange = (key: string, nestedKey: string, value: any) => {
    setFileContent((prevContent: any) => ({
      ...prevContent,
      [key]: {
        ...prevContent[key],
        [nestedKey]: value, // Обновляем значение по вложенному ключу
      },
    }));
  };

  const handleUpdate = async () => {
    const updatedContent = btoa(unescape(encodeURIComponent(JSON.stringify(fileContent, null, 2)))); // Кодирование обновленного JSON в Base64
    const payload = {
      message: 'Update JSON file via API',
      content: updatedContent,
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
      <h3>Редактирование содержимого JSON:</h3>
      <pre>
        {Object.keys(fileContent).map((key) => (
          <div key={key}>
            <label>
              {key}:
              {typeof fileContent[key] === 'object' ? (
                <div>
                  {Object.keys(fileContent[key]).map((nestedKey) => (
                    <div key={nestedKey}>
                      <label>
                        {nestedKey}:
                        <input
                          type="text"
                          value={fileContent[key][nestedKey] || ''}
                          onChange={(e) => handleNestedChange(key, nestedKey, e.target.value)}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={fileContent[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              )}
            </label>
          </div>
        ))}
      </pre>
      <button onClick={handleUpdate}>Подтвердить изменение и коммит</button>
    </div>
  );
};

export default GitFileJsonEditor;
