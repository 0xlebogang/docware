/**
 * BaseLayer defines the abstract class for all data operation layers.
 */
export abstract class BaseLayer {
	// ID of the authenticated user
	protected readonly userID: string;

	constructor(userID: string) {
		this.userID = userID;
	}

	// getUserID returns the ID of the authenticated user
	protected getUserID(): string {
		return this.userID;
	}

	/**
	 * Fetches all records
	 */
	abstract getAll(): Promise<unknown[]>;

	/**
	 * Fetches a record by its unique identifier
	 * @param id - The unique identifier of the record
	 */
	abstract getByID(id: string): Promise<unknown | null>;

	/**
	 * Creates a new record
	 * @param data - The data to create a new record
	 */
	abstract create(data: unknown): Promise<unknown>;

	/**
	 * Deletes a record with the unique identifier
	 * @param id - The unique identifier of the record
	 */
	abstract delete(id: string): Promise<boolean>;
}
