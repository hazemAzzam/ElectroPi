"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/app/_lib/utils";

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/50 ring-1 ring-foreground/10">
        {current && (
          <Image
            src={current}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6"
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg bg-muted/50 ring-1 transition-colors",
                i === active ? "ring-2 ring-primary" : "ring-foreground/10 hover:ring-foreground/25",
              )}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                sizes="20vw"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
