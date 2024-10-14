import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
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

const InfiniteScrollMobile: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 1 });

  const containerRef = useRef<HTMLDivElement>(null);

  const loadMoreCards = useCallback(() => {
    if (cards.length >= allCardsData.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setCards((prevCards) => [
        ...prevCards,
        ...allCardsData.slice(prevCards.length, prevCards.length + 3),
      ]);
    }, 1000);
  }, [cards]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreCards();
    }
  }, [inView, hasMore, loadMoreCards]);

  useEffect(() => {
    // Запуск таймера для добавления карточек каждые 2 секунды
    const intervalId = setInterval(() => {
      if (hasMore) {
        loadMoreCards();
      }
    }, 2000);

    return () => clearInterval(intervalId); // Очистка интервала при размонтировании
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
        const cardCenter = rect.top + rect.height / 2;
        const center = viewportHeight / 2;
        const distance = Math.abs(center - cardCenter);
        const maxDistance = viewportHeight / 2;

        // Calculate opacity based on distance from center (inverse effect)
        const opacity = Math.min(1, distance / maxDistance);
        cardElement.style.opacity = `${opacity}`;
        cardElement.style.transform = `translateX(${(Math.random() - 0.5) * 20}px)`;
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
                transition: 'opacity 0.5s ease, transform 0.3s ease',
              }}
            >
              <Card title={card.title} description={card.description} />
            </div>
          ))}
          {hasMore ? (
            <div ref={ref} className="h-4" /> // Trigger point for loading more
          ) : (
            <div className="p-4 text-center text-gray-600"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollMobile;
