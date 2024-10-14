// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import textJsonRu from '../../locale/texts-site-ru.json';
import { FaEdit } from 'react-icons/fa';
import Modal from 'react-modal';
import { GoLaw } from 'react-icons/go';
import RotatingImage from '../page-scroll-rotate-image';
import FadeInScrollTopToCenter from '../../components/animated-section';
import CursorFollower from '../../components/cursor-follower';
import { GITREPO, GITREPOSITORY_OWNER } from '../../constants/globalVar';
import { useAuth } from '../../app/auth/AuthContext';
import { editJsonFileOneKey } from '../../components/api-github/json-editor/git-file-json-editor-one-key';
import { getFileContent } from '../../components/api-github/utils/useGetFileContent';
import AdminMenu from '../../app/menu-admin';
import MainQuiz from '../../components/quiz-questions/main-quiz';
import { Link } from 'react-router-dom';
import SectionThree from '../../components/section-three';



const Home: React.FC = () => {

    const owner = GITREPOSITORY_OWNER;
    const repo = GITREPO;
    const path = 'src/locale/texts-site-ru.json';
    const { isAuthenticated } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentText, setCurrentText] = useState('');
    const [currentKey, setCurrentKey] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fileContent, setFileContent] = useState<any>({});
    const [changes, setChanges] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string | null>(null);
    if (error) { console.log("Error HomePage", error); }

    const fetchFile = async () => {
        try {
          const data = await getFileContent(owner, repo, path);
          const jsonContent = JSON.parse(decodeURIComponent(escape(atob(data.content))));
          setFileContent(jsonContent);
        } catch (err) {
          setError('Ошибка при загрузке файла');
          console.error(err);
        }
      };
    
      useEffect(() => {
        fetchFile();
      }, []);
    
      const openModal = (key: string, text: string) => {
        setCurrentText(text);
        setCurrentKey(key);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setCurrentKey(null);
      };
    
      const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setCurrentText(e.target.value);
      };
    
      const saveChanges = () => {
        if (!currentKey) return;
    
        setChanges((prevChanges) => ({
          ...prevChanges,
          [currentKey]: currentText,
        }));
    
        closeModal();
      };
    
      const publishChanges = async () => {
        setIsLoading(true);
        try {
          for (const [key, text] of Object.entries(changes)) {
            await editJsonFileOneKey(key, text);
          }
          setFileContent((prevContent: any) => ({
            ...prevContent,
            ...changes,
          }));
          setChanges({}); // Сбрасываем изменения после публикации
        } catch (error) {
          console.error('Ошибка при публикации изменений:', error);
          setError('Ошибка при публикации изменений');
        } finally {
          setIsLoading(false);
        }
      };

    return (
        <>
        {isAuthenticated && <AdminMenu />}
        {isAuthenticated && (
          <button onClick={publishChanges} className="fixed p-3 rounded-lg left-[300px] bg-green-500 text-white mt-4">
            {isLoading ? "Обновление" : "Опубликовать изменения"}
          </button>
        )}
        <MainQuiz  />
         <CursorFollower />
            <div className="relative border-y border-zinc-800" id="homeMain">
                <div className="mx-auto max-w-screen-xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                    <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
                        <div className="mx-auto max-w-lg lg:mx-0">
                            <Link to="/" className="inline-flex items-center gap-3 font-light tracking-tight text-white" >
                                <span></span>
                                <GoLaw />
                                <span> {changes['home.icon_text_title'] || fileContent.home?.icon_text_title || textJsonRu.home.icon_text_title}</span>
                                {isAuthenticated && (
          <FaEdit onClick={() => openModal('home.icon_text_title', changes['home.icon_text_title'] || fileContent.home?.icon_text_title || textJsonRu.home.icon_text_title)} className="ml-2 text-white cursor-pointer" />
        )}
                            </Link>
                            <p className='inline-flex items-center gap-3 font-light tracking-tight text-white'></p>
                            <h1 className="mt-8 text-4xl font-light lg:text-6xl text-balance tracking-tight text-white uppercase font-serif">
                            {changes['home.title'] || fileContent.home?.title || textJsonRu.home.title}
                            </h1>
                            {isAuthenticated && (
                <FaEdit onClick={() => openModal('home.title', changes['home.title'] || fileContent.home?.title || textJsonRu.home.title)} className="ml-2 text-white cursor-pointer" />
              )}
                            <h2 className="mt-6 text-lg leading-8 font-light lg:text-xl text-zinc-400">
                            {changes['home.subtitle'] || fileContent.home?.subtitle || textJsonRu.home.subtitle}
                            </h2>
                            {isAuthenticated && (
                <FaEdit onClick={() => openModal('home.subtitle', changes['home.subtitle'] || fileContent.home?.subtitle || textJsonRu.home.subtitle)} className="ml-2 text-white cursor-pointer" />
              )}
                        </div>
                    </div>
                    <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
                        <img
                            className="aspect-[3/4] w-full bg-black object-cover transform grayscale lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                            src="/assets/images/main-photo.jpg"
                            alt=""
                        />
                    </div>
                </div>
                {/* Индикатор конца страницы */}
                <div id="home-end-indicator" className="fixed top-0 left-0 right-0 h-1 bg-gray-500 z-50"></div>
            </div>

             {/* Плавное появление компонента при прокрутке */}
      <FadeInScrollTopToCenter />

<div className="relative">
  <div className="z-10 h-[3000px]">
    <RotatingImage />
  </div>
</div>

<SectionThree />
<Modal isOpen={isModalOpen} onRequestClose={closeModal} className="">

          <div className="text-lg font-bold mb-4">Редактировать текст:</div>
          <textarea value={currentText} onChange={handleTextChange} className="w-full h-32 border p-2" />
          <div className="mt-4 flex justify-between">
            <button onClick={saveChanges} className="bg-blue-500 text-white py-2 px-4 rounded">Сохранить</button>
            <button onClick={closeModal} className="bg-red-400 text-white py-2 px-4 rounded">Отмена</button>
          </div>
        </Modal>
        </>
    );
}

export default Home;