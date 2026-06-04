import { Star } from "lucide-react";
import { cn } from "@/src/presentation/lib/utils";

export default function StarRating({
  rating,
  className,
  size = 16,
}: {
  rating: number;
  className?: string;
  size?: number;
}) {
  const rounded = Math.round(rating);

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={cn(
            i < rounded ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}
