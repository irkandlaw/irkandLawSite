import React, { useState } from 'react';
import { GITHUB_API_URL, GITHUB_TOKEN, GITREPO, GITREPOSITORY_OWNER } from '../../constants/globalVar';
import { updateFileContent } from '../api-github/utils/useUpdateFileContent';
import textJsonRu from '../../locale/texts-site-ru.json'; // Ваш JSON с FAQ

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqData {
  faq_title: string;
  faqs: FaqItem[];
}

const FaqEditor: React.FC = () => {
  const [faqData, setFaqData] = useState<FaqData>(textJsonRu.faq || { faq_title: '', faqs: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (index: number, key: 'question' | 'answer', value: string) => {
    setFaqData((prevData) => {
      const updatedFaqs = [...prevData.faqs];
      updatedFaqs[index] = { ...updatedFaqs[index], [key]: value };
      return { ...prevData, faqs: updatedFaqs };
    });
  };

  const handleTitleChange = (value: string) => {
    setFaqData((prevData) => ({
      ...prevData,
      faq_title: value,
    }));
  };

  const handleSave = async () => {
    try {
      const owner = GITREPOSITORY_OWNER;
      const repo = GITREPO;
      const path = 'src/locale/texts-site-ru.json'; // Путь к файлу с FAQ
      setLoading(true);

      // Fetch the current file contents and get its SHA for updating
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

      // Update the FAQ content in the file
      const updatedFaq = { ...textJsonRu, faq: faqData }; // Update the whole JSON structure with modified FAQ data
      const encodedContent = btoa(unescape(encodeURIComponent(JSON.stringify(updatedFaq, null, 2))));

      const updatedContent = {
        message: 'Update FAQ',
        content: encodedContent,
        sha: sha,
      };

      await updateFileContent(owner, repo, path, updatedContent);
      setLoading(false);
      alert('FAQ успешно обновлен!');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Редактор FAQ</h2>
      <p className="inline-block rounded-lg bg-green-300 text-xl p-1 font-bold">Заголовок FAQ</p>
      <input
        type="text"
        value={faqData.faq_title}
        onChange={(e) => handleTitleChange(e.target.value)}
        className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-green-300"
        placeholder="Введите заголовок FAQ"
      />
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        faqData.faqs.map((faqItem, index) => (
          <div key={index} className="mb-4">
            <p className="inline-block rounded-lg bg-green-300 text-xl p-1 font-bold">Вопрос {index + 1}:</p>
            <input
              type="text"
              value={faqItem.question}
              onChange={(e) => handleChange(index, 'question', e.target.value)}
              className="w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder={`Вопрос ${index + 1}`}
            />
         <p className="inline-block rounded-lg bg-gray-300  p-1 ">Ответ на {index+1} вопрос:</p>

            <textarea
              value={faqItem.answer}
              onChange={(e) => handleChange(index, 'answer', e.target.value)}
              className="w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder={`Ответ на вопрос ${index + 1}`}
              rows={4}
            />
          </div>
        ))
      )}
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        {loading ? 'Сохранение...' : 'Сохранить изменения'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default FaqEditor;
