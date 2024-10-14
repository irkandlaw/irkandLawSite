// jsonEditor.ts

export const updateValueByKey = (obj: any, key: string, value: any) => {
    const keys = key.split('.');
    let current = obj;
  
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {}; // Создаем объект, если ключа нет
      }
      current = current[keys[i]];
    }
  
    current[keys[keys.length - 1]] = value; // Обновляем значение
  };
  
  export const getValueByKey = (obj: any, key: string) => {
    const keys = key.split('.');
    let current = obj;
  
    for (const k of keys) {
      if (!current || !current.hasOwnProperty(k)) {
        return undefined; // Возвращаем undefined, если ключ не найден
      }
      current = current[k];
    }
  
    return current; // Возвращаем найденное значение
  };
  
  export const updateJsonFile = async (owner: string, repo: string, path: string, json: any, sha: string, updateFileContent: Function) => {
    const updatedContent = btoa(unescape(encodeURIComponent(JSON.stringify(json, null, 2))));
    const payload = {
      message: 'Update JSON file via API',
      content: updatedContent,
      sha: sha,
    };
  
    try {
      await updateFileContent(owner, repo, path, payload);
      return 'Файл успешно обновлен!';
    } catch (err) {
      throw new Error('Ошибка при обновлении файла');
    }
  };
  