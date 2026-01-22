#!/usr/bin/env node
/**
 * Script to create an admin user
 * Usage: node create-admin.mjs email@example.com "Admin Name" password123
 */

import { hash } from "@node-rs/argon2";
import { randomBytes } from "crypto";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { user } from "../src/lib/server/db/schema/auth-schema.ts";

// Get command line arguments
const [email, name, password] = process.argv.slice(2);

if (!email || !name || !password) {
  console.error("Usage: node create-admin.mjs <email> <name> <password>");
  console.error("Example: node create-admin.mjs admin@hajiutong.com 'Admin User' MySecurePass123");
  process.exit(1);
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  console.error("Error: Invalid email format");
  process.exit(1);
}

// Validate password strength
if (password.length < 8) {
  console.error("Error: Password must be at least 8 characters long");
  process.exit(1);
}

async function createAdmin() {
  try {
    console.log("🔗 Connecting to database...");

    // Get DATABASE_URL from environment or use default
    const DATABASE_URL = process.env.DATABASE_URL || "mysql://root@localhost:3306/hajiutong";

    // Create database connection
    const connection = await mysql.createPool(DATABASE_URL);
    const db = drizzle(connection, { mode: "default" });

    console.log("✅ Connected to database");

    // Check if user already exists
    const existingUsers = await db.select().from(user).where(eq(user.email, email));

    if (existingUsers.length > 0) {
      console.error("❌ Error: User with this email already exists");
      await connection.end();
      process.exit(1);
    }

    // Hash password
    console.log("🔐 Hashing password...");
    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });

    // Generate random user ID
    const userId = randomBytes(16).toString("hex");

    // Create admin user
    console.log("👤 Creating admin user...");
    await db.insert(user).values({
      id: userId,
      name: name,
      email: email,
      emailVerified: true,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Also need to create an account entry for password login
    const { account } = await import("../src/lib/server/db/schema/auth-schema.ts");
    const accountId = randomBytes(16).toString("hex");

    await db.insert(account).values({
      id: accountId,
      accountId: email,
      providerId: "credential",
      userId: userId,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log("✅ Admin user created successfully!");
    console.log("\n📧 Email:", email);
    console.log("👤 Name:", name);
    console.log("🔑 Role: admin");
    console.log("\n🎉 You can now login at /login with these credentials");

    await connection.end();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
}

// Import eq function
import { eq } from "drizzle-orm";

createAdmin();
