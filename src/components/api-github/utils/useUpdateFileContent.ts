import { GITHUB_API_URL, GITHUB_TOKEN } from "../../../constants/globalVar";
import { UpdateFilePayload } from "../types/githubTypes";


// Функция для обновления файла
export const updateFileContent = async (
  owner: string,
  repo: string,
  path: string,
  payload: UpdateFilePayload
): Promise<void> => {
 
    const response = await fetch(`${GITHUB_API_URL}/${owner}/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Не удалось обновить файл');
  }

  console.log('Файл успешно обновлен');
};
