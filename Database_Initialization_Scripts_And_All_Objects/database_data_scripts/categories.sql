DELETE FROM discountshop."Categories";

-- Insert default 'No' category with ID 0 and PARENT_ID NULL
INSERT INTO discountshop."Categories" (id, category_name, order_by, parent_id, is_active, created_at, updated_at)
VALUES (0, 'No', 0, NULL, 1, NOW(), NOW());

-- Insert top-level categories with PARENT_ID = 0
INSERT INTO discountshop."Categories" (id, category_name, order_by, parent_id, is_active, created_at, updated_at)
SELECT id, category_name, order_by, 0, 1, NOW(), NOW()
FROM (VALUES 
    (1, 'Fresh Produce', 1),
    (2, 'Dairy & Eggs', 2),
    (3, 'Bakery', 3),
    (4, 'Beverages', 4),
    (5, 'Snacks & Confectionery', 5),
    (6, 'Meat & Seafood', 6),
    (7, 'Pantry Staples', 7),
    (8, 'Frozen Foods', 8),
    (9, 'Household & Cleaning', 9),
    (10, 'Personal Care', 10)
) AS t (id, category_name, order_by);

-- Insert Fresh Produce children with PARENT_ID = 1
INSERT INTO discountshop."Categories" (id, category_name, order_by, parent_id, is_active, created_at, updated_at)
SELECT id, category_name, order_by, 1, 1, NOW(), NOW()
FROM (VALUES 
    (11, 'Fruits', 1),
    (12, 'Vegetables', 2),
    (13, 'Organic Produce', 3)
) AS t (id, category_name, order_by);

-- Insert Dairy & Eggs children with PARENT_ID = 2
INSERT INTO discountshop."Categories" (id, category_name, order_by, parent_id, is_active, created_at, updated_at)
SELECT id, category_name, order_by, 2, 1, NOW(), NOW()
FROM (VALUES 
    (14, 'Milk', 1),
    (15, 'Cheese', 2),
    (16, 'Butter & Cream', 3),
    (17, 'Eggs', 4)
) AS t (id, category_name, order_by);

-- Insert Bakery children with PARENT_ID = 3
INSERT INTO discountshop."Categories" (id, category_name, order_by, parent_id, is_active, created_at, updated_at)
SELECT id, category_name, order_by, 3, 1, NOW(), NOW()
FROM (VALUES 
    (18, 'Breads & Rolls', 1),
    (19, 'Cakes & Pastries', 2),
    (20, 'Cookies & Biscuits', 3)
) AS t (id, category_name, order_by);

-- Insert Beverages children with PARENT_ID = 4
INSERT INTO discountshop."Categories" (id, category_name, order_by, parent_id, is_active, created_at, updated_at)
SELECT id, category_name, order_by, 4, 1, NOW(), NOW()
FROM (VALUES 
    (21, 'Water & Sparkling Water', 1),
    (22, 'Soft Drinks', 2),
    (23, 'Juices', 3),
    (24, 'Tea & Coffee', 4),
    (25, 'Energy Drinks', 5)
) AS t (id, category_name, order_by);

-- Query for hierarchical display
WITH RECURSIVE category_tree AS (
    SELECT
        id,
        category_name,
        parent_id,
        1 AS level
    FROM
        discountshop."Categories"
    WHERE
        parent_id IS NULL -- Start with the 'No' category (ID 0)
    UNION ALL
    SELECT
        c.id,
        c.category_name,
        c.parent_id,
        ct.level + 1
    FROM
        discountshop."Categories" c
    JOIN
        category_tree ct ON c.parent_id = ct.id
)
SELECT
    LPAD('', 2 * (level - 1)) || category_name AS category_hierarchy,
    id,
    parent_id,
    level
FROM
    category_tree
ORDER BY
    parent_id NULLS FIRST, category_name;
