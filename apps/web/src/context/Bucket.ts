import { createContext } from "react";

export interface BucketContext {
  /** Unique identifier of a bucket */
  _id?: string;
  /** Unique identifier of a owner */
  owner: string;
  /** Total size in bytes */
  size: number;
  /** List of attachments */
  files: File[];
  /** Whether or not a bucket is empty */
  isEmpty: boolean;
  /** Whether or not an async operation in progress */
  isLoading: boolean;
  /** Download a shallow bucket */
  open(id: string): Promise<void>;
  /** Add files to a bucket */
  add(files: File[]): void;
  /** Remove files from a bucket */
  remove(files: File[]): void;
  /** Upload a bucket to the backend */
  upload(files: File[]): Promise<string>;
  /** Download files from a bucket */
  download(ids: string[]): Promise<File[]>;
}

export const Bucket = createContext<BucketContext>(null!);
