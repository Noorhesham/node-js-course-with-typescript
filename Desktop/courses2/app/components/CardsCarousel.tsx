"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useTranslations } from "next-intl";

export function AppleCardsCarouselDemo() {
  const t = useTranslations("Carousel");
  const data = [
    {
      category: t("businessTitle1"),
      title: t("businessTitle1"),
      src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop",
      content: <BusinessStrategyContent />,
    },
    {
      category: t("marketingTitle"),
      title: t("marketingTitle"),
      src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop",
      content: <MarketingContent />,
    },
    {
      category: t("leadershipTitle"),
      title: t("leadershipTitle"),
      src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop",
      content: <LeadershipContent />,
    },
    {
      category: t("financeTitle"),
      title: t("financeTitle"),
      src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop",
      content: <FinanceContent />,
    },
    {
      category: t("entrepreneurshipTitle"),
      title: t("entrepreneurshipTitle"),
      src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop",
      content: <EntrepreneurshipContent />,
    },
  ];

  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />);

  return (
    <div className="w-full pb-5 h-full ">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        {t("title")}
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const BusinessStrategyContent = () => {
  const t = useTranslations("DummyContent.businessContent");

  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <h3 className="font-bold text-2xl text-neutral-700 dark:text-neutral-200">{t("headline")}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl mt-2">{t("description")}</p>
      <Image
        src="https://assets.aceternity.com/macbook.png"
        alt="Business Strategy"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
    </div>
  );
};

const MarketingContent = () => {
  const t = useTranslations("DummyContent.marketingContent");

  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <h3 className="font-bold text-2xl text-neutral-700 dark:text-neutral-200">{t("headline")} </h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl mt-2">{t("description")}</p>
      <Image
        src="https://assets.aceternity.com/macbook.png"
        alt="Marketing"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
    </div>
  );
};

const LeadershipContent = () => {
  const t = useTranslations("DummyContent.leadershipContent");

  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <h3 className="font-bold text-2xl text-neutral-700 dark:text-neutral-200">{t("headline")}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl mt-2">{t("description")}</p>
      <Image
        src="https://assets.aceternity.com/macbook.png"
        alt="Leadership"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
    </div>
  );
};

const FinanceContent = () => {
  const t = useTranslations("DummyContent.financeContent");

  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <h3 className="font-bold text-2xl text-neutral-700 dark:text-neutral-200">{t("headline")}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl mt-2">{t("description")}</p>
      <Image
        src="https://assets.aceternity.com/macbook.png"
        alt="Finance"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
    </div>
  );
};

const EntrepreneurshipContent = () => {
  const t = useTranslations("DummyContent");

  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <h3 className="font-bold text-2xl text-neutral-700 dark:text-neutral-200">{t("entrepreneurshipHeadline")}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl mt-2">
        {t("entrepreneurshipDescription")}
      </p>
      <Image
        src="https://assets.aceternity.com/macbook.png"
        alt="Entrepreneurship"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
    </div>
  );
};
