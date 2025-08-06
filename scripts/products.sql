-- Step 1: Clear the Products table and reset the ID sequence to 1.
-- CASCADE is used because other tables (like Wishlists, Product_Reviews) have a foreign key to Products.
-- WARNING: This deletes all data in "Products" and any dependent tables.
TRUNCATE TABLE "Products" RESTART IDENTITY CASCADE;

-- Step 2: Insert 20 grocery products.
-- This script assumes that IDs in Brands, Categories, and Weights tables have been created by previous scripts.
-- Assumed Foreign Keys:
--  - server_id = 1 (aws_s3_public_images)
--  - Category IDs: 5=Fruits, 6=Vegetables, 7=Milk & Cream, 8=Cheese, 9=Poultry, 10=Bread & Rolls
--  - Brand IDs: 1=Organic Valley, 2=Nature's Path, 7=Wonder Bread, 9=Lay's, etc.
--  - Weight IDs: 1='1 piece', 7='500g', 9='1000g', 11='2000ml', etc.

INSERT INTO "Products" (
  prod_name, slug, description, 
  unit_price, trade_price, mrp, vat, 
  brand_id, category_id, weight_id, server_id, image, 
  created_at, updated_at
) VALUES
('Organic Bananas', 'organic-bananas', 'A bunch of fresh, organic bananas, rich in potassium.', 2.99, 1.50, 3.49, 0, 1, 5, 11, 1, 'products/organic-bananas.jpg', NOW(), NOW()),
('Whole Milk', 'whole-milk', 'Fresh, pasteurized whole milk from grass-fed cows.', 4.50, 3.00, 4.50, 0.05, 1, 7, 11, 1, 'products/whole-milk.jpg', NOW(), NOW()),
('Classic Sourdough Bread', 'classic-sourdough-bread', 'A crusty loaf of naturally leavened sourdough bread.', 5.99, 3.50, 6.49, 0, 3, 10, 7, 1, 'products/sourdough-bread.jpg', NOW(), NOW()),
('Greek Yogurt', 'greek-yogurt', 'Thick and creamy plain Greek yogurt, high in protein.', 6.20, 4.10, 6.99, 0.05, 4, 8, 7, 1, 'products/greek-yogurt.jpg', NOW(), NOW()),
('Free-Range Chicken Breast', 'free-range-chicken-breast', 'Boneless, skinless chicken breasts from free-range poultry.', 12.99, 8.00, 13.99, 0.05, 5, 9, 9, 1, 'products/chicken-breast.jpg', NOW(), NOW()),
('Canned Diced Tomatoes', 'canned-diced-tomatoes', 'Organic diced tomatoes canned at peak freshness.', 2.19, 1.20, 2.50, 0, 6, 8, 6, 1, 'products/diced-tomatoes.jpg', NOW(), NOW()),
('Classic White Bread', 'classic-white-bread', 'Soft, sliced white bread, perfect for sandwiches.', 3.49, 2.00, 3.99, 0, 7, 10, 7, 1, 'products/white-bread.jpg', NOW(), NOW()),
('Pure Orange Juice', 'pure-orange-juice', 'Not from concentrate pure orange juice with pulp.', 5.50, 3.75, 5.99, 0, 6, 9, 11, 1, 'products/orange-juice.jpg', NOW(), NOW()),
('Classic Potato Chips', 'classic-potato-chips', 'Lightly salted classic cut potato chips.', 3.99, 2.20, 4.49, 0.05, 9, 10, 5, 1, 'products/potato-chips.jpg', NOW(), NOW()),
('Frozen Green Peas', 'frozen-green-peas', 'Sweet and tender green peas, frozen to lock in freshness.', 2.99, 1.80, 3.29, 0, 10, 6, 7, 1, 'products/green-peas.jpg', NOW(), NOW()),
('Organic Spinach', 'organic-spinach', 'Fresh bag of pre-washed organic spinach leaves.', 4.99, 3.00, 5.49, 0, 1, 6, 5, 1, 'products/organic-spinach.jpg', NOW(), NOW()),
('Cheddar Cheese Block', 'cheddar-cheese-block', 'A sharp and crumbly block of aged cheddar cheese.', 7.99, 5.50, 8.49, 0.05, 1, 8, 5, 1, 'products/cheddar-cheese.jpg', NOW(), NOW()),
('Organic Gala Apples', 'organic-gala-apples', 'A bag of crisp and sweet organic Gala apples.', 6.99, 4.00, 7.99, 0, 1, 5, 9, 1, 'products/gala-apples.jpg', NOW(), NOW()),
('Quinoa Grain', 'quinoa-grain', 'Nutritious and versatile organic quinoa grain.', 8.99, 5.00, 9.99, 0, 2, 7, 7, 1, 'products/quinoa-grain.jpg', NOW(), NOW()),
('Sparkling Water 12-Pack', 'sparkling-water-12-pack', 'A 12-pack of unflavored natural sparkling mineral water.', 10.99, 7.50, 11.99, 0.05, 8, 9, 3, 1, 'products/sparkling-water.jpg', NOW(), NOW()),
('Avocado', 'avocado', 'A single, ripe Hass avocado.', 2.49, 1.25, 2.99, 0, null, 5, 1, 1, 'products/avocado.jpg', NOW(), NOW()),
('Whole Wheat Pasta', 'whole-wheat-pasta', '500g pack of whole wheat fusilli pasta.', 3.29, 1.90, 3.49, 0, 2, 7, 7, 1, 'products/whole-wheat-pasta.jpg', NOW(), NOW()),
('Organic Carrots', 'organic-carrots', 'A bunch of sweet organic carrots.', 2.99, 1.50, 3.49, 0, 1, 6, 9, 1, 'products/organic-carrots.jpg', NOW(), NOW()),
('Almond Milk', 'almond-milk', 'Unsweetened almond milk, a great dairy-free alternative.', 4.79, 3.20, 4.99, 0.05, 2, 7, 11, 1, 'products/almond-milk.jpg', NOW(), NOW()),
('Cola 6-Pack', 'cola-6-pack', 'A classic 6-pack of cola in cans.', 6.99, 4.50, 7.49, 0.05, 8, 9, 2, 1, 'products/cola-6-pack.jpg', NOW(), NOW());

-- Commit the transaction to save the changes
COMMIT;