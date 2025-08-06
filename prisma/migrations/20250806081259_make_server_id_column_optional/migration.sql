-- DropForeignKey
ALTER TABLE "Product_Images" DROP CONSTRAINT "Product_Images_server_id_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_server_id_fkey";

-- AlterTable
ALTER TABLE "Product_Images" ALTER COLUMN "server_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "server_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "File_Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Images" ADD CONSTRAINT "Product_Images_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "File_Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;
