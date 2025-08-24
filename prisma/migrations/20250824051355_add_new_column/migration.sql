/*
  Warnings:

  - You are about to drop the column `product_id` on the `Wishlists` table. All the data in the column will be lost.
  - Added the required column `vendor_prod_id` to the `Wishlists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Wishlists" DROP CONSTRAINT "Wishlists_product_id_fkey";

-- AlterTable
ALTER TABLE "Wishlists" DROP COLUMN "product_id",
ADD COLUMN     "vendor_prod_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Wishlists" ADD CONSTRAINT "Wishlists_vendor_prod_id_fkey" FOREIGN KEY ("vendor_prod_id") REFERENCES "Vendor_Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
