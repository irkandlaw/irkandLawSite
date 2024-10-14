import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Импорт иконок глаз
import { GITHUB_API_URL, GITHUB_TOKEN, GITREPO, GITREPOSITORY_OWNER } from '../constants/globalVar';
import appConfigData from './app-config.json';
import { updateFileContent } from '../components/api-github/utils/useUpdateFileContent';

const EditAppConfig: React.FC = () => {
    const [appConfig, setAppConfig] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false); // Для видимости пароля

    useEffect(() => {
        setAppConfig(appConfigData);
        setLoading(false);
    }, []);

    const handleChange = (key: string, value: string) => {
        setAppConfig((prevConfig: any) => ({
            ...prevConfig,
            [key]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const owner = GITREPOSITORY_OWNER;
            const repo = GITREPO;
            const path = 'src/app/app-config.json';
            setLoading(true);

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
            const encodedContent = btoa(unescape(encodeURIComponent(JSON.stringify(appConfig, null, 2))));

            const updatedContent = {
                message: 'Update app-config.json',
                content: encodedContent,
                sha: sha,
            };

            await updateFileContent(owner, repo, path, updatedContent);
            setLoading(false);
            alert('Конфигурация успешно обновлена!');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Редактор AppConfig</h2>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <div className="flex flex-col space-y-4">
                    {/* Поле для ввода пароля с возможностью показать/скрыть */}
                    <div>
                        <label className="block font-semibold">Пароль администратора</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'} // Изменение типа input для отображения пароля
                                value={appConfig?.password_admin || ''}
                                onChange={(e) => handleChange('password_admin', e.target.value)}
                                className="w-full p-2 border rounded-md"
                                placeholder="Пароль администратора"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Иконка глаз/глаз с чертой */}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block font-semibold">Email администратора</label>
                        <input
                            type="email"
                            value={appConfig?.email_admin || ''}
                            onChange={(e) => handleChange('email_admin', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Email администратора"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Telegram Token</label>
                        <input
                            type="text"
                            value={appConfig?.telegram_token || ''}
                            onChange={(e) => handleChange('telegram_token', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Telegram Token"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Telegram Chat ID</label>
                        <input
                            type="text"
                            value={appConfig?.telegram_chat_id || ''}
                            onChange={(e) => handleChange('telegram_chat_id', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Telegram Chat ID"
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

export default EditAppConfig;
