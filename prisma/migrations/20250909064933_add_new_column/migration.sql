/*
  Warnings:

  - You are about to drop the column `vendor_id` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "vendor_id",
ADD COLUMN     "delivery_address" INTEGER NOT NULL DEFAULT 0;
