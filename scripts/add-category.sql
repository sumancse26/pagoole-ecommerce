-- Step 1: Reset the auto-incrementing sequence for the 'id' column.
-- This forces the next generated ID to be 1.
-- The sequence name is typically <table>_<column>_seq in PostgreSQL.
ALTER SEQUENCE "Categories_id_seq" RESTART WITH 1;

-- Step 2: Use WITH clauses to safely insert parents and children.
-- The first parent ('Fresh Produce') will now receive id = 1.

-- Insert 'Fresh Produce' and its children ('Organic Fruits', 'Leafy Greens')
WITH parent_row AS (
  INSERT INTO "Categories" (category_name, parent_id, order_by, created_at, updated_at)
  VALUES ('Fresh Produce', NULL, 1, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Categories" (category_name, parent_id, order_by, created_at, updated_at)
VALUES 
  ('Organic Fruits', (SELECT id FROM parent_row), 1, NOW(), NOW()),
  ('Leafy Greens',   (SELECT id FROM parent_row), 1, NOW(), NOW());

-- Insert 'Pantry Staples' and its children ('Pasta & Grains', 'Canned Goods')
WITH parent_row AS (
  INSERT INTO "Categories" (category_name, parent_id, order_by, created_at, updated_at)
  VALUES ('Pantry Staples', NULL, 1, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Categories" (category_name, parent_id, order_by, created_at, updated_at)
VALUES 
  ('Pasta & Grains', (SELECT id FROM parent_row), 1, NOW(), NOW()),
  ('Canned Goods',   (SELECT id FROM parent_row), 1, NOW(), NOW());

-- Insert 'Beverages' and its child ('Juices')
WITH parent_row AS (
  INSERT INTO "Categories" (category_name, parent_id, order_by, created_at, updated_at)
  VALUES ('Beverages', NULL, 1, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Categories" (category_name, parent_id, order_by, created_at, updated_at)
VALUES 
  ('Juices', (SELECT id FROM parent_row), 1, NOW(), NOW());

-- Insert 'Snacks' and its child ('Chips & Crisps')
WITH parent_row AS (
  INSERT INTO "Categories" (category_name, parent_id, order_by, created_at, updated_at)
  VALUES ('Snacks', NULL, 1, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Categories" (category_name, parent_id, order_by, created_at, updated_at)
VALUES 
  ('Chips & Crisps', (SELECT id FROM parent_row), 1, NOW(), NOW());

-- Commit the transaction to save all changes
COMMIT;