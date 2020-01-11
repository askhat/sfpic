export interface Bucket<T> {
  _id: string;
  owner: string;
  files: T[];
}
