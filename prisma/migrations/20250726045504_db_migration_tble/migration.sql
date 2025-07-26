-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "phone" VARCHAR(20),
    "password" TEXT,
    "otp" INTEGER NOT NULL DEFAULT 0,
    "is_admin" INTEGER NOT NULL DEFAULT 1,
    "is_active" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Geo_Locations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "full_address" VARCHAR(255),
    "parent_id" INTEGER,
    "is_active" INTEGER NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Geo_Locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendors" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "store_name" VARCHAR(150) NOT NULL,
    "store_description" VARCHAR(500),
    "address" VARCHAR(300),
    "location_id" INTEGER NOT NULL,
    "password" TEXT,
    "otp" INTEGER NOT NULL DEFAULT 0,
    "is_admin" INTEGER NOT NULL DEFAULT 0,
    "is_active" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "store_logo" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Vendors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "category_name" VARCHAR(100) NOT NULL,
    "parent_id" INTEGER,
    "order_by" INTEGER,
    "is_active" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brands" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "brand_logo" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weights" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "unit" VARCHAR(10) NOT NULL,
    "description" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File_Server" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "base_url" VARCHAR(128) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_Server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "prod_name" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "description" VARCHAR(512),
    "unit_price" DOUBLE PRECISION NOT NULL,
    "trade_price" DOUBLE PRECISION NOT NULL,
    "mrp" DOUBLE PRECISION NOT NULL,
    "vat" DOUBLE PRECISION NOT NULL,
    "server_id" INTEGER NOT NULL,
    "brand_id" INTEGER,
    "category_id" INTEGER,
    "weight_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "image_id" INTEGER,
    "image" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_Images" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "server_id" INTEGER NOT NULL,
    "file_name" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor_Products" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock_qty" INTEGER NOT NULL DEFAULT 0,
    "is_active" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "image_url" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Vendor_Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart_Items" (
    "id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "vendor_prod_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "order_status" VARCHAR(20) NOT NULL DEFAULT 'Pending',
    "payment_status" VARCHAR(20) NOT NULL DEFAULT 'Unpaid',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_Items" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "vendor_product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "payment_method" VARCHAR(50),
    "payment_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipping_Addresses" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "full_name" VARCHAR(100),
    "phone" VARCHAR(20),
    "address_line" VARCHAR(300),
    "city" VARCHAR(100),
    "postal_code" VARCHAR(20),
    "country" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shipping_Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_Reviews" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "remarks" VARCHAR(1000),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor_Reviews" (
    "id" SERIAL NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "remarks" VARCHAR(1000),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vendor_Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlists" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wishlists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_name_key" ON "Users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Brands_name_key" ON "Brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "File_Server_name_key" ON "File_Server"("name");

-- CreateIndex
CREATE UNIQUE INDEX "File_Server_base_url_key" ON "File_Server"("base_url");

-- AddForeignKey
ALTER TABLE "Geo_Locations" ADD CONSTRAINT "Geo_Locations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendors" ADD CONSTRAINT "Vendors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendors" ADD CONSTRAINT "Vendors_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Geo_Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "File_Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_weight_id_fkey" FOREIGN KEY ("weight_id") REFERENCES "Weights"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Images" ADD CONSTRAINT "Product_Images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Images" ADD CONSTRAINT "Product_Images_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "File_Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor_Products" ADD CONSTRAINT "Vendor_Products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor_Products" ADD CONSTRAINT "Vendor_Products_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carts" ADD CONSTRAINT "Carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Items" ADD CONSTRAINT "Cart_Items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Items" ADD CONSTRAINT "Cart_Items_vendor_prod_id_fkey" FOREIGN KEY ("vendor_prod_id") REFERENCES "Vendor_Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Items" ADD CONSTRAINT "Order_Items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Items" ADD CONSTRAINT "Order_Items_vendor_product_id_fkey" FOREIGN KEY ("vendor_product_id") REFERENCES "Vendor_Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipping_Addresses" ADD CONSTRAINT "Shipping_Addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Reviews" ADD CONSTRAINT "Product_Reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Reviews" ADD CONSTRAINT "Product_Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor_Reviews" ADD CONSTRAINT "Vendor_Reviews_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor_Reviews" ADD CONSTRAINT "Vendor_Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlists" ADD CONSTRAINT "Wishlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlists" ADD CONSTRAINT "Wishlists_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
