import React from 'react';
import { Users } from "lucide-react";
import ShinyText from '@/app/Animations/ShinyText';
import SplitText from '@/app/Animations/SplitText';

const teamCategories = [
  {
    title: 'Technical',
    description: 'Hackathons, workshops, and the infrastructure behind every TSS event.',
    textColor: 'text-white',
    bgClass: 'bg-center',
    // backgroundurl: '/images/gradientBase5.jpg',
    backgroundurl: '/images/gradientBase12.jpg',
    illustration: '/images/illustrations/technical2.png'
  },
  {
    title: 'Sports',
    description: 'Organizes inter-college sports events and builds athletic excellence.',
    textColor: 'text-black dark:text-white',
    bgClass: 'bg-top',
    backgroundurl: '/images/gradientBas.jpg',
    illustration: '/images/illustrations/sports2.png'
  },
  {
    title: 'Placement',
    description: 'Connects students with recruiters & prepares them for their career.',
    textColor: 'text-white',
    bgClass: 'bg-top',
    backgroundurl: '/images/gradientBase4.jpg',
    illustration: '/images/illustrations/placement.png'
  },
  {
    title: 'Cultural',
    description: 'Fests, performances, and everything that makes campus life memorable.',
    textColor: 'text-neutral-900',
    bgClass: 'bg-left',
    // backgroundurl: '/images/gradientBase4.jpg',
    backgroundurl: '/images/gradientBase11.jpg',
    illustration: '/images/illustrations/cultural.png'
  },
  {
    title: 'Alumni',
    description: 'Bridges alumni with current students through mentorship and networks.',
    textColor: 'text-black dark:text-white',
    bgClass: 'bg-bottom',
    backgroundurl: '/images/gradientBas3.jpg',
    illustration: '/images/illustrations/almuni.png'
  },
  {
    title: 'Sponsorship',
    description: 'Secures partnerships and funds that keep TSS events running at full scale.',
    textColor: 'text-neutral-900',
    bgClass: 'bg-top',
    backgroundurl: '/images/gradientBase11.jpg',
    illustration: '/images/illustrations/sponsorship2.png'
  },
  {
    title: 'Content & Media',
    description: 'Documents, shoots, and tells the story of TSS across every channel.',
    textColor: 'text-white',
    bgClass: 'bg-[center_right]',
    backgroundurl: '/images/gradientBase12.jpg',
    illustration: '/images/illustrations/content2.png'
  },
  {
    title: 'Design',
    description: 'Crafts the visual identity of TSS from event creatives to the digital experience.',
    textColor: 'text-black dark:text-white',
    bgClass: 'bg-center',
    backgroundurl: '/images/gradientBas.jpg',
    illustration: '/images/illustrations/design2.png'
  },
];

const marquee = [...teamCategories, ...teamCategories]

export default function HomeTeamSectionSimple() {
  return (
    <section className="w-full py-20 dark:bg-siteblack overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 lg:px-20 xl:px-32">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <p className="text-xs flex gap-2 items-center font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
              <Users size={16} />
              <ShinyText
                text="Our Teams"
                speed={2.8}
                color="#b5b5b5"
                shineColor="#ffffff"
              />
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 max-w-md leading-tight">
               <SplitText text="Our Core Team Divisions" delay={25}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              showCallback={false}
              textAlign="start" />
            </h2>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed md:text-right">
            Specialized teams working in sync — each driving a different dimension of student life at GNDU.
          </p>
        </div>

        {/* Cards grid */}
        <div className="flex flex-row h-80 gap-4 slide-animation overflow-hidden">
          {marquee.map((category) => (
            <div
              key={category.title}
              className="group relative flex flex-col justify-between rounded-xl border border-neutral-400 dark:border-neutral-800 p-6 hover:-translate-y-0.5 transition-all duration-300 aspect-square overflow-hidden shadow-lg shadow-neutral-200/50 dark:shadow-none"
            >
              {/* Background Image */}
              <div
                className={`absolute inset-0 bg-cover ${category.bgClass} transition-transform duration-700 group-hover:scale-110`}
                style={{ backgroundImage: `url(${category.backgroundurl})` }}
              />

              {/* Dark Overlay */}
              {/* <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500" /> */}
              <div className="absolute inset-0 bg-black/5 dark:bg-black/30 " />



              {/* Text Area at Top */}
              <div className={`relative z-20 ${category.textColor}`}>
                <h3 className="text-2xl font-openai mb-2">
                  {category.title}
                </h3>
                <div className="opacity-90">
                  <p className="text-sm leading-relaxed">
                    {category.description}
                  </p>
                  {/* Illustration at bottom center */}
                  {category.illustration && (
                    <div className="relative max-sm:-bottom-5 left-1/2 -translate-x-1/2 w-52 h-52 group-hover:scale-105 transition-all duration-500 pointer-events-none z-10">
                      <img
                        src={category.illustration}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
