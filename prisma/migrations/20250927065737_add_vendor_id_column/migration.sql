/*
  Warnings:

  - Made the column `product_location` on table `Vendor_Products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "vendor_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Vendor_Products" ALTER COLUMN "product_location" SET NOT NULL,
ALTER COLUMN "product_location" SET DEFAULT 0;
