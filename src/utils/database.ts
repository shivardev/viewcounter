const db = require('better-sqlite3')('views.db');
db.exec(`
    CREATE TABLE IF NOT EXISTS views (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         uuid TEXT NOT NULL,
         url TEXT NOT NULL,
         count INTEGER DEFAULT 1
     ) STRICT;
   `);
export function initDatabase() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS views (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             uuid TEXT NOT NULL,
             url TEXT NOT NULL,
             count INTEGER DEFAULT 1
         ) STRICT;
       `);

}

// Prepare the statements
const updateCount = db.prepare('UPDATE views SET count = count + 1 WHERE uuid = ?');
const insertRow = db.prepare('INSERT INTO views (uuid, count, url) VALUES (?, ?, ?)');
const fetchRow = db.prepare('SELECT COUNT FROM views WHERE uuid =?');

// Function to handle inserting or updating the view count
export const incrementOrInsertView = (uuid: string, url: string) => {
    // Update the count for the given UUID
    const result = updateCount.run(uuid);

    // If no rows were updated, insert a new row with count = 1
    if (result.changes === 0) {
        insertRow.run(uuid, 1, url); // Insert a new row with count = 1
        console.log(`Inserted new view with UUID: ${uuid}`);
    } else {
        console.log(`Incremented view count for UUID: ${uuid}`);
    }
};

export const getCount = (uuid:string)=>{
    const row:viewTable = db.prepare('SELECT * FROM views WHERE uuid = ?').get(uuid);
    console.log(row);
    return row.count
}
export const printAll = () => {
    const row = db.prepare('SELECT * FROM views');
    // Execute the query to fetch all rows
    const rows = row.all(); // `all()` retrieves all rows as an array

    // Print each row
    console.log(rows)
}