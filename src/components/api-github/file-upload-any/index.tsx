import React, { useState } from 'react';
import { handleFileUpload } from './FileUploader';

const FileUploadAny: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string>('public/profile.png'); // Укажите путь по умолчанию
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  // Обработка выбора файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedFile && filePath) {
      try {
        // Обновляем файл через API
        await handleFileUpload(selectedFile, filePath);
        setUploadMessage(`Файл ${selectedFile.name} успешно загружен и обновлен!`);
      } catch (err) {
        setUploadMessage('Ошибка при загрузке файла.');
        console.error(err);
      }
    } else {
      setUploadMessage('Пожалуйста, выберите файл и укажите путь.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Выберите файл:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Укажите путь в репозитории:</label>
          <input
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="public/profile.png"
          />
        </div>
        <button type="submit">Загрузить и обновить файл</button>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default FileUploadAny;
