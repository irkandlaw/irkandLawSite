// FileUploader.ts

import { GITREPO, GITREPOSITORY_OWNER } from "../../../constants/globalVar";
import { getFileContent } from "../utils/useGetFileContent";
import { updateFileContent } from "../utils/useUpdateFileContent";


// Конвертация ArrayBuffer в Base64 строку
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

// Универсальная функция для обновления файлов в репозитории
export const updateFile = async (path: string, fileContent: ArrayBuffer | string, message: string) => {
  const owner = GITREPOSITORY_OWNER;
  const repo = GITREPO;

  try {
    // Получаем информацию о текущем файле из репозитория
    const data = await getFileContent(owner, repo, path);

    // Преобразуем содержимое файла в Base64
    const encodedContent = typeof fileContent === 'string'
      ? btoa(unescape(encodeURIComponent(fileContent))) // Если строка, кодируем в Base64
      : arrayBufferToBase64(fileContent); // Если ArrayBuffer, конвертируем в Base64

    // Создаем payload для обновления файла
    const payload = {
      message, // Сообщение коммита
      content: encodedContent, // Содержимое файла
      sha: data.sha, // SHA файла для обновления
    };

    // Отправляем обновленный файл в репозиторий
    await updateFileContent(owner, repo, path, payload);
    console.log(`Файл ${path} успешно обновлен!`);
  } catch (err) {
    console.error(`Ошибка при обновлении файла ${path}:`, err);
  }
};

// Обработчик загрузки файла
export const handleFileUpload = (file: File, path: string) => {
  const reader = new FileReader();

  reader.onload = async (e) => {
    const fileContent = e.target?.result as ArrayBuffer | string;

    if (fileContent) {
      // Передаем содержимое файла для обновления
      await updateFile(path, fileContent, `Update ${file.name} via API`);
    }
  };

  reader.onerror = (err) => {
    console.error('Ошибка при чтении файла:', err);
  };

  reader.readAsArrayBuffer(file); // Чтение файла как ArrayBuffer для бинарных данных
};
