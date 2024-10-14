import React, { useState } from 'react';
import { handleFileUpload } from './utils-file-upload-svg';

const FileUploadComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedFile) {
      try {
        await handleFileUpload(selectedFile);
        setUploadMessage('Файл успешно загружен и обновлен!');
      } catch (err) {
        setUploadMessage('Ошибка при загрузке файла.');
        console.error(err);
      }
    } else {
      setUploadMessage('Пожалуйста, выберите файл.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".svg" onChange={handleFileChange} />
        <button type="submit">Загрузить и обновить</button>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default FileUploadComponent;
