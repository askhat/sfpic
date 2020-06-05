export interface File {
  /** Name of a file in the storage */
  _id: string; // why _private and not a number?
  /** Original file name provided by a user */
  name: string;
  /** Mime Type */
  type: string;
  /** Size in bytes */
  size: number;
}
