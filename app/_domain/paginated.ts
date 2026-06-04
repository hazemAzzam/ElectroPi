export interface Paginated<T> {
  total: number;
  skip: number;
  limit: number;
  pages: number;
  items: T;
}
