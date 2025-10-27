import React from 'react';
import Carousel from '../../common/Carousel';

const AccessibilityCarousel = () => {
  // Accessibility information for the carousel
  const accessibilityInfo = [
    {
      id: 1,
      title: "Motor Disabilities",
      description: "Users with motor disabilities may rely on keyboard navigation, voice commands, or specialized devices.",
      iconEmoji: "🦽",
      bgColor: "bg-blue-600",
      imageUrl: "/wheelchair.jpeg",
      alt: "Wheelchair representing motor disabilities accessibility"
    },
    {
      id: 2,
      title: "Visual Impairments",
      description: "Provide text alternatives for images, use sufficient color contrast, and ensure content is readable.",
      iconEmoji: "👁️",
      bgColor: "bg-green-600",
      imageUrl: "/ObstacleDetector.jpeg",
      alt: "Smart cane representing visual impairments accessibility"
    },
    {
      id: 3,
      title: "Hearing Impairments",
      description: "Include captions for videos, transcripts for audio content, and visual alternatives for audio cues.",
      iconEmoji: "👂",
      bgColor: "bg-yellow-600",
      imageUrl: "/behind_the_ear.jpeg",
      alt: "Hearing aid representing hearing impairments accessibility"
    },
    {
      id: 4,
      title: "Cognitive Disabilities",
      description: "Use clear language, consistent navigation, and avoid complex interactions.",
      iconEmoji: "🧠",
      bgColor: "bg-purple-600",
      imageUrl: "/SensoryToyKitforAutism.jpeg",
      alt: "Sensory toy kit representing cognitive disabilities accessibility"
    },
    {
      id: 5,
      title: "Why Accessibility Matters",
      description: "Accessible websites reach more users, improve SEO, ensure legal compliance, and demonstrate social responsibility.",
      iconEmoji: "♿",
      bgColor: "bg-red-600",
      imageUrl: "/accessibility.png",
      alt: "Universal accessibility symbol"
    }
  ];

  const renderCarouselItem = (item) => (
    <div className={`relative w-full h-64 md:h-80 ${item.bgColor} bg-opacity-10 rounded-lg`}>
      <div className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="text-6xl mb-6" aria-hidden="true">{item.iconEmoji}</div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
          <p className="text-gray-700">{item.description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      {/* Skip link for carousel */}
      <a 
        href="#search-filter-heading" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white focus:rounded focus:left-4 focus:top-4"
      >
        Skip carousel
      </a>
      <h2 className="sr-only">Accessibility Showcase</h2>
      <Carousel 
        items={accessibilityInfo}
        renderItem={renderCarouselItem}
        autoPlay={true}
        interval={6000}
        showDots={true}
        showArrows={true}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

export default AccessibilityCarousel;
