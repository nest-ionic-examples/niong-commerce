
export interface Page<T> {
  number: number;
  size: number;
  total?: number;
  items?: T[];
}
