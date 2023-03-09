import { Client, Account } from "appwrite";
const client = new Client();
// Project ID : 63e8dc57bfa6bfcde223
// API Endpoint : http://localhost/v1

client.setEndpoint("http://localhost/v1").setProject("63e8dc57bfa6bfcde223");

export const account = new Account(client);

// Database

// import if needed export const databases = new Databases(client, "63d13793a153ac2f045a");
