export interface Paginated<T> {
  total: number;
  skip: number;
  limit: number;
  items: T;
}
