-- Step 1: Clear the table and reset the ID sequence to 1.
-- This command ensures a clean slate, deleting all existing data and starting the new IDs from 1.
-- CASCADE is used to also truncate any tables that have a foreign key reference to "Weights" (like "Products").
-- WARNING: This will delete all data in "Weights" and potentially related tables.
TRUNCATE TABLE "Weights" RESTART IDENTITY CASCADE;

-- Step 2: Insert a list of specific weight/volume quantities into the "Weights" table.
-- Each row has a unique 'value'. The 'id' will be auto-generated starting from 1.
INSERT INTO "Weights" (value, unit, description, created_at, updated_at)
VALUES 
    (1, 'piece', 'Single Item', NOW(), NOW()),
    (6, 'pack', '6-Pack', NOW(), NOW()),
    (12, 'pack', '12-Pack / Dozen', NOW(), NOW()),
    (100, 'g', '100 Grams', NOW(), NOW()),
    (250, 'g', '250 Grams', NOW(), NOW()),
    (400, 'g', '400 Grams (Standard Can)', NOW(), NOW()),
    (500, 'g', '500 Grams', NOW(), NOW()),
    (750, 'ml', '750 Milliliters (Wine Bottle)', NOW(), NOW()),
    (1000, 'g', '1 Kilogram', NOW(), NOW()),
    (1500, 'g', '1.5 Kilograms', NOW(), NOW()),
    (2000, 'ml', '2 Liters', NOW(), NOW());

-- Commit the transaction to save all changes
COMMIT;