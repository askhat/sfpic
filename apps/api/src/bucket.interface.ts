export interface Bucket<T> {
	/** Primary key of a record */
	_id: string;
	/** Primary key of a user */
	owner_id: string;
	/** References to the stored file */
	files: T[];
}
