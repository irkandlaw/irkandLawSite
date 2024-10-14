// src/components/QuizEditor.tsx
import React, { useState } from 'react';
import quizQuestionsData from './quizQuestions.json'; // Импортируйте ваши вопросы из файла
import { GITHUB_API_URL, GITHUB_TOKEN, GITREPO, GITREPOSITORY_OWNER } from '../../constants/globalVar';
import { updateFileContent } from '../api-github/utils/useUpdateFileContent';

const QuizEditor: React.FC = () => {
  const [quizData, setQuizData] = useState<any>(quizQuestionsData); // Инициализация данными из файла
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (index: number, key: string, value: string) => {
    const updatedQuestions = [...quizData.questions];
    if (key === 'question') {
      updatedQuestions[index].question = value;
    } else {
      updatedQuestions[index].options = updatedQuestions[index].options.map((option: string, i: number) => {
        return i === parseInt(key) ? value : option;
      });
    }
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleTitleChange = (value: string) => {
    setQuizData({ ...quizData, title: value });
  };

  const handleButtonTextChange = (value: string) => {
    setQuizData({ ...quizData, buttonText: value });
  };

  const handleSave = async () => {
    try {
      const owner = GITREPOSITORY_OWNER; // Имя владельца репозитория
      const repo = GITREPO;
      const path = 'src/components/quiz-questions/quizQuestions.json'; // Путь к вашему файлу
      setLoading(true);
      
      // Кодируем JSON
      const encodedContent = btoa(unescape(encodeURIComponent(JSON.stringify(quizData, null, 2)))); // Кодируем JSON

      // Обновление содержимого файла с использованием текущего SHA
      const updatedContent = {
        message: 'Update quiz questions',
        content: encodedContent,
        sha: '', // Здесь будет актуальный SHA, который мы получим далее
      };

      // Получаем SHA текущего файла
      const response = await fetch(`${GITHUB_API_URL}/${owner}/${repo}/contents/${path}`, {
        method: 'GET',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка загрузки содержимого файла: ${response.statusText}`);
      }
      
      const data = await response.json();
      updatedContent.sha = data.sha; // Получаем актуальный SHA файла

      // Отправка запроса на обновление файла
      await updateFileContent(owner, repo, path, updatedContent);
      setLoading(false);
      alert('Файл успешно обновлен!');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Редактор:</h2>
      <p className="inline-block rounded-lg bg-green-300 text-xl p-1 font-bold">Заголовок и кнопка</p>
      <input
        type="text"
        value={quizData.title}
        onChange={(e) => handleTitleChange(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Введите заголовок"
      />
      <input
        type="text"
        value={quizData.buttonText}
        onChange={(e) => handleButtonTextChange(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Введите текст кнопки"
      />
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        quizData.questions.map((question: any, index: any) => (
          <div key={index} className="mb-4">
<p className="inline-block rounded-lg bg-green-300 text-xl p-1 font-bold">
    Вопрос {index + 1}
</p>
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleChange(index, 'question', e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Введите вопрос"
            />
          <p className="rounded-lg bg-gray-300 text-xl p-1 font-bold">Ответы для вопроса {index+1}</p>

            {question.options.map((option: any, i: any) => (<>
           
              <input
                key={i}
                type="text"
                value={option}
                onChange={(e) => handleChange(index, i.toString(), e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
                placeholder={`Опция ${i + 1}`}
              />
               </>
            ))}
          </div>
        ))
      )}
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        {loading ? 'Сохранение' : 'Сохранить изменения'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default QuizEditor;
