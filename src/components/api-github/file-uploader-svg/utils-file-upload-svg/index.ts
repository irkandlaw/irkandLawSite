import { GITREPO, GITREPOSITORY_OWNER } from '../../../../constants/globalVar';
import { getFileContent } from '../../utils/useGetFileContent';
import { updateFileContent } from '../../utils/useUpdateFileContent';

const owner = GITREPOSITORY_OWNER; // Имя владельца репозитория
const repo = GITREPO; // Название репозитория
const path = 'public/quote.svg'; // Путь к SVG-файлу в репозитории

// Функция для обновления содержимого SVG файла
export const updateSvgFile = async (newSvgContent: string) => {
  try {
    const data = await getFileContent(owner, repo, path);

    // Создание payload для коммита с новым содержимым
    const encodedContent = btoa(unescape(encodeURIComponent(newSvgContent))); // Кодируем содержимое в Base64
    const payload = {
      message: 'Update quote.svg via API',
      content: encodedContent,
      sha: data.sha,
    };

    // Обновляем файл в репозитории
    await updateFileContent(owner, repo, path, payload);
    console.log('Файл quote.svg успешно обновлен!');
  } catch (err) {
    console.error('Ошибка при обновлении файла:', err);
  }
};

// Пример функции для загрузки нового SVG-файла через input
export const handleFileUpload = (file: File) => {
  const reader = new FileReader();

  reader.onload = async (e) => {
    const newSvgContent = e.target?.result as string;

    if (newSvgContent) {
      await updateSvgFile(newSvgContent); // Обновляем файл в репозитории
    }
  };

  reader.onerror = (err) => {
    console.error('Ошибка при чтении файла:', err);
  };

  reader.readAsText(file); // Читаем файл как текст (в данном случае SVG)
};
