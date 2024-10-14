import { GITHUB_API_URL, GITHUB_TOKEN } from "../../../constants/globalVar";
import { GitHubFileResponse } from "../types/githubTypes";


// Функция для получения содержимого файла
export const getFileContent = async (
  owner: string,
  repo: string,
  path: string
): Promise<GitHubFileResponse> => {
  const response = await fetch(`${GITHUB_API_URL}/${owner}/${repo}/contents/${path}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });


  if (!response.ok) {
    throw new Error('Не удалось получить содержимое файла');
  }

  const data: GitHubFileResponse = await response.json();
  return data;
};
