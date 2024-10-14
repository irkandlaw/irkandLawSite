import { GITREPO, GITREPOSITORY_OWNER } from "../../../../constants/globalVar";
import { getFileContent } from "../../utils/useGetFileContent";
import { updateFileContent } from "../../utils/useUpdateFileContent";
import { updateJsonFile, updateValueByKey } from "../utils/jsonEditor";

const owner = GITREPOSITORY_OWNER; // Замените на имя владельца репозитория
const repo = GITREPO; // Замените на название репозитория
const path = 'src/locale/texts-site-ru.json'; // Путь к вашему JSON-файлу в репозитории

export const editJsonFileOneKey = async (key: string, newValue: any) => {
  try {
    const data = await getFileContent(owner, repo, path);
    const jsonContent = JSON.parse(decodeURIComponent(escape(atob(data.content))));
    
    // Обновляем значение по ключу
    updateValueByKey(jsonContent, key, newValue);
    
    // Обновляем JSON-файл в репозитории
    const message = await updateJsonFile(owner, repo, path, jsonContent, data.sha, updateFileContent);
    console.log(message);
  } catch (err) {
    console.error(err);
  }
};

// Пример использования
// editJsonFile('header.cost', 'Новая стоимость');
