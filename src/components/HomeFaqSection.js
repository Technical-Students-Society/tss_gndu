import React from 'react';
import { HelpCircle, Users, Gift, Zap, Bell } from 'lucide-react';

const faqs = [
  {
    question: "Who can join TSS?",
    answer:
      "Any student currently enrolled in Guru Nanak Dev University with a passion for technology, design, or management is welcome to join our community.",
    icon: Users,
  },
  {
    question: "Are there any membership fees?",
    answer:
      "No, membership to the Technical Student Society is completely free. We focus on talent, dedication, and the collective growth of our members.",
    icon: Gift,
  },
  {
    question: "What kind of events do you host?",
    answer:
      "We organize a variety of events including hands-on technical workshops, annual hackathons, coding competitions, and industrial guest lectures.",
    icon: Zap,
  },
  {
    question: "How can I stay updated?",
    answer:
      'You can keep an eye on our "Events" page or follow our official social media handles for the latest announcements and registration links.',
    icon: Bell,
  },
];

export default function HomeFaqSection() {
  return (
    <section className="w-full py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-12 lg:px-20 xl:px-32">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Common Questions
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mx-auto max-w-2xl text-base">
            Everything you need to know about getting involved with TSS GNDU.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {faqs.map((faq) => {
            const Icon = faq.icon;
            return (
              <div
                key={faq.question}
                className="group p-7 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-black hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md dark:hover:shadow-neutral-950/30 transition-all duration-300 space-y-4"
              >
                {/* Icon */}
                <div className='flex items-center gap-4'>

                  <div className="inline-flex p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  </div>

                  {/* Question */}
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {faq.question}
                  </h3>
                </div>

                {/* Answer */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="top-20 relative mx-15 max-sm:mx-5 dark:border-neutral-800" />
    </section>
  );
}