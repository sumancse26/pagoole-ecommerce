/*
  Warnings:

  - The `order_status` column on the `Orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `vat` on the `Products` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('Pending', 'Processing', 'Shipped', 'InTransit', 'Delivered', 'Cancelled', 'Returned', 'Completed');

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "order_status",
ADD COLUMN     "order_status" "orderStatus" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "vat";
