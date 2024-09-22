"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CarouselCard } from "./carousels/carousel-card";
import { CheckboxCard } from "./checkbox-card";
import data from "../public/database.json"; // Ensure this path is correct

interface CardsListProps {
  platform: string;
  feature: string;
}

const GridCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "grid content-start [--column-gap:12px] md:[--column-gap:24px] gap-x-[--column-gap] gap-y-8 md:gap-y-10 [--min-column-width:169px] md:[--min-column-width:208px] lg:[--min-column-width:243px] [--max-column-count:7] [--total-gap-width:calc((var(--max-column-count)-1)*var(--column-gap))] [--max-column-width:calc((100%-var(--total-gap-width))/var(--max-column-count))] grid-cols-[repeat(auto-fill,minmax(max(var(--min-column-width),var(--max-column-width)),1fr))]"
      )}
    >
      {children}
    </div>
  );
};

const FeatureComponent = ({ feature }: { feature: string }) => {
  switch (feature) {
    case "apps":
      return <AppsComponent />;
    case "screens":
      return <ScreensComponent />;
    case "ui-elements":
      return <UiElementsComponent />;
    case "flows":
      return <FlowsComponent />;
    default:
      return null;
  }
};

const AppsComponent = () => {
  const [mockData, setMockData] = useState<Array<any> | null>(null);

  useEffect(() => {
    // Set mockData to data.images, since that's the array you want to work with
    if (data && Array.isArray(data)) {
      setMockData(data);
    }
  }, []);

  return (
    <GridCard>
      {mockData &&
        mockData.map((item, index) => (
          <CarouselCard
      key={index}
      title={`Card Title ${index + 1}`} // You can replace this with actual titles if you have them
      images={[
        { title: item.images[0].title || `Image ${index + 1}`, url: item.images[0].url || "" } // Replace this with real image data
      ]}
    />
        ))}
    </GridCard>
  );
};

const ScreensComponent = () => (
  <GridCard>
    {Array.from({ length: 10 }).map((_, index) => (
      <CheckboxCard key={index} id={index} />
    ))}
  </GridCard>
);

const UiElementsComponent = () => (
  <GridCard>
    {Array.from({ length: 10 }).map((_, index) => (
      <CheckboxCard key={index} id={index} />
    ))}
  </GridCard>
);

const FlowsComponent = () => (
  <GridCard>
    {Array.from({ length: 10 }).map((_, index) => (
      <CarouselCard key={index} />
    ))}
  </GridCard>
);

export function CardsList({ platform, feature }: CardsListProps) {
  return <FeatureComponent feature={feature} />;
}
