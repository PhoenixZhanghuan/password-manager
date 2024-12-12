import * as SQLite from "expo-sqlite";

// Add this function to create the tables
export async function initializeDatabase() {
  const db = await SQLite.openDatabaseAsync("password-manager.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      sort_order INTEGER DEFAULT 0
    );
    
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      group_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      note TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
    );
    
    CREATE TABLE IF NOT EXISTS account_fields (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id INTEGER NOT NULL,
      field_name TEXT NOT NULL,
      field_value TEXT,
      account_fieldscol TEXT,
      FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
    );
  `);

  // Check if the sort_order column exists, if not, add it
  try {
    await db.execAsync("ALTER TABLE groups ADD COLUMN sort_order INTEGER DEFAULT 0");
  } catch (error) {
    console.log("Column sort_order may already exist, or another error occurred:", error);
  }

  // Check if the groups table is empty and insert default groups
  const allGroups = await db.getAllAsync("SELECT * FROM groups");
  if (allGroups.length === 0) {
    const defaultGroups = ["默认", "工作", "游戏"];
    for (let index = 0; index < defaultGroups.length; index++) {
      await db.runAsync(
        "INSERT INTO groups (name, sort_order) VALUES (?, ?)",
        defaultGroups[index],
        index
      );
    }
    console.log("Inserted default groups into the database.");
  }
}

// Add this function to insert a new group into the groups table
export async function addGroup(name: string, description?: string) {
  const db = await SQLite.openDatabaseAsync("password-manager.db");

  const result = await db.runAsync(
    "INSERT INTO groups (name, description) VALUES (?, ?)",
    name,
    description || null
  );
  console.log(`Inserted group with ID: ${result.lastInsertRowId}`);
  return result.lastInsertRowId;
}

// Function to delete a group by ID
export async function deleteGroup(id: number) {
  const db = await SQLite.openDatabaseAsync("password-manager.db");

  const result = await db.runAsync("DELETE FROM groups WHERE id = ?", id);

  console.log(`Deleted group with ID: ${id}, affected rows: ${result.changes}`);
}

// Function to update a group's details
export async function updateGroup(
  id: number,
  name: string,
  sortOrder: number,
  description?: string
) {
  const db = await SQLite.openDatabaseAsync("password-manager.db");

  const result = await db.runAsync(
    "UPDATE groups SET name = ?, sort_order = ?, description = ? WHERE id = ?",
    name,
    sortOrder,
    description || null,
    id
  );

  console.log(`Updated group with ID: ${id}, affected rows: ${result.changes}`);
}

// Function to query all groups
export async function getAllGroups() {
  const db = await SQLite.openDatabaseAsync("password-manager.db");

  try {
    const allGroups = await db.getAllAsync(
      "SELECT * FROM groups ORDER BY sort_order ASC"
    );
    return allGroups;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return []; // Return an empty array in case of error
  }
}
