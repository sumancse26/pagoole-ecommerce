-- AlterTable
ALTER TABLE "Shipping_Addresses" ADD COLUMN     "address_type" TEXT DEFAULT 'home',
ADD COLUMN     "area" VARCHAR(100),
ADD COLUMN     "region" VARCHAR(100);
