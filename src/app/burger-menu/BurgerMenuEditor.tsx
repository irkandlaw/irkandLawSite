import React, { useEffect, useState } from 'react';
import { GITHUB_API_URL, GITHUB_TOKEN, GITREPO, GITREPOSITORY_OWNER } from '../../constants/globalVar';
import textBurgerMenu from './burger-menu.json';
import { updateFileContent } from '../../components/api-github/utils/useUpdateFileContent';

const BurgerMenuEditor: React.FC = () => {
    const [burgerMenuData, setBurgerMenuData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Загрузка данных меню из JSON
        setBurgerMenuData(textBurgerMenu.BurgerMenu);
        setLoading(false);
    }, []);

    const handleChange = (key: string, value: string) => {
        setBurgerMenuData((prevData: any) => ({
            ...prevData,
            [key]: value
        }));
    };

    const handleSave = async () => {
        try {
            const owner = GITREPOSITORY_OWNER;
            const repo = GITREPO;
            const path = 'src/app/burger-menu/burger-menu.json'; // Путь к файлу burger-menu.json
            setLoading(true);

            // Получаем текущее содержимое файла с SHA
            const response = await fetch(`${GITHUB_API_URL}/${owner}/${repo}/contents/${path}`, {
                method: 'GET',
                headers: {
                  Authorization: `token ${GITHUB_TOKEN}`,
                  'Content-Type': 'application/json',
                },
              });

            if (!response.ok) {
                throw new Error(`Ошибка загрузки файла: ${response.statusText}`);
            }

            const data = await response.json();
            const sha = data.sha;
            const encodedContent = btoa(unescape(encodeURIComponent(JSON.stringify({ BurgerMenu: burgerMenuData }, null, 2))));

            // Обновляем файл
            const updatedContent = {
                message: 'Update BurgerMenu',
                content: encodedContent,
                sha: sha,
            };

            await updateFileContent(owner, repo, path, updatedContent);
            setLoading(false);
            alert('BurgerMenu успешно обновлено!');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Редактор BurgerMenu</h2>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="block font-semibold">Заголовок</label>
                        <input
                            type="text"
                            value={burgerMenuData?.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Заголовок меню"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Подзаголовок</label>
                        <input
                            type="text"
                            value={burgerMenuData?.subtitle || ''}
                            onChange={(e) => handleChange('subtitle', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Подзаголовок меню"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Телефон</label>
                        <input
                            type="text"
                            value={burgerMenuData?.phone || ''}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Телефон"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Telegram</label>
                        <input
                            type="text"
                            value={burgerMenuData?.telegram_number || ''}
                            onChange={(e) => handleChange('telegram_number', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Telegram"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">WhatsApp</label>
                        <input
                            type="text"
                            value={burgerMenuData?.whatsapp_number || ''}
                            onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="WhatsApp"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Email</label>
                        <input
                            type="email"
                            value={burgerMenuData?.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Email"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        {loading ? 'Сохранение...' : 'Сохранить изменения'}
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default BurgerMenuEditor;
