import React, { useState } from 'react';
import { ChevronDown, CircleHelp } from 'lucide-react';
import SplitText from '@/app/Animations/SplitText';

const faqs = [
  {
    question: "Who can join TSS?",
    answer:
      "Any student currently enrolled in Guru Nanak Dev University with a passion for technology, design, or management is welcome to join our community.",
  },
  {
    question: "Are there any membership fees?",
    answer:
      "No, membership to the Technical Student Society is completely free. We focus on talent, dedication, and the collective growth of our members.",
  },
  {
    question: "What kind of events do you host?",
    answer:
      "We organize a variety of events including hands-on technical workshops, annual hackathons, coding competitions, and industrial guest lectures.",
  },
  {
    question: "How can I stay updated?",
    answer:
      'You can keep an eye on our "Events" page or follow our official social media handles for the latest announcements and registration links.',
  },
];

export default function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 dark:bg-siteblack">
      <div className="container mx-auto px-4 md:px-12 lg:px-20 xl:px-32">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            <SplitText
              text="Common Questions"
              delay={25}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              showCallback={false}
            />
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mx-auto max-w-2xl text-base">
            Everything you need to know about getting involved with TSS GNDU.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-siteblack">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer">
                  <div className="flex items-center gap-3">
                    <CircleHelp className={`w-5 h-5 shrink-0 transition-colors duration-300 ${isOpen ? 'text-indigo-500 dark:text-blue-500' : 'text-neutral-400 dark:text-neutral-500'}`} />
                    <span className={`text-base font-semibold transition-colors duration-300 ${isOpen ? 'text-indigo-600 dark:text-blue-500' : 'text-neutral-900 dark:text-neutral-50'}`}>
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-neutral-400 dark:text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`}
                  />
                </button>

                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 pl-14 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}