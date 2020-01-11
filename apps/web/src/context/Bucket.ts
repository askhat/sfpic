import { createContext } from "react";

export interface BucketContext {
  _id?: string;
  owner: string;
  size: number;
  files: File[];
  isEmpty: boolean;
  isLoading: boolean;
  add(files: File[]): void;
  remove(files: File[]): void;
  upload(files: File[]): Promise<void>;
}

export const Bucket = createContext<BucketContext>(null!);
