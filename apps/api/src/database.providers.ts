import nano from "nano";

export const databaseProviders = [
	{
		provide: "DATABASE_CONNECTION",
		useFactory: () => nano(process.env.COUCHDB_URL).use("sfpic")
	}
];
