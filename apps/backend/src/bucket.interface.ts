export interface Bucket<T> {
  /** Primary key of a record */
  _id: string; // why _private and not a number?
  /** Primary key of a user */
  owner_id: string; // why id not a number?
  /** References to the stored file */
  files: T[];
}
