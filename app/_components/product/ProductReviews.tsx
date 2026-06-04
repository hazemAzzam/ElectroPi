import { ProductReview } from "@/app/_domain/product";
import { formatDate } from "@/app/_lib/utils";
import StarRating from "./StarRating";

export default function ProductReviews({ reviews }: { reviews: ProductReview[] }) {
  return (
    <section className="space-y-4">
      <h2 className="font-heading text-xl font-semibold tracking-tight">
        Reviews ({reviews.length})
      </h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {reviews.map((review, i) => (
            <li key={`${review.reviewerName}-${i}`} className="rounded-xl bg-card p-4 ring-1 ring-foreground/10">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{review.reviewerName}</span>
                <StarRating rating={review.rating} size={14} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
              {formatDate(review.date) && (
                <p className="mt-2 text-xs text-muted-foreground/70">{formatDate(review.date)}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
