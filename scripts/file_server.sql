-- Step 1 (Optional but Recommended): Clear the table and reset the ID sequence.
-- This ensures that your IDs will start from 1, which is useful for a clean seed script.
-- WARNING: This will delete all existing data in the "File_Server" table.
TRUNCATE TABLE "File_Server" RESTART IDENTITY CASCADE;

-- Step 2: Insert 10 records for various file hosting services.
-- The 'id' column is omitted as it is auto-generated.
-- 'created_at' is set explicitly, though it has a default.

INSERT INTO "File_Server" (name, base_url, created_at)
VALUES 
    (
        'aws_s3_public_images', 
        'https://my-app-images.s3.us-east-1.amazonaws.com/',
        NOW()
    ),
    (
        'aws_s3_private_docs', 
        'https://my-app-secure-docs.s3.us-east-1.amazonaws.com/',
        NOW()
    ),
    (
        'gcs_public_assets', 
        'https://storage.googleapis.com/my-app-public-assets/',
        NOW()
    ),
    (
        'azure_blob_media', 
        'https://myappstorage.blob.core.windows.net/media/',
        NOW()
    ),
    (
        'cloudinary_transformed', 
        'https://res.cloudinary.com/my-cloud-name/image/upload/',
        NOW()
    ),
    (
        'digitalocean_spaces', 
        'https://my-app.nyc3.digitaloceanspaces.com/',
        NOW()
    ),
    (
        'bunny_cdn_edge', 
        'https://my-app.b-cdn.net/',
        NOW()
    ),
    (
        'backblaze_b2', 
        'https://my-app-files.s3.us-west-001.backblazeb2.com/',
        NOW()
    ),
    (
        'local_dev_server', 
        'http://localhost:8080/uploads/',
        NOW()
    ),
    (
        'legacy_ftp_server', 
        'https://archive.my-company.com/files/',
        NOW()
    );

-- Commit the transaction to make the changes permanent
COMMIT;