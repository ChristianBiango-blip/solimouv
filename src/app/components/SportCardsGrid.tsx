import Link from "next/link";

export type SportCard = {
  id: string;
  label: string;
  image: string;
  badge: string;
  wide?: boolean;
  tall?: boolean;
  extraImage?: string;
  href?: string;
  keywords: string[];
};

export const SPORT_CARDS: SportCard[] = [
  {
    id: "yoga",
    label: "Yoga Adapté",
    image: "/yoga.svg",
    badge: "#ff270b",
    href: "/yoga",
    keywords: ["yoga", "adapte", "adapté", "bien-etre", "bien-être"],
  },
  {
    id: "boxe",
    label: "Boxe Mixte",
    image: "/boxe.svg",
    badge: "#10e3ff",
    keywords: ["boxe", "combat", "mixte"],
  },
  {
    id: "basket",
    label: "Basket",
    image: "/basket.svg",
    badge: "#ff8707",
    tall: true,
    keywords: ["basket", "basketball", "panier"],
  },
  {
    id: "foot",
    label: "Foot",
    image: "/foot.svg",
    badge: "#00ff44",
    tall: true,
    keywords: ["foot", "football", "ballon"],
  },
  {
    id: "badminton",
    label: "Badminton",
    image: "/badminton.svg",
    extraImage: "/badminton2.svg",
    badge: "#4200fe",
    wide: true,
    keywords: ["badminton", "raquette", "volant"],
  },
];

function SportCardInner({ card }: { card: SportCard }) {
  return (
    <>
      <span className="absolute left-2.5 top-3 z-10 font-black italic text-[13px] uppercase leading-none tracking-[-0.06em] text-[#211f1f] sm:text-[15px]">
        {card.label}
      </span>
      <span
        className="absolute right-2 top-2 z-10 h-6 w-6 rounded-full"
        style={{ backgroundColor: card.badge }}
      />

      {card.wide ? (
        <>
          <img
            src={card.image}
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 left-0 top-7 w-[45%] object-contain"
            style={{ objectPosition: "left bottom" }}
          />
          {card.extraImage && (
            <img
              src={card.extraImage}
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 right-0 top-7 w-[45%] object-contain"
              style={{ objectPosition: "right bottom" }}
            />
          )}
        </>
      ) : (
        <img
          src={card.image}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 top-7 w-[80%] object-contain"
          style={{ objectPosition: "right bottom" }}
        />
      )}
    </>
  );
}

function SportCard({ card }: { card: SportCard }) {
  const className = `relative overflow-hidden rounded-[13px] bg-white ${
    card.tall ? "h-[218px]" : "h-[144px]"
  } ${card.wide ? "w-full" : "flex-1"}`;

  if (card.href) {
    return (
      <Link
        href={card.href}
        className={`${className} transition-opacity hover:opacity-90`}
        aria-label={card.label}
      >
        <SportCardInner card={card} />
      </Link>
    );
  }

  return (
    <div className={className}>
      <SportCardInner card={card} />
    </div>
  );
}

export default function SportCardsGrid({
  cards = SPORT_CARDS,
}: {
  cards?: SportCard[];
}) {
  const row1 = cards.filter((c) => !c.tall && !c.wide);
  const row2 = cards.filter((c) => c.tall);
  const row3 = cards.filter((c) => c.wide);

  return (
    <div className="flex flex-col gap-2">
      {row1.length > 0 && (
        <div className="flex gap-2">
          {row1.map((card) => (
            <SportCard key={card.id} card={card} />
          ))}
        </div>
      )}
      {row2.length > 0 && (
        <div className="flex gap-2">
          {row2.map((card) => (
            <SportCard key={card.id} card={card} />
          ))}
        </div>
      )}
      {row3.map((card) => (
        <SportCard key={card.id} card={card} />
      ))}
    </div>
  );
}
