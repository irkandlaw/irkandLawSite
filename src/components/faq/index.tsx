import { useState } from 'react';
import textJsonRu from '../../locale/texts-site-ru.json';

interface FaqItem {
  question: string;
  answer: string;
}

const Faq = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  const isAccordionActive = (index: number) => {
    return activeAccordion === index;
  };

  // Используем правильную структуру для FAQ
  const faqItems: FaqItem[] = textJsonRu.faq.faqs;

  return (
    <section className="absolute z-10 inset-2  justify-center items-center  " >
      <div className="  max-w-[800px] left-50 rounded-3xl  p-8">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-white lg:mb-8 lg:text-3xl">
          {textJsonRu.faq.faq_title}
        </h2>
        <div className="mx-auto">
          <div id="accordion-flush" data-accordion="collapse">
            {faqItems.map((item, index) => (
              <div key={index}>
                <h3 id={`accordion-flush-heading-${index + 1}`}>
                  <button
                    type="button"
                    className={`flex w-full py-5 font-medium text-left items-center justify-between ${
                      isAccordionActive(index)
                        ? 'text-white rounded-lg p-2 bg-gray-600 border-b border-gray-500'
                        : 'text-gray-400  border-b border-gray-500'
                    }`}
                    onClick={() => handleAccordionClick(index)}
                    aria-expanded={isAccordionActive(index)}
                    aria-controls={`accordion-flush-body-${index + 1}`}
                  >
                    <span>{item.question}</span>
                    <svg
                      className={`w-6 h-6 ${isAccordionActive(index) ? 'rotate-180' : ''}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </h3>
                <div
                  id={`accordion-flush-body-${index + 1}`}
                  className={`${isAccordionActive(index) ? '' : 'hidden'} py-5 border-b border-gray-500`}
                  aria-labelledby={`accordion-flush-heading-${index + 1}`}
                >
                  <p className="mb-2 bg-gray-600 p-2 rounded-lg text-gray-300">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
