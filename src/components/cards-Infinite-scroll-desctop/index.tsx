import React, { useState, useEffect, useCallback, useRef } from 'react';
import Card from '../card';

interface CardData {
  id: number;
  title: string;
  description: string;
}

const allCardsData: CardData[] = [
  { id: 1, title: 'Защита в суде', description: 'Правовое сопровождение дела' },
  { id: 2, title: 'Семейное право', description: 'Разводы, раздел имущества, алименты, споры о детях — мы поможем вам отстоять ваши интересы и права' },
  { id: 3, title: 'Уголовное право', description: 'Защита на всех этапах уголовного процесса, включая подготовку к суду, апелляции и представительство в суде' },
  { id: 4, title: 'Имущественные споры', description: 'Защита ваших прав на недвижимость, наследственные споры, аренда и покупка недвижимости' },
  { id: 5, title: 'Административные дела', description: 'Помощь в спорах с госорганами, включая обжалование штрафов и решений госучреждений' },
  { id: 6, title: 'Наследственные дела', description: 'Помощь в оформлении наследства, разрешение споров между наследниками, оспаривание завещаний' },
];

const InfiniteScrollDesktop: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Изменено: убрал использование inView и сделал таймер для загрузки карточек
  const loadMoreCards = useCallback(() => {
    if (cards.length >= allCardsData.length) {
      setHasMore(false);
      return;
    }

    setCards((prevCards) => [
      ...prevCards,
      ...allCardsData.slice(prevCards.length, prevCards.length + 3),
    ]);
  }, [cards]);

  // Изменено: добавляем карточки через интервалы времени, а не на основе inView
  useEffect(() => {
    if (hasMore) {
      const interval = setInterval(() => {
        loadMoreCards();
      }, 2000); // Загружаем карточки каждые 2 секунды
      return () => clearInterval(interval);
    }
  }, [hasMore, loadMoreCards]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const cardsElements = Array.from(container.getElementsByClassName('card-item'));

      const viewportHeight = window.innerHeight;

      cardsElements.forEach((el) => {
        const cardElement = el as HTMLElement;
        const rect = cardElement.getBoundingClientRect();
        const center = viewportHeight / 2;
        const distance = Math.abs(center - (rect.top + rect.height / 2));
        const maxDistance = viewportHeight / 2;

        const opacity = Math.max(0.1, 1 - (distance / maxDistance));
        cardElement.style.opacity = `${opacity}`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mt-56 min-h-screen flex flex-col items-center justify-center p-2">
      <div ref={containerRef} className="w-full max-w-4xl">
        <div className="flex flex-col space-y-4">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`w-full flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} card-item`}
              style={{
                transition: 'opacity 0s ease, transform 0.3s ease',
                transform: `translateX(${(Math.random() - 0.5) * 20}px)`,
              }}
            >
              <Card title={card.title} description={card.description} />
            </div>
          ))}
          {!hasMore && (
            <div className="p-4 text-center text-gray-600"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollDesktop;
