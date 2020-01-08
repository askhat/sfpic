import { createContext } from "react";

export interface BucketContext<T> {
  owner: string;
  files: T[];
  size: number;
  isEmpty: boolean;
  isLoading: boolean;
  add(files: T[]): void;
  remove(files: T[]): void;
  upload(): Promise<void>;
}

export const Bucket = createContext<BucketContext<File>>(null!);
