import { PackageSearch } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

export default function ProductsEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageSearch />
        </EmptyMedia>
        <EmptyTitle>No products found</EmptyTitle>
        <EmptyDescription>
          We couldn&apos;t find any products matching your search. Try adjusting
          your filters or search terms.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
