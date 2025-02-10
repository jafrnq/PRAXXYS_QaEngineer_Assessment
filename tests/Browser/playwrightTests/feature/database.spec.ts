import mysql from "mysql2/promise";
import * as dotenv from 'dotenv'

dotenv.config()


async function getLatestProductName(): Promise<string | null> {
    // Create a connection
    const connection = await mysql.createConnection({
        host: "your-database-host",
        user: "your-database-username",
        password: "your-database-password",
        database: "your-database-name",
    });

    // Query to get the latest product by ID (assuming ID is auto-incrementing)
    const [rows] = await connection.execute(
        "SELECT name FROM products ORDER BY id DESC LIMIT 1"
    );

    await connection.end(); 

    // Extract product name from result
    if (Array.isArray(rows) && rows.length > 0) {
        return (rows[0] as any).name;
    }

    return null;
}
