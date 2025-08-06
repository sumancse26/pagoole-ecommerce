-- Step 1: Clear the target table and all dependent tables, and reset the ID sequence.
-- WARNING: This command will delete ALL data from "Brands" AND "Products".
-- This is necessary to reset the database for fresh seeding.
TRUNCATE TABLE "Brands" RESTART IDENTITY CASCADE;

-- Step 2: Insert 10 brand records into the now-empty "Brands" table.
-- The 'id' will be auto-generated starting from 1.

INSERT INTO "Brands" (name, description, brand_logo, created_at, updated_at)
VALUES 
    (
        'Organic Valley', 
        'An organic food brand and independent cooperative of organic farmers.',
        'https://example.com/logos/organic_valley.png',
        NOW(),
        NOW()
    ),
    (
        'Nature''s Path', 
        'A family-owned manufacturer of certified organic foods.',
        'https://example.com/logos/natures_path.png',
        NOW(),
        NOW()
    ),
    (
        'King Arthur Baking', 
        'An American supplier of flour, ingredients, baking mixes, and cookbooks.',
        'https://example.com/logos/king_arthur.png',
        NOW(),
        NOW()
    ),
    (
        'Fage', 
        'An international dairy company that manufactures and distributes dairy products including yogurt.',
        'https://example.com/logos/fage.png',
        NOW(),
        NOW()
    ),
    (
        'Tyson Foods', 
        'A multinational corporation that is the world''s second largest processor of chicken, beef, and pork.',
        '', -- No logo provided
        NOW(),
        NOW()
    ),
    (
        'Del Monte Foods', 
        'A North American food production and distribution company.',
        'https://example.com/logos/del_monte.png',
        NOW(),
        NOW()
    ),
    (
        'Wonder Bread', 
        'A brand of sliced bread originating in the United States.',
        'https://example.com/logos/wonder_bread.png',
        NOW(),
        NOW()
    ),
    (
        'Coca-Cola', 
        'A multinational beverage corporation known for its signature soft drink.',
        'https://example.com/logos/coca_cola.png',
        NOW(),
        NOW()
    ),
    (
        'Lay''s', 
        'The brand name for a number of potato chip varieties founded in the USA.',
        'https://example.com/logos/lays.png',
        NOW(),
        NOW()
    ),
    (
        'Green Giant', 
        'A brand of frozen and canned vegetables owned by B&G Foods.',
        '', -- No logo provided
        NOW(),
        NOW()
    );

-- Commit the transaction to save the changes
COMMIT;