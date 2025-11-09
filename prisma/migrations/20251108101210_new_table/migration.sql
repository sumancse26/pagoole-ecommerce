/*
  Warnings:

  - You are about to drop the column `loc_type` on the `Geo_Locations` table. All the data in the column will be lost.
  - You are about to drop the `Configurations` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "orderStatus" ADD VALUE 'OutForDelivery';

-- AlterTable
ALTER TABLE "Geo_Locations" DROP COLUMN "loc_type";

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "Vendor_Products" ADD COLUMN     "description" VARCHAR(1000);

-- DropTable
DROP TABLE "Configurations";
