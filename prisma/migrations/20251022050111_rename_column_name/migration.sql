/*
  Warnings:

  - You are about to alter the column `brand_logo` on the `Brands` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `base_url` on the `File_Server` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `user_name` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(32)`.
  - You are about to alter the column `email` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(64)`.
  - You are about to alter the column `phone` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(16)`.
  - You are about to drop the column `is_admin` on the `Vendors` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `Vendors` table. All the data in the column will be lost.
  - You are about to drop the column `parent_location_id` on the `Vendors` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Vendors` table. All the data in the column will be lost.
  - You are about to alter the column `store_logo` on the `Vendors` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "Brands" ALTER COLUMN "brand_logo" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "File_Server" ALTER COLUMN "base_url" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "Product_Images" ALTER COLUMN "file_name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "user_name" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(16);

-- AlterTable
ALTER TABLE "Vendors" DROP COLUMN "is_admin",
DROP COLUMN "otp",
DROP COLUMN "parent_location_id",
DROP COLUMN "password",
ADD COLUMN     "nid_image" VARCHAR(200) NOT NULL DEFAULT '',
ADD COLUMN     "nid_no" VARCHAR(20) DEFAULT '',
ADD COLUMN     "trade_license_image" VARCHAR(200) NOT NULL DEFAULT '',
ADD COLUMN     "trade_license_no" VARCHAR(16) DEFAULT '',
ALTER COLUMN "store_logo" SET DATA TYPE VARCHAR(200);

-- CreateTable
CREATE TABLE "Configurations" (
    "id" SERIAL NOT NULL,
    "config_key" VARCHAR(100) NOT NULL,
    "config_value" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configurations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Configurations_config_key_key" ON "Configurations"("config_key");
