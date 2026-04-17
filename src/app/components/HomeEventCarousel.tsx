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

    const firstCard = track.querySelector<HTMLElement>(".landing-event-card");
    const offset = firstCard ? firstCard.getBoundingClientRect().width + 22 : 320;

    track.scrollBy({
      left: direction === "next" ? offset : -offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="landing-event-carousel">
      <button
        className="landing-carousel-nav"
        type="button"
        aria-label="Image précédente"
        onClick={() => scrollByCard("prev")}
      >
        <span aria-hidden="true">‹</span>
      </button>

      <div
        ref={trackRef}
        className="landing-event-track"
        aria-label="Moments d'événements Solimouv"
      >
        {events.map((event) => (
          <article key={event.title} className="landing-event-card">
            <div className="landing-event-art">
              <Image
                className={event.imageClassName}
                src={event.image}
                alt={event.alt}
                width={720}
                height={640}
                sizes="(max-width: 640px) 86vw, (max-width: 960px) 72vw, 32vw"
              />
            </div>
            <div className="landing-event-copy">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </article>
        ))}
      </div>

      <button
        className="landing-carousel-nav"
        type="button"
        aria-label="Image suivante"
        onClick={() => scrollByCard("next")}
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
