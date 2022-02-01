export interface File {
	/** Name of a file in the storage */
	_id: string;
	/** Original file name provided by a user */
	name: string;
	/** Mime Type */
	type: string;
	/** Size in bytes */
	size: number;
}
