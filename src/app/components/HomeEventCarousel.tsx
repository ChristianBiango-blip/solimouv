"use client";

import Image from "next/image";
import { useRef } from "react";

type EventCard = {
  title: string;
  description: string;
  image: string;
  alt: string;
  imageClassName?: string;
};

type HomeEventCarouselProps = {
  events: EventCard[];
};

export default function HomeEventCarousel({ events }: HomeEventCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("article");
    const gap = 20;
    const offset = (card ? card.getBoundingClientRect().width : 280) + gap;
    track.scrollBy({ left: direction === "next" ? offset : -offset, behavior: "smooth" });
  };

  return (
    <div className="flex items-center gap-3 rounded-[32px] bg-[#f7f4ee] p-4 sm:gap-4 sm:p-5">

      {/* Bouton précédent */}
      <button
        type="button"
        aria-label="Carte précédente"
        onClick={() => scrollByCard("prev")}
        className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-accent text-2xl font-bold text-white transition-all hover:bg-brand-secondary hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent/30"
      >
        <span aria-hidden="true">‹</span>
      </button>

      {/* Piste */}
      <div
        ref={trackRef}
        role="region"
        aria-label="Moments d'événements Solimouv"
        tabIndex={0}
        className="flex min-w-0 flex-1 gap-5 overflow-x-auto pb-3 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {events.map((event) => (
          <article
            key={event.title}
            className="
              flex shrink-0 flex-col overflow-hidden rounded-[28px]
              border border-brand-primary/15 bg-white
              transition-transform hover:-translate-y-1.5
              [scroll-snap-align:start]
              w-full
              sm:w-72
              lg:w-80
            "
          >
            <div className="relative min-h-[220px] bg-gradient-to-br from-brand-primary to-brand-secondary sm:min-h-[280px] lg:min-h-[320px]">
              <Image
                className={`absolute inset-0 h-full w-full object-cover${event.imageClassName ? ` ${event.imageClassName}` : ""}`}
                src={event.image}
                alt={event.alt}
                fill
                sizes="(max-width: 640px) calc(100vw - 140px), (max-width: 1024px) 288px, 320px"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5 pb-6">
              <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{event.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Bouton suivant */}
      <button
        type="button"
        aria-label="Carte suivante"
        onClick={() => scrollByCard("next")}
        className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-accent text-2xl font-bold text-white transition-all hover:bg-brand-secondary hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent/30"
      >
        <span aria-hidden="true">›</span>
      </button>

    </div>
  );
}
