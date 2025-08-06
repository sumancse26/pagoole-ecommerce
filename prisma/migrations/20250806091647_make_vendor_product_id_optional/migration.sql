-- DropForeignKey
ALTER TABLE "Product_Images" DROP CONSTRAINT "Product_Images_vendor_product_id_fkey";

-- AlterTable
ALTER TABLE "Product_Images" ALTER COLUMN "vendor_product_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product_Images" ADD CONSTRAINT "Product_Images_vendor_product_id_fkey" FOREIGN KEY ("vendor_product_id") REFERENCES "Vendor_Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
