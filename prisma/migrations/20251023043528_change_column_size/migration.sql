/*
  Warnings:

  - You are about to alter the column `image` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE "Brands" ALTER COLUMN "brand_logo" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "Product_Images" ALTER COLUMN "file_name" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "image" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "Vendors" ALTER COLUMN "store_logo" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "nid_image" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "trade_license_image" SET DATA TYPE VARCHAR(300);
