"use client";

import { ContextMenuCard } from "@/components/context-menu-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CarouselCard({
  title,
  images,
}: {
  title: string;
  images: { title?: string; url?: string }[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [scrollPrev, setScrollPrev] = useState<boolean>(false);
  const [scrollNext, setScrollNext] = useState<boolean>(true);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setScrollPrev(api.canScrollPrev());
      setScrollNext(api.canScrollNext());
    });
  }, [api]);

  return (
    <ContextMenuCard>
      <div className="group relative flex flex-col gap-y-3 md:gap-y-4">
        <Link href="/" className="peer absolute inset-0 z-10" />

        <div className="relative rounded-[28px] overflow-hidden w-full hidden md:block md:bg-foreground/[0.04] md:group-hover:bg-foreground/[0.06] transition duration-300 md:pt-6 md:pb-7">
          <Carousel
            setApi={setApi}
            className="m-0"
            opts={{
              align: "end",
              duration: 20,
            }}
          >
            <CarouselContent className="m-0">
              {images.map((item, index) => (
                <CarouselItem key={index} className="px-7">
                  <Image
                    src={item.url || "/fallback-image.jpg"}
                    alt={item.title || "phone screen"}
                    width={300}
                    height={800}
                    className="rounded-3xl overflow-hidden w-full h-auto"
                    priority
                  />
                  {console.log("Image URL:", item?.url)}
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              variant="ghost"
              className={cn(
                "invisible group-hover:visible ml-14 rounded-xl size-10 bg-background z-50",
                scrollPrev ? "" : "hidden"
              )}
            />
            <CarouselNext
              variant="ghost"
              className={cn(
                "invisible group-hover:visible mr-14 rounded-xl size-10 bg-background z-50",
                scrollNext ? "" : "hidden"
              )}
            />
          </Carousel>

          <div className="absolute z-10 bottom-3 left-1/2 transform -translate-x-1/2 invisible group-hover:visible">
            <div className="flex gap-3">
              {Array.from({ length: images.length }).map((_, index) => (
                <button
                  key={index}
                  className="relative size-1.5 overflow-hidden rounded-full"
                >
                  <div className="w-full h-full bg-muted-foreground/30 dark:bg-muted-foreground/70 absolute"></div>
                  <div
                    className={cn(
                      "h-full bg-primary relative w-0 z-10",
                      current === index + 1 ? "w-full" : ""
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-3 w-full">
          <div className="shrink-0 h-10 w-10 bg-[#eaeaea] rounded-xl overflow-hidden" />

          <div className="flex grow flex-col">
            <span className="line-clamp-1 text-body-medium-bold underline decoration-transparent group-hover:decoration-current transition-colors ease-out">
              {title}
            </span>
            <span className="line-clamp-1 text-sm text-muted-foreground font-normal">
              Some description text
            </span>
          </div>
        </div>
      </div>
    </ContextMenuCard>
  );
}
